import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import { ArrowLeft, Upload, FileText, Shield, Calendar, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DocumentsScreen() {
  const router = useRouter();

  const documents = [
    {
      id: 'license',
      name: 'Driving License',
      status: 'verified',
      expiryDate: 'Mar 15, 2027',
      icon: <Shield size={20} color="#10B981" />,
      required: true,
    },
    {
      id: 'rc',
      name: 'Vehicle RC',
      status: 'verified',
      expiryDate: 'Jan 20, 2025',
      icon: <FileText size={20} color="#10B981" />,
      required: true,
    },
    {
      id: 'insurance',
      name: 'Vehicle Insurance',
      status: 'pending',
      expiryDate: 'Dec 10, 2024',
      icon: <Shield size={20} color="#F59E0B" />,
      required: true,
    },
    {
      id: 'permit',
      name: 'Commercial Permit',
      status: 'expired',
      expiryDate: 'Nov 30, 2024',
      icon: <FileText size={20} color="#DC2626" />,
      required: true,
    },
    {
      id: 'pollution',
      name: 'Pollution Certificate',
      status: 'verified',
      expiryDate: 'Aug 15, 2025',
      icon: <CheckCircle size={20} color="#10B981" />,
      required: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'expired':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle size={16} color="#10B981" />;
      case 'pending':
        return <AlertTriangle size={16} color="#F59E0B" />;
      case 'expired':
        return <AlertTriangle size={16} color="#DC2626" />;
      default:
        return <FileText size={16} color="#6B7280" />;
    }
  };

  const handleUploadDocument = (documentType) => {
    Alert.alert(
      'Upload Document',
      'Choose upload method',
      [
        { text: 'Camera', onPress: () => Alert.alert('Camera', 'Opening camera...') },
        { text: 'Gallery', onPress: () => Alert.alert('Gallery', 'Opening gallery...') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleViewDocument = (documentName) => {
    Alert.alert('View Document', `Opening ${documentName}...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Documents</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Upload size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Document Status Overview */}
        <View style={styles.statusOverview}>
          <Text style={styles.overviewTitle}>Document Status</Text>
          <View style={styles.statusStats}>
            <View style={styles.statusItem}>
              <Text style={styles.statusCount}>3</Text>
              <Text style={styles.statusLabel}>Verified</Text>
            </View>
            <View style={styles.statusDivider} />
            <View style={styles.statusItem}>
              <Text style={[styles.statusCount, { color: '#F59E0B' }]}>1</Text>
              <Text style={styles.statusLabel}>Pending</Text>
            </View>
            <View style={styles.statusDivider} />
            <View style={styles.statusItem}>
              <Text style={[styles.statusCount, { color: '#DC2626' }]}>1</Text>
              <Text style={styles.statusLabel}>Expired</Text>
            </View>
          </View>
        </View>

        {/* Documents List */}
        <View style={styles.documentsContainer}>
          {documents.map((doc) => (
            <View key={doc.id} style={styles.documentCard}>
              <View style={styles.documentHeader}>
                <View style={styles.documentIcon}>
                  {doc.icon}
                </View>
                <View style={styles.documentInfo}>
                  <View style={styles.documentTitleRow}>
                    <Text style={styles.documentName}>{doc.name}</Text>
                    {doc.required && <Text style={styles.requiredBadge}>Required</Text>}
                  </View>
                  <View style={styles.documentStatus}>
                    {getStatusIcon(doc.status)}
                    <Text style={[styles.statusText, { color: getStatusColor(doc.status) }]}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </Text>
                  </View>
                  <View style={styles.expiryRow}>
                    <Calendar size={14} color="#6B7280" />
                    <Text style={styles.expiryDate}>Expires: {doc.expiryDate}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.documentActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleViewDocument(doc.name)}
                >
                  <Text style={styles.actionButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.uploadActionButton]}
                  onPress={() => handleUploadDocument(doc.id)}
                >
                  <Upload size={16} color="#FFFFFF" />
                  <Text style={styles.uploadActionText}>Upload</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Upload Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Upload Guidelines</Text>
          <View style={styles.instructionsList}>
            <Text style={styles.instructionItem}>• Clear, readable photos required</Text>
            <Text style={styles.instructionItem}>• Documents should not be expired</Text>
            <Text style={styles.instructionItem}>• Supported formats: JPG, PNG, PDF</Text>
            <Text style={styles.instructionItem}>• Maximum file size: 5MB</Text>
          </View>
        </View>
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
  uploadButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  statusOverview: {
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
  overviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statusStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  statusLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  statusDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  documentsContainer: {
    margin: 16,
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  requiredBadge: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    fontSize: 10,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  documentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryDate: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#374151',
    fontWeight: '600',
  },
  uploadActionButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    flexDirection: 'row',
  },
  uploadActionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  instructionsCard: {
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
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  instructionsList: {
    marginLeft: 8,
  },
  instructionItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
});