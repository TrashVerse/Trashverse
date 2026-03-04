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
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { stationService, RecyclingStation } from '@/services/stations';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';

export default function StationsScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [stations, setStations] = useState<RecyclingStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchingNearest, setSearchingNearest] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    loadStations();
    getUserLocation();
  }, [isAuthenticated]);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      console.error('Failed to get location:', error);
    }
  };

  const loadStations = async (latitude?: number, longitude?: number) => {
    try {
      const data = await stationService.getStations(latitude, longitude);
      setStations(data);
    } catch (error) {
      console.error('Failed to load stations:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStations();
    setRefreshing(false);
  };

  const handleFindNearest = async () => {
    if (!userLocation) {
      Alert.alert(
        'Location Required',
        'Please enable location services to find the nearest station.'
      );
      return;
    }

    try {
      setSearchingNearest(true);
      const nearest = await stationService.findNearest(userLocation.lat, userLocation.lng);
      setStations([nearest]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to find nearest station');
    } finally {
      setSearchingNearest(false);
    }
  };

  const handleShowAll = () => {
    setLoading(true);
    loadStations();
  };

  const handleOpenMap = (station: RecyclingStation) => {
    if (station.latitude && station.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${station.latitude},${station.longitude}`;
      Linking.openURL(url);
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
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
        <Text style={styles.title}>Stations</Text>
        <View style={{ width: 24 }} />
      </View>

      {userLocation && (
        <View style={styles.locationBanner}>
          <Ionicons name="location" size={16} color="#10B981" />
          <Text style={styles.locationText}>Location services enabled</Text>
        </View>
      )}

      <View style={styles.actionButtons}>
        {userLocation && (
          <TouchableOpacity
            style={[styles.actionButton, styles.nearestButton]}
            onPress={handleFindNearest}
            disabled={searchingNearest}
          >
            <Ionicons name="navigate" size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>
              {searchingNearest ? 'Searching...' : 'Find Nearest'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.allButton]}
          onPress={handleShowAll}
        >
          <Ionicons name="list" size={18} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Show All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#84CC16']} />
        }
      >
        {stations.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="business-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No recycling stations found</Text>
          </View>
        ) : (
          stations.map((station) => (
            <View key={station.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{station.name}</Text>
                {station.distance_km !== undefined && (
                  <View style={styles.distanceBadge}>
                    <Text style={styles.distanceText}>{station.distance_km.toFixed(1)} km</Text>
                  </View>
                )}
              </View>

              <View style={styles.cardDetail}>
                <Ionicons name="location-outline" size={16} color="#6B7280" />
                <Text style={styles.cardDetailText}>
                  {station.address}, {station.city}
                </Text>
              </View>

              {station.phone && (
                <TouchableOpacity
                  style={styles.cardDetail}
                  onPress={() => handleCall(station.phone!)}
                >
                  <Ionicons name="call-outline" size={16} color="#6B7280" />
                  <Text style={[styles.cardDetailText, styles.linkText]}>{station.phone}</Text>
                </TouchableOpacity>
              )}

              {station.operating_hours && (
                <View style={styles.cardDetail}>
                  <Ionicons name="time-outline" size={16} color="#6B7280" />
                  <Text style={styles.cardDetailText}>{station.operating_hours}</Text>
                </View>
              )}

              {station.accepted_waste_types && (
                <View style={styles.wasteTypes}>
                  <Text style={styles.wasteTypesLabel}>Accepted Waste:</Text>
                  <View style={styles.wasteTypesContainer}>
                    {station.accepted_waste_types.split(',').map((type, idx) => (
                      <View key={idx} style={styles.wasteTypeBadge}>
                        <Text style={styles.wasteTypeText}>{type.trim()}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {station.latitude && station.longitude && (
                <TouchableOpacity
                  style={styles.mapButton}
                  onPress={() => handleOpenMap(station)}
                >
                  <Ionicons name="map-outline" size={16} color="#3B82F6" />
                  <Text style={styles.mapButtonText}>Open in Maps</Text>
                </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14532D',
  },
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#10B981',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  nearestButton: {
    backgroundColor: '#3B82F6',
  },
  allButton: {
    backgroundColor: '#84CC16',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  distanceBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E40AF',
  },
  cardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cardDetailText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  linkText: {
    color: '#3B82F6',
  },
  wasteTypes: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  wasteTypesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  wasteTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  wasteTypeBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  wasteTypeText: {
    fontSize: 11,
    color: '#10B981',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
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
