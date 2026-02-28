import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { wasteService, WasteType } from '@/services/waste';
import { useRouter } from 'expo-router';

const wasteTypes: { type: WasteType; label: string; icon: any; color: string }[] = [
  { type: 'plastic', label: 'Plastic', icon: 'water-outline', color: '#3B82F6' },
  { type: 'paper', label: 'Paper', icon: 'document-outline', color: '#F59E0B' },
  { type: 'metal', label: 'Metal', icon: 'cube-outline', color: '#6B7280' },
  { type: 'electronics', label: 'Electronics', icon: 'hardware-chip-outline', color: '#8B5CF6' },
  { type: 'glass', label: 'Glass', icon: 'wine-outline', color: '#10B981' },
  { type: 'organic', label: 'Organic', icon: 'leaf-outline', color: '#84CC16' },
  { type: 'textile', label: 'Textile', icon: 'shirt-outline', color: '#EC4899' },
];

export default function SellScreen() {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<WasteType | null>(null);
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a waste type');
      return;
    }

    const weightNum = parseFloat(weight);
    if (!weightNum || weightNum <= 0) {
      Alert.alert('Error', 'Please enter a valid weight');
      return;
    }

    try {
      setLoading(true);
      const entry = await wasteService.createEntry({
        waste_type: selectedType,
        weight_kg: weightNum,
        description: description.trim() || undefined,
      });

      await refreshUser();

      Alert.alert(
        'Success! 🎉',
        `You earned ₦${entry.amount_earned} and ${entry.points_earned} points!`,
        [
          {
            text: 'View History',
            onPress: () => router.push('/(tabs)/history'),
          },
          {
            text: 'Add More',
            onPress: () => {
              setSelectedType(null);
              setWeight('');
              setDescription('');
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to create entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recycle Waste</Text>
        <Text style={styles.subtitle}>Select waste type and enter weight</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Waste Type</Text>
        <View style={styles.typeGrid}>
          {wasteTypes.map((item) => (
            <TouchableOpacity
              key={item.type}
              style={[
                styles.typeCard,
                selectedType === item.type && styles.typeCardSelected,
              ]}
              onPress={() => setSelectedType(item.type)}
            >
              <View
                style={[
                  styles.typeIcon,
                  { backgroundColor: item.color + '20' },
                  selectedType === item.type && { backgroundColor: item.color },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={selectedType === item.type ? 'white' : item.color}
                />
              </View>
              <Text style={styles.typeLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Weight (kg)</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="scale-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter weight in kg"
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
            editable={!loading}
          />
        </View>

        <Text style={styles.sectionTitle}>Description (Optional)</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="text-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="e.g., Plastic bottles"
            value={description}
            onChangeText={setDescription}
            editable={!loading}
          />
        </View>

        {selectedType && weight && (
          <View style={styles.preview}>
            <Text style={styles.previewTitle}>Estimated Earnings</Text>
            <Text style={styles.previewAmount}>
              ₦{(parseFloat(weight) * getPricing(selectedType)).toFixed(2)}
            </Text>
            <Text style={styles.previewPoints}>
              {Math.floor(parseFloat(weight) * getPoints(selectedType))} points
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading || !selectedType || !weight}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Entry</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const getPricing = (type: WasteType): number => {
  const pricing: Record<WasteType, number> = {
    plastic: 50,
    paper: 30,
    metal: 80,
    electronics: 150,
    glass: 40,
    organic: 20,
    textile: 35,
  };
  return pricing[type];
};

const getPoints = (type: WasteType): number => {
  const points: Record<WasteType, number> = {
    plastic: 10,
    paper: 8,
    metal: 15,
    electronics: 25,
    glass: 10,
    organic: 5,
    textile: 8,
  };
  return points[type];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#14532D',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
    color: '#1F2937',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardSelected: {
    borderColor: '#84CC16',
    backgroundColor: '#F0FDF4',
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  preview: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  previewTitle: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 8,
  },
  previewAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#14532D',
  },
  previewPoints: {
    fontSize: 16,
    color: '#166534',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#84CC16',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
