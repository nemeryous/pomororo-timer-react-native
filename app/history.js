import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function HistoryScreen() {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    weekData: [],
  });

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    try {
      const historyStr = await AsyncStorage.getItem('sessionHistory');
      if (historyStr) {
        const history = JSON.parse(historyStr);
        setSessions(history.reverse()); // Hiển thị mới nhất trước
        calculateStats(history);
      }
    } catch (error) {
      console.log('Lỗi khi load lịch sử:', error);
    }
  };

  const calculateStats = (history) => {
    // Tính tổng số phiên work
    const workSessions = history.filter((s) => s.type === 'work');
    const totalSessions = workSessions.length;
    const totalMinutes = workSessions.reduce((sum, s) => sum + s.duration, 0);

    // Tính số phiên theo 7 ngày gần nhất
    const last7Days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const sessionsOnDay = workSessions.filter((s) => {
        const sessionDate = new Date(s.date).toISOString().split('T')[0];
        return sessionDate === dateStr;
      }).length;

      last7Days.push({
        day: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()],
        count: sessionsOnDay,
      });
    }

    setStats({
      totalSessions,
      totalMinutes,
      weekData: last7Days,
    });
  };

  const clearHistory = () => {
    Alert.alert(
      'Xóa lịch sử',
      'Bạn có chắc chắn muốn xóa toàn bộ lịch sử? Hành động này không thể hoàn tác.',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('sessionHistory');
              setSessions([]);
              setStats({ totalSessions: 0, totalMinutes: 0, weekData: [] });
            } catch (error) {
              console.log('Lỗi khi xóa lịch sử:', error);
            }
          },
        },
      ]
    );
  };

  const chartData = {
    labels: stats.weekData.map((d) => d.day),
    datasets: [
      {
        data:
          stats.weekData.length > 0 ? stats.weekData.map((d) => d.count) : [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalSessions}</Text>
          <Text style={styles.statLabel}>Phiên hoàn thành</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalMinutes}</Text>
          <Text style={styles.statLabel}>Phút làm việc</Text>
        </View>
      </View>

      {stats.weekData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>📊 Thống kê 7 ngày</Text>
          <BarChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#16213E',
              backgroundGradientFrom: '#16213E',
              backgroundGradientTo: '#16213E',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 12,
              },
            }}
            style={styles.chart}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero
            showValuesOnTopOfBars
          />
        </View>
      )}

      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Lịch sử gần đây</Text>
        {sessions.length > 0 && (
          <TouchableOpacity onPress={clearHistory}>
            <Text style={styles.clearButton}>Xóa tất cả</Text>
          </TouchableOpacity>
        )}
      </View>

      {sessions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>📝</Text>
          <Text style={styles.emptyMessage}>Chưa có phiên nào</Text>
          <Text style={styles.emptySubtext}>Hoàn thành phiên làm việc đầu tiên để xem lịch sử</Text>
        </View>
      ) : (
        <View style={styles.sessionsList}>
          {sessions.map((session, index) => (
            <View key={index} style={styles.sessionCard}>
              <View style={styles.sessionIcon}>
                <Text style={styles.sessionEmoji}>{session.type === 'work' ? '💼' : '☕'}</Text>
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionType}>
                  {session.type === 'work' ? 'Làm việc' : 'Nghỉ ngơi'}
                </Text>
                <Text style={styles.sessionDate}>{session.completedAt}</Text>
              </View>
              <View style={styles.sessionDuration}>
                <Text style={styles.durationText}>{session.duration}</Text>
                <Text style={styles.durationLabel}>phút</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#16213E',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  chartContainer: {
    padding: 20,
    paddingTop: 0,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  chart: {
    borderRadius: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  clearButton: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 15,
  },
  emptyMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  sessionsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213E',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  sessionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A1A2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  sessionEmoji: {
    fontSize: 24,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  sessionDate: {
    fontSize: 12,
    color: '#aaa',
  },
  sessionDuration: {
    alignItems: 'center',
  },
  durationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  durationLabel: {
    fontSize: 12,
    color: '#aaa',
  },
});
