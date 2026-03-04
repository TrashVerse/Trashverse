import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { analyticsService, LeaderboardEntry } from '@/services/analytics';
import { useRouter } from 'expo-router';

export default function LeaderboardScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    loadLeaderboard();
  }, [isAuthenticated]);

  const loadLeaderboard = async () => {
    try {
      const data = await analyticsService.getLeaderboard(20);
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLeaderboard();
    setRefreshing(false);
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) return '#ECFDF5';
    return '#F9FAFB';
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#84CC16" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#14532D" />
        </TouchableOpacity>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.subtitle}>Top recyclers making a difference</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#84CC16']} />
        }
      >
        {leaderboard.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="trophy-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No data available yet</Text>
          </View>
        ) : (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.rankColumn]}>Rank</Text>
              <Text style={[styles.tableHeaderText, styles.userColumn]}>User</Text>
              <Text style={[styles.tableHeaderText, styles.statsColumn]}>Waste</Text>
              <Text style={[styles.tableHeaderText, styles.statsColumn]}>CO₂</Text>
            </View>

            {leaderboard.map((entry) => (
              <View
                key={entry.rank}
                style={[styles.tableRow, { backgroundColor: getRankColor(entry.rank) }]}
              >
                <View style={styles.rankColumn}>
                  <Text style={styles.rankText}>{getMedalEmoji(entry.rank)}</Text>
                </View>
                <View style={styles.userColumn}>
                  <Text style={styles.username}>{entry.username}</Text>
                  <Text style={styles.points}>{entry.points} pts</Text>
                </View>
                <View style={styles.statsColumn}>
                  <Text style={styles.statValue}>{entry.total_waste_kg.toFixed(1)}</Text>
                  <Text style={styles.statUnit}>kg</Text>
                </View>
                <View style={styles.statsColumn}>
                  <Text style={[styles.statValue, styles.co2Value]}>
                    {entry.total_co2_averted_kg.toFixed(1)}
                  </Text>
                  <Text style={styles.statUnit}>kg</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14532D',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  rankColumn: {
    width: 60,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 24,
  },
  userColumn: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  points: {
    fontSize: 12,
    color: '#7C3AED',
    marginTop: 2,
  },
  statsColumn: {
    width: 60,
    alignItems: 'flex-end',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  co2Value: {
    color: '#10B981',
  },
  statUnit: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
  },
});
