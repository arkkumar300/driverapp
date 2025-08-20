import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Phone, MapPin, Clock, IndianRupee, Navigation, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';

export default function RidesScreen() {
  const [activeTab, setActiveTab] = useState('incoming');

  const incomingRides = [
    {
      id: 1,
      type: 'Package',
      name: 'Tirupati Local Temples',
      code: 'TIR001',
      pickup: 'Tirupati Railway Station',
      customer: 'Priya Sharma',
      phone: '+91 98765 43210',
      vehicle: '4-seater',
      amount: '₹2,850',
      distance: '2.3 km',
      eta: '8 mins',
    },
    {
      id: 2,
      type: 'Airport',
      name: 'Airport → Tirumala Drop',
      pickup: 'Chennai Airport Terminal 1',
      customer: 'Ramesh Kumar',
      phone: '+91 87654 32109',
      vehicle: '7-seater',
      amount: '₹4,000',
      distance: '5.1 km',
      eta: '15 mins',
    },
  ];

  const ongoingRides = [
    {
      id: 3,
      type: 'Package',
      name: 'Kalahasti Circuit',
      code: 'KAL002',
      pickup: 'Kalahasti Temple',
      customer: 'Sita Devi',
      phone: '+91 76543 21098',
      vehicle: '6-seater',
      amount: '₹3,400',
      status: 'in_progress',
      timeElapsed: '1h 30m',
    },
  ];

  const handleAcceptRide = (ride) => {
    Alert.alert(
      'Accept Ride',
      `Accept ${ride.name} for ${ride.amount}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Accept', onPress: () => console.log('Ride accepted') },
      ]
    );
  };

  const handleCallCustomer = (phone) => {
    Alert.alert(
      'Call Customer',
      `Call ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling customer') },
      ]
    );
  };

  const renderRideCard = (ride, isIncoming = true) => (
    <View key={ride.id} style={styles.rideCard}>
      <View style={styles.rideHeader}>
        <View>
          <Text style={styles.rideName}>{ride.name}</Text>
          {ride.code && <Text style={styles.rideCode}>{ride.code}</Text>}
          <Text style={styles.rideType}>{ride.type} • {ride.vehicle}</Text>
        </View>
        <Text style={styles.rideAmount}>{ride.amount}</Text>
      </View>

      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{ride.customer}</Text>
        <TouchableOpacity 
          style={styles.phoneButton}
          onPress={() => handleCallCustomer(ride.phone)}
        >
          <Phone color="#FFFFFF" size={16} />
          <Text style={styles.phoneButtonText}>Call</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rideDetails}>
        <View style={styles.detailRow}>
          <MapPin color="#6B7280" size={16} />
          <Text style={styles.detailText}>{ride.pickup}</Text>
        </View>
        {isIncoming && (
          <View style={styles.detailRow}>
            <Clock color="#6B7280" size={16} />
            <Text style={styles.detailText}>
              {ride.distance} • ETA {ride.eta}
            </Text>
          </View>
        )}
        {!isIncoming && (
          <View style={styles.detailRow}>
            <Clock color="#6B7280" size={16} />
            <Text style={styles.detailText}>
              In progress • {ride.timeElapsed}
            </Text>
          </View>
        )}
      </View>

      {isIncoming ? (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.rejectButton}>
            <XCircle color="#EF4444" size={20} />
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.acceptButton}
            onPress={() => handleAcceptRide(ride)}
          >
            <CheckCircle color="#FFFFFF" size={20} />
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.navigateButton}>
            <Navigation color="#FFFFFF" size={20} />
            <Text style={styles.navigateButtonText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.completeButton}>
            <CheckCircle color="#FFFFFF" size={20} />
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'incoming' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('incoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'incoming' && styles.activeTabText,
            ]}
          >
            Incoming Rides
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'ongoing' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('ongoing')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'ongoing' && styles.activeTabText,
            ]}
          >
            Ongoing Rides
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === 'incoming' && (
          <View style={styles.ridesContainer}>
            {incomingRides.length === 0 ? (
              <View style={styles.emptyState}>
                <Clock color="#6B7280" size={48} />
                <Text style={styles.emptyStateText}>
                  No incoming rides
                </Text>
                <Text style={styles.emptyStateSubtext}>
                  Make sure you're online to receive requests
                </Text>
              </View>
            ) : (
              incomingRides.map((ride) => renderRideCard(ride, true))
            )}
          </View>
        )}

        {activeTab === 'ongoing' && (
          <View style={styles.ridesContainer}>
            {ongoingRides.length === 0 ? (
              <View style={styles.emptyState}>
                <Car color="#6B7280" size={48} />
                <Text style={styles.emptyStateText}>
                  No ongoing rides
                </Text>
                <Text style={styles.emptyStateSubtext}>
                  Accept a ride to start earning
                </Text>
              </View>
            ) : (
              ongoingRides.map((ride) => renderRideCard(ride, false))
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1F2937',
  },
  scrollView: {
    flex: 1,
  },
  ridesContainer: {
    paddingHorizontal: 20,
  },
  rideCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
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
    marginBottom: 12,
  },
  rideName: {
    fontSize: 16,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 6,
  },
  phoneButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  rideDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  rejectButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  navigateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  completeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});