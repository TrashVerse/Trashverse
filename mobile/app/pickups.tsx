import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { pickupService, PickupResponse, PickupCreate } from '@/services/pickups';
import { WasteType } from '@/services/waste';
import { useRouter } from 'expo-router';

export default function PickupsScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [pickups, setPickups] = useState<PickupResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPickup, setEditingPickup] = useState<PickupResponse | null>(null);
  const [formData, setFormData] = useState<PickupCreate>({
    pickup_address: '',
    waste_type: 'plastic',
    estimated_weight_kg: 0,
    notes: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    loadPickups();
  }, [isAuthenticated]);

  const loadPickups = async () => {
    try {
      const data = await pickupService.getPickups();
      setPickups(data);
    } catch (error) {
      console.error('Failed to load pickups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.pickup_address) {
      Alert.alert('Error', 'Please enter pickup address');
      return;
    }

    if (formData.estimated_weight_kg <= 0) {
      Alert.alert('Error', 'Please enter valid weight');
      return;
    }

    try {
      if (editingPickup) {
        await pickupService.updatePickup(editingPickup.id, formData);
        Alert.alert('Success', 'Pickup updated successfully!');
      } else {
        await pickupService.schedulePickup(formData);
        Alert.alert('Success', 'Pickup scheduled successfully!');
      }
      setShowForm(false);
      setEditingPickup(null);
      setFormData({
        pickup_address: '',
        waste_type: 'plastic',
        estimated_weight_kg: 0,
        notes: '',
      });
      loadPickups();
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to save pickup');
    }
  };

  const handleEdit = (pickup: PickupResponse) => {
    setEditingPickup(pickup);
    setFormData({
      pickup_address: pickup.pickup_address,
      waste_type: pickup.waste_type as WasteType || 'plastic',
      estimated_weight_kg: pickup.estimated_weight_kg || 0,
      notes: pickup.notes || '',
    });
    setShowForm(true);
  };

  const handleCancel = async (id: number) => {
    Alert.alert(
      'Cancel Pickup',
      'Are you sure you want to cancel this pickup?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await pickupService.cancelPickup(id);
              Alert.alert('Success', 'Pickup cancelled successfully');
              loadPickups();
            } catch (error: any) {
              Alert.alert('Error', error.response?.data?.detail || 'Failed to cancel pickup');
            }
          },
        },
      ]
    );
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPickup(null);
    setFormData({
      pickup_address: '',
      waste_type: 'plastic',
      estimated_weight_kg: 0,
      notes: '',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: '#F59E0B',
      scheduled: '#3B82F6',
      in_progress: '#8B5CF6',
      completed: '#10B981',
      cancelled: '#EF4444',
    };
    return colors[status] || '#6B7280';
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
        <Text style={styles.title}>Pickups</Text>
        <TouchableOpacity onPress={() => showForm ? handleCloseForm() : setShowForm(true)}>
          <Ionicons name={showForm ? 'close' : 'add'} size={24} color="#84CC16" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {editingPickup ? 'Update Pickup' : 'Schedule Pickup'}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Pickup Address"
              value={formData.pickup_address}
              onChangeText={(text) => setFormData({ ...formData, pickup_address: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Estimated Weight (kg)"
              value={formData.estimated_weight_kg.toString()}
              onChangeText={(text) =>
                setFormData({ ...formData, estimated_weight_kg: parseFloat(text) || 0 })
              }
              keyboardType="decimal-pad"
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Notes (optional)"
              value={formData.notes}
              onChangeText={(text) => setFormData({ ...formData, notes: text })}
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>
                {editingPickup ? 'Update Pickup' : 'Schedule Pickup'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {pickups.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="car-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>No pickups scheduled</Text>
          </View>
        ) : (
          pickups.map((pickup) => (
            <View key={pickup.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{pickup.waste_type}</Text>
                <View
                  style={[styles.statusBadge, { backgroundColor: getStatusColor(pickup.status) + '20' }]}
                >
                  <Text style={[styles.statusText, { color: getStatusColor(pickup.status) }]}>
                    {pickup.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardAddress}>{pickup.pickup_address}</Text>
              <View style={styles.cardDetails}>
                <Text style={styles.cardDetail}>Weight: {pickup.estimated_weight_kg} kg</Text>
                {pickup.scheduled_date && (
                  <Text style={styles.cardDetail}>
                    {new Date(pickup.scheduled_date).toLocaleDateString()}
                  </Text>
                )}
              </View>
              {pickup.notes && (
                <Text style={styles.cardNotes}>{pickup.notes}</Text>
              )}
              {pickup.status !== 'completed' && pickup.status !== 'cancelled' && (
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => handleEdit(pickup)}
                  >
                    <Ionicons name="create-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={() => handleCancel(pickup.id)}
                  >
                    <Ionicons name="close-circle-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14532D',
  },
  formCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#84CC16',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
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
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  cardAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetail: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  cardNotes: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  editButton: {
    backgroundColor: '#3B82F6',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
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
