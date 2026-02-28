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
import { wasteService, WasteEntryResponse } from '@/services/waste';
import { transactionService, Transaction } from '@/services/transactions';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function HistoryScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'waste' | 'transactions'>('waste');
  const [wasteEntries, setWasteEntries] = useState<WasteEntryResponse[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    loadData();
  }, [isAuthenticated, activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === 'waste') {
        const data = await wasteService.getEntries();
        setWasteEntries(data);
      } else {
        const data = await transactionService.getTransactions();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getWasteIcon = (type: string) => {
    const icons: Record<string, any> = {
      plastic: 'water-outline',
      paper: 'document-outline',
      metal: 'cube-outline',
      electronics: 'hardware-chip-outline',
      glass: 'wine-outline',
      organic: 'leaf-outline',
      textile: 'shirt-outline',
    };
    return icons[type] || 'trash-outline';
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
        <Text style={styles.title}>History</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'waste' && styles.tabActive]}
          onPress={() => setActiveTab('waste')}
        >
          <Text style={[styles.tabText, activeTab === 'waste' && styles.tabTextActive]}>
            Waste Entries
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'transactions' && styles.tabActive]}
          onPress={() => setActiveTab('transactions')}
        >
          <Text style={[styles.tabText, activeTab === 'transactions' && styles.tabTextActive]}>
            Transactions
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {activeTab === 'waste' ? (
          wasteEntries.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="trash-outline" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>No waste entries yet</Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => router.push('/(tabs)/sell')}
              >
                <Text style={styles.emptyButtonText}>Add Entry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            wasteEntries.map((entry) => (
              <View key={entry.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardIcon}>
                    <Ionicons name={getWasteIcon(entry.waste_type)} size={24} color="#84CC16" />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>
                      {entry.waste_type.charAt(0).toUpperCase() + entry.waste_type.slice(1)}
                    </Text>
                    <Text style={styles.cardDate}>{formatDate(entry.created_at)}</Text>
                  </View>
                  <View style={styles.cardAmount}>
                    <Text style={styles.cardEarnings}>₦{entry.amount_earned}</Text>
                    <Text style={styles.cardPoints}>{entry.points_earned} pts</Text>
                  </View>
                </View>
                <View style={styles.cardDetails}>
                  <Text style={styles.cardWeight}>{entry.weight_kg} kg</Text>
                  {entry.description && (
                    <Text style={styles.cardDescription}>{entry.description}</Text>
                  )}
                </View>
              </View>
            ))
          )
        ) : transactions.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No transactions yet</Text>
          </View>
        ) : (
          transactions.map((transaction) => (
            <View key={transaction.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.cardIcon,
                    { backgroundColor: transaction.amount >= 0 ? '#DCFCE7' : '#FEE2E2' },
                  ]}
                >
                  <Ionicons
                    name={transaction.amount >= 0 ? 'arrow-down' : 'arrow-up'}
                    size={24}
                    color={transaction.amount >= 0 ? '#16A34A' : '#DC2626'}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{transaction.type}</Text>
                  <Text style={styles.cardDate}>{formatDate(transaction.created_at)}</Text>
                </View>
                <View style={styles.cardAmount}>
                  <Text
                    style={[
                      styles.cardEarnings,
                      { color: transaction.amount >= 0 ? '#16A34A' : '#DC2626' },
                    ]}
                  >
                    {transaction.amount >= 0 ? '+' : ''}₦{Math.abs(transaction.amount)}
                  </Text>
                  {transaction.points !== 0 && (
                    <Text style={styles.cardPoints}>
                      {transaction.points > 0 ? '+' : ''}
                      {transaction.points} pts
                    </Text>
                  )}
                </View>
              </View>
              {transaction.description && (
                <Text style={styles.cardDescription}>{transaction.description}</Text>
              )}
            </View>
          ))
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
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#14532D',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#14532D',
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textTransform: 'capitalize',
  },
  cardDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  cardAmount: {
    alignItems: 'flex-end',
  },
  cardEarnings: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14532D',
  },
  cardPoints: {
    fontSize: 12,
    color: '#84CC16',
    marginTop: 2,
  },
  cardDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cardWeight: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
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
  emptyButton: {
    backgroundColor: '#84CC16',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
