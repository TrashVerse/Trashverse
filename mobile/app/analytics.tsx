import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { analyticsService, UserStats } from '@/services/analytics';
import { useRouter } from 'expo-router';

export default function AnalyticsScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    loadStats();
  }, [isAuthenticated]);

  const loadStats = async () => {
    try {
      const data = await analyticsService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#84CC16" />
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Failed to load analytics</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#14532D" />
        </TouchableOpacity>
        <Text style={styles.title}>Analytics</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#DCFCE7' }]}>
            <Ionicons name="cash-outline" size={32} color="#16A34A" />
            <Text style={styles.statValue}>₦{stats.total_stats.earnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#DBEAFE' }]}>
            <Ionicons name="trash-outline" size={32} color="#2563EB" />
            <Text style={styles.statValue}>{stats.total_stats.waste_kg.toFixed(1)} kg</Text>
            <Text style={styles.statLabel}>Total Waste</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#D1FAE5' }]}>
            <Ionicons name="leaf-outline" size={32} color="#059669" />
            <Text style={styles.statValue}>{stats.total_stats.co2_averted_kg.toFixed(1)} kg</Text>
            <Text style={styles.statLabel}>CO₂ Averted</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#E9D5FF' }]}>
            <Ionicons name="star-outline" size={32} color="#9333EA" />
            <Text style={styles.statValue}>{stats.total_stats.points}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Performance</Text>
          <View style={styles.card}>
            <View style={styles.monthlyRow}>
              <View style={styles.monthlyItem}>
                <Text style={styles.monthlyLabel}>Waste (Last 30 Days)</Text>
                <Text style={styles.monthlyValue}>{stats.monthly_stats.waste_kg.toFixed(1)} kg</Text>
              </View>
              <View style={styles.monthlyItem}>
                <Text style={styles.monthlyLabel}>Earnings</Text>
                <Text style={[styles.monthlyValue, { color: '#16A34A' }]}>
                  ₦{stats.monthly_stats.earnings.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.averageRow}>
              <View style={styles.averageItem}>
                <Text style={styles.averageLabel}>Avg per Day</Text>
                <Text style={styles.averageValue}>
                  {(stats.monthly_stats.waste_kg / 30).toFixed(2)} kg/day
                </Text>
              </View>
              <View style={styles.averageItem}>
                <Text style={styles.averageLabel}>Daily Earnings</Text>
                <Text style={styles.averageValue}>
                  ₦{(stats.monthly_stats.earnings / 30).toFixed(2)}/day
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Waste Breakdown</Text>
          {Object.keys(stats.waste_breakdown).length === 0 ? (
            <View style={styles.card}>
              <Text style={styles.emptyText}>No waste data yet</Text>
            </View>
          ) : (
            Object.entries(stats.waste_breakdown).map(([type, data]: [string, any]) => (
              <View key={type} style={styles.wasteCard}>
                <View style={styles.wasteHeader}>
                  <Text style={styles.wasteType}>{type}</Text>
                  <Text style={styles.wasteCount}>{data.count} entries</Text>
                </View>
                <View style={styles.wasteDetails}>
                  <Text style={styles.wasteDetail}>Weight: {data.total_weight.toFixed(1)} kg</Text>
                  <Text style={[styles.wasteDetail, { color: '#16A34A', fontWeight: '600' }]}>
                    ₦{data.total_earnings.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${(data.total_weight / stats.total_stats.waste_kg) * 100}%` },
                    ]}
                  />
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environmental Impact</Text>
          <View style={styles.impactGrid}>
            <View style={styles.impactCard}>
              <Text style={styles.impactEmoji}>🌳</Text>
              <Text style={styles.impactValue}>
                {(stats.total_stats.co2_averted_kg / 21).toFixed(1)}
              </Text>
              <Text style={styles.impactLabel}>Trees Equivalent</Text>
              <Text style={styles.impactNote}>Based on avg tree CO₂ absorption</Text>
            </View>

            <View style={styles.impactCard}>
              <Text style={styles.impactEmoji}>🚗</Text>
              <Text style={styles.impactValue}>
                {(stats.total_stats.co2_averted_kg / 0.12).toFixed(0)}
              </Text>
              <Text style={styles.impactLabel}>km Driving Saved</Text>
              <Text style={styles.impactNote}>Average car emissions per km</Text>
            </View>

            <View style={styles.impactCard}>
              <Text style={styles.impactEmoji}>♻️</Text>
              <Text style={styles.impactValue}>{stats.total_stats.pickups}</Text>
              <Text style={styles.impactLabel}>Total Pickups</Text>
              <Text style={styles.impactNote}>Waste collection events</Text>
            </View>
          </View>
        </View>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14532D',
  },
  errorText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#14532D',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#14532D',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  monthlyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthlyItem: {
    flex: 1,
  },
  monthlyLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  monthlyValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#14532D',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  averageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  averageItem: {
    flex: 1,
  },
  averageLabel: {
    fontSize: 12,
    color: '#3B82F6',
    marginBottom: 4,
  },
  averageValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
  },
  wasteCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  wasteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  wasteType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#14532D',
    textTransform: 'capitalize',
  },
  wasteCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  wasteDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  wasteDetail: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#84CC16',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 20,
  },
  impactGrid: {
    gap: 12,
  },
  impactCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  impactEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  impactValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 4,
  },
  impactLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  impactNote: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
