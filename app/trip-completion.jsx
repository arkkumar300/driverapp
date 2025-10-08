import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { ArrowLeft, CircleCheck as CheckCircle, Star, IndianRupee, Clock, MapPin } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function TripCompletionScreen() {
  const { rideId } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Mock trip data - in real app, fetch based on rideId
  const tripData = {
    id: rideId,
    customer: 'Priya Sharma',
    route: 'Tirupati Railway Station → Tirumala Temple',
    amount: '₹2,850',
    distance: '12.5 km',
    duration: '35 mins',
    startTime: '2:30 PM',
    endTime: '3:05 PM',
  };

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleCompleteTrip = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please rate your customer before completing the trip.');
      return;
    }

    Alert.alert(
      'Trip Completed',
      'Trip completed successfully! Payment has been processed.',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)/rides')
        }
      ]
    );
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleRating(index + 1)}
        style={styles.starButton}
      >
        <Star
          color={index < rating ? '#F59E0B' : '#D1D5DB'}
          fill={index < rating ? '#F59E0B' : 'transparent'}
          size={32}
        />
      </TouchableOpacity>
    ));
  };

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
        <Text style={styles.headerTitle}>Complete Trip</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Success Icon */}
      <View style={styles.successSection}>
        <View style={styles.successIcon}>
          <CheckCircle color="#10B981" size={64} />
        </View>
        <Text style={styles.successTitle}>Trip Completed!</Text>
        <Text style={styles.successSubtitle}>
          You've successfully completed the trip
        </Text>
      </View>

      {/* Trip Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Trip Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Customer</Text>
          <Text style={styles.summaryValue}>{tripData.customer}</Text>
        </View>

        <View style={styles.summaryRow}>
          <MapPin color="#6B7280" size={16} />
          <Text style={styles.summaryRoute}>{tripData.route}</Text>
        </View>

        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <MapPin color="#6B7280" size={16} />
            <Text style={styles.statValue}>{tripData.distance}</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statItem}>
            <Clock color="#6B7280" size={16} />
            <Text style={styles.statValue}>{tripData.duration}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          <View style={styles.statItem}>
            <IndianRupee color="#10B981" size={16} />
            <Text style={[styles.statValue, { color: '#10B981' }]}>{tripData.amount}</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
        </View>

        <View style={styles.timeSection}>
          <View style={styles.timeItem}>
            <Text style={styles.timeLabel}>Started</Text>
            <Text style={styles.timeValue}>{tripData.startTime}</Text>
          </View>
          <View style={styles.timeItem}>
            <Text style={styles.timeLabel}>Completed</Text>
            <Text style={styles.timeValue}>{tripData.endTime}</Text>
          </View>
        </View>
      </View>

      {/* Rating Section */}
      <View style={styles.ratingCard}>
        <Text style={styles.ratingTitle}>Rate your customer</Text>
        <Text style={styles.ratingSubtitle}>
          How was your experience with {tripData.customer}?
        </Text>

        <View style={styles.starsContainer}>
          {renderStars()}
        </View>

        <TextInput
          style={styles.feedbackInput}
          placeholder="Add feedback (optional)"
          placeholderTextColor="#9CA3AF"
          value={feedback}
          onChangeText={setFeedback}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      {/* Complete Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            rating === 0 && styles.disabledButton
          ]}
          onPress={handleCompleteTrip}
          disabled={rating === 0}
        >
          <CheckCircle color="#FFFFFF" size={20} />
          <Text style={styles.completeButtonText}>Complete Trip</Text>
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
  successSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  summaryCard: {
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  summaryRoute: {
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginVertical: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  timeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeItem: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  ratingCard: {
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
  ratingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  ratingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  starButton: {
    padding: 4,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 80,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});