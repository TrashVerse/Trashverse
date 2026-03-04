import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { rewardService, Reward } from '@/services/rewards';
import { transactionService } from '@/services/transactions';
import { useRouter } from 'expo-router';

export default function RewardsScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    loadData();
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const [rewardsData, balanceData] = await Promise.all([
        rewardService.getRewards(),
        transactionService.getBalance(),
      ]);
      setRewards(rewardsData);
      setUserPoints(balanceData.points);
    } catch (error) {
      console.error('Failed to load rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleRedeem = async (reward: Reward) => {
    if (userPoints < reward.points_required) {
      Alert.alert('Insufficient Points', 'You do not have enough points to redeem this reward.');
      return;
    }

    if (reward.stock_quantity <= 0) {
      Alert.alert('Out of Stock', 'This reward is currently out of stock.');
      return;
    }

    Alert.alert(
      'Redeem Reward',
      `Redeem ${reward.name} for ${reward.points_required} points?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: async () => {
            try {
              await rewardService.redeemReward(reward.id);
              Alert.alert('Success', 'Reward redeemed successfully!');
              loadData();
            } catch (error: any) {
              Alert.alert('Error', error.response?.data?.detail || 'Failed to redeem reward');
            }
          },
        },
      ]
    );
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
        <Text style={styles.title}>Rewards Shop</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.pointsCard}>
        <Text style={styles.pointsLabel}>Your Points</Text>
        <Text style={styles.pointsValue}>{userPoints}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#84CC16']} />
        }
      >
        {rewards.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="gift-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No rewards available</Text>
          </View>
        ) : (
          rewards.map((reward) => {
            const canAfford = userPoints >= reward.points_required;
            const inStock = reward.stock_quantity > 0;

            return (
              <View key={reward.id} style={styles.card}>
                <View style={styles.rewardIcon}>
                  <Text style={styles.rewardEmoji}>🎁</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{reward.name}</Text>
                  <Text style={styles.cardDescription}>{reward.description}</Text>
                  
                  <View style={styles.cardDetails}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Points Required</Text>
                      <Text style={styles.detailValue}>{reward.points_required}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Value</Text>
                      <Text style={styles.detailValueGreen}>₦{reward.reward_value}</Text>
                    </View>
                  </View>

                  <Text style={styles.stockText}>Stock: {reward.stock_quantity}</Text>

                  <TouchableOpacity
                    style={[
                      styles.redeemButton,
                      (!canAfford || !inStock) && styles.redeemButtonDisabled,
                    ]}
                    onPress={() => handleRedeem(reward)}
                    disabled={!canAfford || !inStock}
                  >
                    <Text style={styles.redeemButtonText}>
                      {!inStock ? 'Out of Stock' : !canAfford ? 'Insufficient Points' : 'Redeem'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14532D',
  },
  pointsCard: {
    backgroundColor: '#F3E8FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 14,
    color: '#7C3AED',
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6D28D9',
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  rewardIcon: {
    width: '100%',
    height: 120,
    backgroundColor: '#84CC16',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardEmoji: {
    fontSize: 64,
  },
  cardContent: {
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C3AED',
  },
  detailValueGreen: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  stockText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  redeemButton: {
    backgroundColor: '#84CC16',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  redeemButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  redeemButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
