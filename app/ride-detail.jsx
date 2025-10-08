import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { ArrowLeft, Phone, MapPin, Navigation, CircleCheck as CheckCircle, Clock, User, Car } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function RideDetailScreen() {
  const { rideId } = useLocalSearchParams();
  const [rideStatus, setRideStatus] = useState('accepted'); // accepted, en_route, arrived, in_progress, completing
  const [timer, setTimer] = useState(0);

  // Mock ride data - in real app, fetch based on rideId
  const rideData = {
    id: rideId,
    type: 'Package',
    name: 'Tirupati Local Temples',
    code: 'TIR001',
    pickup: 'Tirupati Railway Station',
    destination: 'Tirumala Temple',
    customer: 'Priya Sharma',
    phone: '+91 98765 43210',
    vehicle: '4-seater',
    amount: '₹2,850',
    distance: '2.3 km',
    duration: '8 mins',
    pickupCoords: { latitude: 13.6288, longitude: 79.4192 },
    destinationCoords: { latitude: 13.6837, longitude: 79.3472 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStatusChange = (newStatus) => {
    setRideStatus(newStatus);
    if (newStatus === 'completing') {
      router.push(`/trip-completion?rideId=${rideId}`);
    }
  };

  const handleCallCustomer = () => {
    Alert.alert(
      'Call Customer',
      `Call ${rideData.customer}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling customer') },
      ]
    );
  };

  const handleNavigation = () => {
    Alert.alert(
      'Navigation',
      'Open in Google Maps?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Navigate', onPress: () => console.log('Opening navigation') },
      ]
    );
  };

  const getStatusInfo = () => {
    switch (rideStatus) {
      case 'accepted':
        return {
          title: 'Ride Accepted',
          subtitle: 'Navigate to pickup location',
          action: 'Start Trip',
          nextStatus: 'en_route',
          color: '#10B981'
        };
      case 'en_route':
        return {
          title: 'En Route to Pickup',
          subtitle: 'Driving to pickup location',
          action: 'Arrived at Pickup',
          nextStatus: 'arrived',
          color: '#3B82F6'
        };
      case 'arrived':
        return {
          title: 'Arrived at Pickup',
          subtitle: 'Waiting for passenger',
          action: 'Start Trip',
          nextStatus: 'in_progress',
          color: '#F59E0B'
        };
      case 'in_progress':
        return {
          title: 'Trip in Progress',
          subtitle: 'Driving to destination',
          action: 'Complete Trip',
          nextStatus: 'completing',
          color: '#10B981'
        };
      default:
        return {
          title: 'Unknown Status',
          subtitle: '',
          action: 'Continue',
          nextStatus: 'accepted',
          color: '#6B7280'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#1F2937" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Details</Text>
        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCallCustomer}
        >
          <Phone color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>

      {/* Status Card */}
      <View style={[styles.statusCard, { borderLeftColor: statusInfo.color }]}>
        <View style={styles.statusHeader}>
          <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
          <View>
            <Text style={styles.statusTitle}>{statusInfo.title}</Text>
            <Text style={styles.statusSubtitle}>{statusInfo.subtitle}</Text>
          </View>
        </View>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
      </View>

      {/* Ride Info */}
      <View style={styles.rideCard}>
        <View style={styles.rideHeader}>
          <View>
            <Text style={styles.rideName}>{rideData.name}</Text>
            <Text style={styles.rideCode}>{rideData.code}</Text>
            <Text style={styles.rideType}>{rideData.type} • {rideData.vehicle}</Text>
          </View>
          <Text style={styles.rideAmount}>{rideData.amount}</Text>
        </View>

        <View style={styles.customerInfo}>
          <View style={styles.customerDetails}>
            <User color="#6B7280" size={20} />
            <Text style={styles.customerName}>{rideData.customer}</Text>
          </View>
          <Text style={styles.customerPhone}>{rideData.phone}</Text>
        </View>

        {/* Location Details */}
        <View style={styles.locationContainer}>
          <View style={styles.locationItem}>
            <View style={styles.locationDot} />
            <View style={styles.locationText}>
              <Text style={styles.locationLabel}>Pickup</Text>
              <Text style={styles.locationAddress}>{rideData.pickup}</Text>
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.locationItem}>
            <View style={[styles.locationDot, styles.destinationDot]} />
            <View style={styles.locationText}>
              <Text style={styles.locationLabel}>Destination</Text>
              <Text style={styles.locationAddress}>{rideData.destination}</Text>
            </View>
          </View>
        </View>

        {/* Trip Details */}
        <View style={styles.tripDetails}>
          <View style={styles.tripDetailItem}>
            <MapPin color="#6B7280" size={16} />
            <Text style={styles.tripDetailText}>{rideData.distance}</Text>
          </View>
          <View style={styles.tripDetailItem}>
            <Clock color="#6B7280" size={16} />
            <Text style={styles.tripDetailText}>{rideData.duration}</Text>
          </View>
          <View style={styles.tripDetailItem}>
            <Car color="#6B7280" size={16} />
            <Text style={styles.tripDetailText}>{rideData.vehicle}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={handleNavigation}
        >
          <Navigation color="#FFFFFF" size={20} />
          <Text style={styles.navigationButtonText}>Navigate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: statusInfo.color }]}
          onPress={() => handleStatusChange(statusInfo.nextStatus)}
        >
          <CheckCircle color="#FFFFFF" size={20} />
          <Text style={styles.statusButtonText}>{statusInfo.action}</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency Actions */}
      <View style={styles.emergencyActions}>
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyButtonText}>Report Issue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyButtonText}>Cancel Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  callButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  timer: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'right',
    marginTop: -40,
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rideName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  rideCode: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  rideType: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  rideAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#10B981',
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 16,
  },
  customerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  customerPhone: {
    fontSize: 14,
    color: '#6B7280',
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    marginTop: 6,
    marginRight: 12,
  },
  destinationDot: {
    backgroundColor: '#EF4444',
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: '#D1D5DB',
    marginLeft: 4,
    marginVertical: 4,
  },
  locationText: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tripDetailText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  navigationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  navigationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  statusButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emergencyActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 40,
  },
  emergencyButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  emergencyButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
});