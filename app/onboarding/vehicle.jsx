import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Car, FileText, Camera, CircleCheck as CheckCircle, Upload, ArrowRight } from 'lucide-react-native';

export default function VehicleOnboardingScreen() {
  const [vehicleData, setVehicleData] = useState({
    name: '',
    vehicleNo: '',
    vehicleName: '',
    capacity: '',
    mobileNo: '',
    area: '',
  });

  const [documents, setDocuments] = useState({
    license: null,
    insurance: null,
    registration: null,
    permit: null,
  });

  const vehicleCategories = [
    { id: '4', name: '4-seater', examples: 'Dzire, Etios, Amaze, Baleno' },
    { id: '6', name: '6-seater', examples: 'Ertiga' },
    { id: '7', name: '7-seater', examples: 'Innova Crysta, Xylo' },
    { id: '8', name: '8-seater', examples: 'Tavera' },
    { id: '12', name: '12-seater', examples: 'Tempo Traveller' },
  ];

  const handleInputChange = (field, value) => {
    setVehicleData({ ...vehicleData, [field]: value });
  };

  const handleDocumentUpload = (docType) => {
    Alert.alert(
      'Upload Document',
      `Upload ${docType}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Camera', 
          onPress: () => {
            setDocuments({ ...documents, [docType]: 'uploaded' });
            Alert.alert('Success', 'Document uploaded successfully!');
          }
        },
        { 
          text: 'Gallery', 
          onPress: () => {
            setDocuments({ ...documents, [docType]: 'uploaded' });
            Alert.alert('Success', 'Document uploaded successfully!');
          }
        },
      ]
    );
  };

  const handleSubmit = () => {
    const requiredFields = ['name', 'vehicleNo', 'vehicleName', 'capacity', 'mobileNo', 'area'];
    const missingFields = requiredFields.filter(field => !vehicleData[field]);

    if (missingFields.length > 0) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const requiredDocs = ['license', 'insurance', 'registration'];
    const missingDocs = requiredDocs.filter(doc => !documents[doc]);

    if (missingDocs.length > 0) {
      Alert.alert('Error', 'Please upload all required documents');
      return;
    }

    Alert.alert(
      'Registration Fee',
      'Registration fee of ₹100 will be charged. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Pay & Complete', 
          onPress: () => {
            Alert.alert('Success', 'Vehicle registered successfully!');
            router.replace('/(tabs)');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Vehicle Registration</Text>
        <Text style={styles.subtitle}>
          Complete your vehicle details to start driving
        </Text>
      </View>

      {/* Vehicle Details Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Details</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Driver Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={vehicleData.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Vehicle Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="AP 28 AB 1234"
            value={vehicleData.vehicleNo}
            onChangeText={(value) => handleInputChange('vehicleNo', value)}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Vehicle Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Maruti Dzire, Toyota Innova, etc."
            value={vehicleData.vehicleName}
            onChangeText={(value) => handleInputChange('vehicleName', value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Vehicle Capacity *</Text>
          <View style={styles.capacityContainer}>
            {vehicleCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.capacityButton,
                  vehicleData.capacity === category.id && styles.activeCapacityButton,
                ]}
                onPress={() => handleInputChange('capacity', category.id)}
              >
                <Text style={[
                  styles.capacityButtonText,
                  vehicleData.capacity === category.id && styles.activeCapacityButtonText,
                ]}>
                  {category.name}
                </Text>
                <Text style={styles.capacityExamples}>{category.examples}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mobile Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            value={vehicleData.mobileNo}
            onChangeText={(value) => handleInputChange('mobileNo', value)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Operating Area *</Text>
          <TextInput
            style={styles.input}
            placeholder="Tirupati, Tirumala, Airport, etc."
            value={vehicleData.area}
            onChangeText={(value) => handleInputChange('area', value)}
          />
        </View>
      </View>

      {/* Document Upload */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Required Documents</Text>
        
        {[
          { key: 'license', name: 'Driving License', required: true },
          { key: 'insurance', name: 'Vehicle Insurance', required: true },
          { key: 'registration', name: 'Vehicle Registration', required: true },
          { key: 'permit', name: 'Commercial Permit', required: false },
        ].map((doc) => (
          <TouchableOpacity
            key={doc.key}
            style={styles.documentCard}
            onPress={() => handleDocumentUpload(doc.key)}
          >
            <View style={styles.documentInfo}>
              <FileText color="#6B7280" size={20} />
              <View>
                <Text style={styles.documentName}>
                  {doc.name} {doc.required && '*'}
                </Text>
                <Text style={styles.documentHint}>
                  Tap to upload from camera or gallery
                </Text>
              </View>
            </View>
            <View style={styles.documentStatus}>
              {documents[doc.key] ? (
                <CheckCircle color="#10B981" size={24} />
              ) : (
                <Upload color="#6B7280" size={24} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Registration Fee */}
      <View style={styles.feeCard}>
        <Text style={styles.feeTitle}>Registration Fee</Text>
        <Text style={styles.feeAmount}>₹100</Text>
        <Text style={styles.feeDescription}>
          One-time registration fee for platform access
        </Text>
      </View>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Pay ₹100 & Complete Registration</Text>
          <ArrowRight color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  capacityContainer: {
    gap: 8,
  },
  capacityButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeCapacityButton: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  capacityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  activeCapacityButtonText: {
    color: '#10B981',
  },
  capacityExamples: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  documentHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  documentStatus: {
    padding: 4,
  },
  feeCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  feeAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 8,
  },
  feeDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  submitContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  submitButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});