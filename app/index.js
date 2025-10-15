import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// Cấu hình thông báo
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function TimerScreen() {
  const [workTime, setWorkTime] = useState(25); // Phút
  const [breakTime, setBreakTime] = useState(5); // Phút
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Giây
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [sessionCount, setSessionCount] = useState(0);

  const timerRef = useRef(null);
  const notificationIdRef = useRef(null);

  // Yêu cầu quyền thông báo
  useEffect(() => {
    registerForPushNotificationsAsync();
    loadSettings();
  }, []);

  // Load cài đặt từ AsyncStorage
  const loadSettings = async () => {
    try {
      const workTimeStr = await AsyncStorage.getItem('workTime');
      const breakTimeStr = await AsyncStorage.getItem('breakTime');

      if (workTimeStr) {
        const work = parseInt(workTimeStr);
        setWorkTime(work);
        setTimeLeft(work * 60);
      }
      if (breakTimeStr) {
        setBreakTime(parseInt(breakTimeStr));
      }
    } catch (error) {
      console.log('Lỗi khi load cài đặt:', error);
    }
  };

  // Xử lý timer
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  // Keep screen awake khi chạy
  useEffect(() => {
    if (isRunning) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }

    return () => {
      deactivateKeepAwake();
    };
  }, [isRunning]);

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF6B6B',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Thông báo', 'Cần cấp quyền thông báo để nhận thông báo khi phiên kết thúc');
      }
    }
  };

  const scheduleNotification = async (seconds, isWork) => {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: isWork ? '🎉 Phiên làm việc hoàn thành!' : '✨ Phiên nghỉ ngơi hoàn thành!',
        body: isWork
          ? 'Đã đến lúc nghỉ ngơi. Hãy thư giãn một chút!'
          : 'Hãy bắt đầu phiên làm việc tiếp theo!',
        sound: true,
      },
      trigger: {
        seconds: seconds,
      },
    });

    notificationIdRef.current = notificationId;
  };

  const cancelNotification = async () => {
    if (notificationIdRef.current) {
      await Notifications.cancelScheduledNotificationAsync(notificationIdRef.current);
      notificationIdRef.current = null;
    }
  };

  const handleStart = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsRunning(true);

    // Lên lịch thông báo
    await scheduleNotification(timeLeft, isWorkSession);
  };

  const handlePause = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsRunning(false);

    // Hủy thông báo đã lên lịch
    await cancelNotification();
  };

  const handleReset = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsRunning(false);
    setTimeLeft(isWorkSession ? workTime * 60 : breakTime * 60);
    await cancelNotification();
  };

  const handleSessionComplete = async () => {
    setIsRunning(false);
    await cancelNotification();

    // Rung mạnh khi hoàn thành
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Lưu vào lịch sử nếu là phiên work
    if (isWorkSession) {
      await saveSession();
      setSessionCount((prev) => prev + 1);
    }

    // Chuyển sang phiên tiếp theo
    const nextIsWork = !isWorkSession;
    setIsWorkSession(nextIsWork);
    setTimeLeft(nextIsWork ? workTime * 60 : breakTime * 60);
  };

  const saveSession = async () => {
    try {
      const session = {
        type: isWorkSession ? 'work' : 'break',
        duration: isWorkSession ? workTime : breakTime,
        date: new Date().toISOString(),
        completedAt: new Date().toLocaleString('vi-VN'),
      };

      const historyStr = await AsyncStorage.getItem('sessionHistory');
      const history = historyStr ? JSON.parse(historyStr) : [];
      history.push(session);

      await AsyncStorage.setItem('sessionHistory', JSON.stringify(history));
    } catch (error) {
      console.log('Lỗi khi lưu phiên:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isWorkSession
    ? ((workTime * 60 - timeLeft) / (workTime * 60)) * 100
    : ((breakTime * 60 - timeLeft) / (breakTime * 60)) * 100;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.sessionType}>
          {isWorkSession ? '💼 Phiên làm việc' : '☕ Phiên nghỉ ngơi'}
        </Text>
        <Text style={styles.sessionCount}>Phiên hoàn thành: {sessionCount}</Text>
      </View>

      <View style={styles.timerContainer}>
        <View style={[styles.timerCircle, { borderColor: isWorkSession ? '#FF6B6B' : '#4ECDC4' }]}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          <Text style={styles.timerLabel}>
            {isWorkSession ? `${workTime} phút làm việc` : `${breakTime} phút nghỉ ngơi`}
          </Text>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
                backgroundColor: isWorkSession ? '#FF6B6B' : '#4ECDC4',
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.controls}>
        {!isRunning ? (
          <TouchableOpacity style={[styles.button, styles.startButton]} onPress={handleStart}>
            <Text style={styles.buttonText}>Bắt đầu</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={handlePause}>
            <Text style={styles.buttonText}>Tạm dừng</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
          <Text style={styles.buttonText}>Đặt lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  sessionType: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  sessionCount: {
    fontSize: 16,
    color: '#aaa',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16213E',
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  timerLabel: {
    fontSize: 16,
    color: '#aaa',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#16213E',
    borderRadius: 4,
    marginTop: 40,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resetButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
