import RecyclingGuide from "@/components/RecyclingGuide";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { analyticsService, DashboardStats } from "@/services/analytics";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { user, refreshUser, isAuthenticated } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboard();
    }
  }, [isAuthenticated]);

  const loadDashboard = async () => {
    try {
      const data = await analyticsService.getDashboard();
      setDashboard(data);
      await refreshUser();
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#84CC16" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require("@/assets/images/newLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.logoText}>TrashVerse</Text>
          <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={22} color="#14532D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Ionicons name="person" size={22} color="#365314" />
        </TouchableOpacity>
      </View>
        </View>
      </View>
  <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#84CC16']} />
      }
    >
      {/* GREETING */}

        <Text style={styles.greeting}>  Hi, {user?.full_name || user?.username}</Text>
        <Text style={styles.moto}>   Lets transform waste into wealth</Text>

      {/* LOCATION */}
      <View style={styles.location}>
        <Ionicons name="location" size={16} color="#166534" />
        <Text style={styles.locationText}>
          {user?.city || 'Aba South'}, {user?.postal_code || '643677'}
        </Text>
      </View>

      {/* RECYCLING GUIDE */}
      {/* <Text style={styles.sectionTitle}>Recycling Guide</Text> */}
      <RecyclingGuide />

      <View style={styles.guideRow}>
        {/* {[
          "trash",
          "newspaper",
          "shirt-outline",
          "hardware-chip-outline",
          "leaf-outline",
        ].map((icon, index) => (
          <View key={index} style={styles.guideIcon}>
            <Ionicons name={icon as any} size={22} color="#65A30D" />
          </View>
        ))} */}
      </View>

      {/* STATS */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIconBg}>
            <Ionicons name="wallet-outline" size={22} color="#4BAE4F" />
          </View>
          <Text style={styles.statValue}>₦{user?.total_earnings?.toFixed(0) || 0}</Text>
          <Text style={styles.statLabel}>Earned so far</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconBg}>
            <Ionicons name="car-outline" size={22} color="#4BAE4F" />
          </View>
          <Text style={styles.statValue}>{user?.total_pickups || 0}</Text>
          <Text style={styles.statLabel}>Pickups</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconBg}>
            <Ionicons name="trash-outline" size={22} color="#4BAE4F" />
          </View>
          <Text style={styles.statValue}>{user?.total_waste_kg?.toFixed(1) || 0}kg</Text>
          <Text style={styles.statLabel}>Waste</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconBg}>
            <Ionicons name="cloud-outline" size={22} color="#4BAE4F" />
          </View>
          <Text style={styles.statValue}>{user?.total_co2_averted_kg?.toFixed(1) || 0}kg</Text>
          <Text style={styles.statLabel}>CO₂ Averted</Text>
        </View>
      </View>

      {/* RECYCLE TODAY */}
      <View style={styles.recycleCard}>
        <Text style={styles.recycleTitle}>Recycle Today</Text>
        <Text style={styles.recycleSub}>Earn points</Text>

        <TouchableOpacity style={styles.recycleBtn} onPress={() => router.push('/(tabs)/sell')}>
          <Text style={styles.recycleBtnText}>Earn Now</Text>
        </TouchableOpacity>
      </View>

      {/* QUICK ACTIONS */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/pickups')}>
          <Ionicons name="car-outline" size={32} color="#3B82F6" />
          <Text style={styles.actionText}>Pickups</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/rewards')}>
          <Ionicons name="gift-outline" size={32} color="#8B5CF6" />
          <Text style={styles.actionText}>Rewards</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/stations')}>
          <Ionicons name="business-outline" size={32} color="#10B981" />
          <Text style={styles.actionText}>Stations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/leaderboard')}>
          <Ionicons name="trophy-outline" size={32} color="#F59E0B" />
          <Text style={styles.actionText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {/* ECOCOACH */}
      <View style={styles.ecoCoach}>
        <Text style={styles.ecoText}>
          Access exclusive information from our EcoCoach AI
        </Text>
        <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },

  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom:10,
  },

  logo: {
    width: 28,
    height: 28,
  },

  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#14532D",
  },

  greeting: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "500",
  },

  moto: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  headerRight:{
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginLeft: 170,
  },

  profile:{
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f4f4f4",
    padding: 10,
    borderRadius: 12,
    marginTop: 16,
  },

  locationText: {
    fontSize: 13,
    color: "gray",
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "600",
  },

  guideRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  guideIcon: {
    width: 52,
    height: 52,
    backgroundColor: "#ECFDF5",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 24,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#F7FEE7",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: "flex-start",
  },

  statIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#B6E388",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#365314",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#4D7C0F",
  },

  recycleCard: {
    backgroundColor: "#B7E28A",
    width: "80%",
    height: 140,
    borderRadius: 20,
    padding: 16,
    marginTop: 8,
    resizeMode: "cover",
  },

  recycleTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    fontFamily: "poppins-bold",
  },

  recycleSub: {
    marginTop: 4,
    fontSize: 35,
    color: "white",
    fontFamily: "poppins-bold",
  },

  recycleBtn: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderRadius: 12,
    width: 120,
    alignItems: "center",
    marginBottom: 5,
  },

  recycleBtnText: {
    color: "#365314",
    fontWeight: "600",
    fontFamily: "poppins-semibold",
  },

  ecoCoach:{
    marginTop: 16,
    backgroundColor: "#84CC16",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", 
  },
  ecoText:{
    color: "#FFFFFF",
    fontSize: 14,
    width: "90%",
  },

  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },

  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});
