import React, { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,Alert} from 'react-native';
import { Navigation, Phone, MapPin, Clock, IndianRupee, CircleCheck as CheckCircle, MessageCircle, Star } from 'lucide-react-native';

export default function ActiveRideScreen() {
  const [rideStatus, setRideStatus] = useState('pickup'); // pickup, ongoing, destination, payment

  const rideData = {
    id: 'RIDE001',
    package: 'Tirupati Local Temples',
    code: 'TIR001',
    customer: {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      rating: 4.5,
    },
    pickup: 'Tirupati Railway Station',
    destination: 'Multiple temple locations',
    vehicle: '4-seater',
    amount: 2850,
    startTime: '09:30 AM',
    estimatedDuration: '8-10 hours',
  };

  const handleCompleteStep = () => {
    if (rideStatus === 'pickup') {
      setRideStatus('ongoing');
      Alert.alert('Trip Started', 'Customer picked up successfully!');
    } else if (rideStatus === 'ongoing') {
      setRideStatus('destination');
      Alert.alert('Destination Reached', 'Ready to complete the trip?');
    } else if (rideStatus === 'destination') {
      setRideStatus('payment');
    }
  };

  const handlePaymentCollection = (method) => {
    Alert.alert(
      'Payment Collected',
      `₹${rideData.amount} collected via ${method}`,
      [
        { 
          text: 'Complete Trip', 
          onPress: () => {
            Alert.alert('Trip Completed', 'Thank you for your service!');
            // Navigate back to rides list
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pickup': return '#F59E0B';
      case 'ongoing': return '#3B82F6';
      case 'destination': return '#10B981';
      case 'payment': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pickup': return 'Navigate to Pickup';
      case 'ongoing': return 'Trip in Progress';
      case 'destination': return 'At Destination';
      case 'payment': return 'Collect Payment';
      default: return 'Unknown Status';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Active Ride</Text>
        <View style={styles.statusBadge}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(rideStatus) }
          ]}>
            {getStatusText(rideStatus)}
          </Text>
        </View>
      </View>

      {/* Trip Details */}
      <View style={styles.tripCard}>
        <View style={styles.tripHeader}>
          <Text style={styles.tripName}>{rideData.package}</Text>
          <Text style={styles.tripCode}>{rideData.code}</Text>
        </View>
        <View style={styles.tripDetails}>
          <View style={styles.detailRow}>
            <MapPin color="#6B7280" size={16} />
            <Text style={styles.detailText}>{rideData.pickup}</Text>
          </View>
          <View style={styles.detailRow}>
            <Clock color="#6B7280" size={16} />
            <Text style={styles.detailText}>
              Started: {rideData.startTime} • {rideData.estimatedDuration}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <IndianRupee color="#6B7280" size={16} />
            <Text style={styles.detailText}>
              {rideData.vehicle} • ₹{rideData.amount.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Customer Info */}
      <View style={styles.customerCard}>
        <View style={styles.customerHeader}>
          <Text style={styles.customerTitle}>Customer Details</Text>
        </View>
        <View style={styles.customerInfo}>
          <View style={styles.customerDetails}>
            <Text style={styles.customerName}>{rideData.customer.name}</Text>
            <View style={styles.customerRating}>
              <Star color="#F59E0B" size={16} fill="#F59E0B" />
              <Text style={styles.ratingText}>{rideData.customer.rating}</Text>
            </View>
          </View>
          <View style={styles.customerActions}>
            <TouchableOpacity style={styles.callButton}>
              <Phone color="#FFFFFF" size={20} />
              <Text style={styles.callButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <MessageCircle color="#3B82F6" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Action Based on Status */}
      {rideStatus === 'pickup' && (
        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>Navigate to Pickup Location</Text>
          <Text style={styles.actionDescription}>
            Customer is waiting at Tirupati Railway Station
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.navigateButton}>
              <Navigation color="#FFFFFF" size={20} />
              <Text style={styles.navigateButtonText}>Open Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.arrivedButton}
              onPress={handleCompleteStep}
            >
              <CheckCircle color="#FFFFFF" size={20} />
              <Text style={styles.arrivedButtonText}>I've Arrived</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {rideStatus === 'ongoing' && (
        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>Trip in Progress</Text>
          <Text style={styles.actionDescription}>
            Following the temple circuit itinerary
          </Text>
          <TouchableOpacity 
            style={styles.completeButton}
            onPress={handleCompleteStep}
          >
            <CheckCircle color="#FFFFFF" size={20} />
            <Text style={styles.completeButtonText}>Complete Trip</Text>
          </TouchableOpacity>
        </View>
      )}

      {rideStatus === 'destination' && (
        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>Trip Completed</Text>
          <Text style={styles.actionDescription}>
            Ready to collect payment from customer
          </Text>
          <TouchableOpacity 
            style={styles.paymentButton}
            onPress={handleCompleteStep}
          >
            <IndianRupee color="#FFFFFF" size={20} />
            <Text style={styles.paymentButtonText}>Collect Payment</Text>
          </TouchableOpacity>
        </View>
      )}

      {rideStatus === 'payment' && (
        <View style={styles.paymentCard}>
          <Text style={styles.paymentTitle}>Collect Payment</Text>
          <Text style={styles.paymentAmount}>₹{rideData.amount.toLocaleString()}</Text>
          <Text style={styles.paymentDescription}>
            Choose payment method used by customer
          </Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity 
              style={styles.paymentMethodButton}
              onPress={() => handlePaymentCollection('Cash')}
            >
              <Text style={styles.paymentMethodText}>Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.paymentMethodButton}
              onPress={() => handlePaymentCollection('UPI')}
            >
              <Text style={styles.paymentMethodText}>UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.paymentMethodButton}
              onPress={() => handlePaymentCollection('Card')}
            >
              <Text style={styles.paymentMethodText}>Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  statusBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tripCard: {
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
  tripHeader: {
    marginBottom: 16,
  },
  tripName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  tripCode: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  tripDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  customerCard: {
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
  customerHeader: {
    marginBottom: 16,
  },
  customerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  customerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  customerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  messageButton: {
    backgroundColor: '#EBF4FF',
    padding: 12,
    borderRadius: 8,
  },
  actionCard: {
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
  actionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  navigateButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  navigateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  arrivedButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  arrivedButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentCard: {
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
  paymentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  paymentAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 8,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  paymentMethodButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
});