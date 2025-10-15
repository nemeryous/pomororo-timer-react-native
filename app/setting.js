import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

export default function SettingsScreen() {
  const [workTime, setWorkTime] = useState('25');
  const [breakTime, setBreakTime] = useState('5');
  const [longBreakTime, setLongBreakTime] = useState('15');
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState('4');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const work = await AsyncStorage.getItem('workTime');
      const shortBreak = await AsyncStorage.getItem('breakTime');
      const longBreak = await AsyncStorage.getItem('longBreakTime');
      const sessions = await AsyncStorage.getItem('sessionsBeforeLongBreak');

      if (work) setWorkTime(work);
      if (shortBreak) setBreakTime(shortBreak);
      if (longBreak) setLongBreakTime(longBreak);
      if (sessions) setSessionsBeforeLongBreak(sessions);
    } catch (error) {
      console.log('Lỗi khi load cài đặt:', error);
    }
  };

  const validateInput = (value, min, max, name) => {
    const num = parseInt(value);
    if (isNaN(num)) {
      Alert.alert('Lỗi', `${name} phải là một số`);
      return false;
    }
    if (num < min || num > max) {
      Alert.alert('Lỗi', `${name} phải từ ${min} đến ${max} phút`);
      return false;
    }
    return true;
  };

  const saveSettings = async () => {
    // Validate inputs
    if (!validateInput(workTime, 1, 120, 'Thời gian làm việc')) return;
    if (!validateInput(breakTime, 1, 60, 'Thời gian nghỉ ngắn')) return;
    if (!validateInput(longBreakTime, 1, 60, 'Thời gian nghỉ dài')) return;
    if (!validateInput(sessionsBeforeLongBreak, 1, 10, 'Số phiên trước nghỉ dài')) return;

    try {
      await AsyncStorage.setItem('workTime', workTime);
      await AsyncStorage.setItem('breakTime', breakTime);
      await AsyncStorage.setItem('longBreakTime', longBreakTime);
      await AsyncStorage.setItem('sessionsBeforeLongBreak', sessionsBeforeLongBreak);

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('Thành công', 'Đã lưu cài đặt!');
    } catch (error) {
      console.log('Lỗi khi lưu cài đặt:', error);
      Alert.alert('Lỗi', 'Không thể lưu cài đặt');
    }
  };

  const resetToDefault = () => {
    Alert.alert('Khôi phục mặc định', 'Bạn có muốn khôi phục cài đặt mặc định không?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Khôi phục',
        onPress: () => {
          setWorkTime('25');
          setBreakTime('5');
          setLongBreakTime('15');
          setSessionsBeforeLongBreak('4');
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⏱️ Thời gian</Text>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Thời gian làm việc (phút)</Text>
          <TextInput
            style={styles.input}
            value={workTime}
            onChangeText={setWorkTime}
            keyboardType="numeric"
            placeholder="25"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Thời gian nghỉ ngắn (phút)</Text>
          <TextInput
            style={styles.input}
            value={breakTime}
            onChangeText={setBreakTime}
            keyboardType="numeric"
            placeholder="5"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Thời gian nghỉ dài (phút)</Text>
          <TextInput
            style={styles.input}
            value={longBreakTime}
            onChangeText={setLongBreakTime}
            keyboardType="numeric"
            placeholder="15"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.label}>Số phiên trước khi nghỉ dài</Text>
          <TextInput
            style={styles.input}
            value={sessionsBeforeLongBreak}
            onChangeText={setSessionsBeforeLongBreak}
            keyboardType="numeric"
            placeholder="4"
            placeholderTextColor="#666"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Hướng dẫn</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>Kỹ thuật Pomodoro:</Text>
            {'\n'}
            1. Chọn một nhiệm vụ{'\n'}
            2. Làm việc tập trung trong 25 phút{'\n'}
            3. Nghỉ ngơi 5 phút{'\n'}
            4. Sau 4 phiên, nghỉ dài 15-30 phút
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveSettings}>
          <Text style={styles.buttonText}>💾 Lưu cài đặt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetToDefault}>
          <Text style={styles.buttonText}>🔄 Khôi phục mặc định</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Pomodoro Timer v1.0</Text>
        <Text style={styles.footerSubtext}>Được xây dựng với ❤️ sử dụng React Native & Expo</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  settingItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#16213E',
    color: '#fff',
    fontSize: 18,
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2A3F5F',
  },
  infoCard: {
    backgroundColor: '#16213E',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  infoText: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 22,
  },
  infoBold: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    padding: 30,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#555',
  },
});
