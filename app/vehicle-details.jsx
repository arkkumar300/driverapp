import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import { ArrowLeft, Save, Car, Hash, Calendar, Fuel, Users, FileText } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function VehicleDetailsScreen() {
  const router = useRouter();
  const [vehicleData, setVehicleData] = useState({
    vehicleNumber: 'AP 01 AB 1234',
    vehicleType: 'Sedan',
    brand: 'Maruti Suzuki',
    model: 'Dzire',
    year: '2022',
    color: 'White',
    seatingCapacity: '4',
    fuelType: 'Petrol',
    insuranceNumber: 'INS123456789',
    rcNumber: 'RC987654321',
  });

  const handleSave = () => {
    Alert.alert(
      'Success',
      'Vehicle details updated successfully!',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const updateField = (field, value) => {
    setVehicleData(prev => ({ ...prev, [field]: value }));
  };

  const vehicleTypes = ['Sedan', 'Hatchback', 'SUV', 'Tempo Traveller'];
  const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Vehicle Details</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Save size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.vehicleImageSection}>
          <View style={styles.vehicleImage}>
            <Car size={48} color="#FFFFFF" />
          </View>
          <TouchableOpacity style={styles.addPhotoButton}>
            <Text style={styles.addPhotoText}>Add Vehicle Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Hash size={20} color="#6B7280" />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>Vehicle Number</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.vehicleNumber}
                onChangeText={(value) => updateField('vehicleNumber', value)}
                placeholder="Enter vehicle number"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Car size={20} color="#6B7280" />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>Vehicle Type</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.vehicleType}
                onChangeText={(value) => updateField('vehicleType', value)}
                placeholder="Select vehicle type"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInputGroup}>
              <Text style={styles.inputLabel}>Brand</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.brand}
                onChangeText={(value) => updateField('brand', value)}
                placeholder="Brand"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.halfInputGroup}>
              <Text style={styles.inputLabel}>Model</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.model}
                onChangeText={(value) => updateField('model', value)}
                placeholder="Model"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInputGroup}>
              <Text style={styles.inputLabel}>Year</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.year}
                onChangeText={(value) => updateField('year', value)}
                placeholder="Year"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInputGroup}>
              <Text style={styles.inputLabel}>Color</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.color}
                onChangeText={(value) => updateField('color', value)}
                placeholder="Color"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInputGroup}>
              <Text style={styles.inputLabel}>Seating Capacity</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.seatingCapacity}
                onChangeText={(value) => updateField('seatingCapacity', value)}
                placeholder="Seats"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInputGroup}>
              <Text style={styles.inputLabel}>Fuel Type</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.fuelType}
                onChangeText={(value) => updateField('fuelType', value)}
                placeholder="Fuel"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Legal Documents</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <FileText size={20} color="#6B7280" />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>Insurance Number</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.insuranceNumber}
                onChangeText={(value) => updateField('insuranceNumber', value)}
                placeholder="Enter insurance number"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <FileText size={20} color="#6B7280" />
            </View>
            <View style={styles.inputContent}>
              <Text style={styles.inputLabel}>RC Number</Text>
              <TextInput
                style={styles.input}
                value={vehicleData.rcNumber}
                onChangeText={(value) => updateField('rcNumber', value)}
                placeholder="Enter RC number"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButtonLarge} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Vehicle Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  vehicleImageSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  vehicleImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  addPhotoButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  addPhotoText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
  form: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 8,
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfInputGroup: {
    flex: 0.48,
  },
  saveButtonLarge: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});