import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Calendar, IndianRupee, CircleCheck as CheckCircle, Star, Clock, TrendingUp } from 'lucide-react-native';

export default function SubscriptionPlansScreen() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'daily',
      name: 'Daily Plan',
      price: 100,
      duration: '1 Day',
      features: [
        'Receive ride requests',
        'Access to package rates',
        'Customer contact feature',
        'Basic support',
      ],
      savings: null,
      popular: false,
      bestFor: 'Occasional drivers',
    },
    {
      id: 'weekly',
      name: '15-Day Plan',
      price: 1200,
      duration: '15 Days',
      features: [
        'All Daily Plan features',
        'Priority ride requests',
        'Advanced analytics',
        'Premium support',
        'Earnings insights',
      ],
      savings: 300,
      popular: true,
      bestFor: 'Regular drivers',
    },
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 2500,
      duration: '30 Days',
      features: [
        'All 15-Day Plan features',
        'Highest priority requests',
        'Detailed trip reports',
        'Premium 24/7 support',
        'Performance bonuses',
        'Marketing support',
      ],
      savings: 500,
      popular: false,
      bestFor: 'Professional drivers',
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a plan to continue');
      return;
    }

    Alert.alert(
      'Subscribe to Plan',
      `Subscribe to ${selectedPlan.name} for ₹${selectedPlan.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Pay Now', 
          onPress: () => {
            Alert.alert('Payment Successful', 'Plan activated successfully!');
          }
        },
      ]
    );
  };

  const renderPlanCard = (plan) => (
    <TouchableOpacity
      key={plan.id}
      style={[
        styles.planCard,
        selectedPlan?.id === plan.id && styles.selectedPlanCard,
        plan.popular && styles.popularPlan,
      ]}
      onPress={() => handleSelectPlan(plan)}
    >
      {plan.popular && (
        <View style={styles.popularBadge}>
          <Star color="#FFFFFF" size={12} fill="#FFFFFF" />
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      
      <View style={styles.planHeader}>
        <Text style={styles.planName}>{plan.name}</Text>
        <Text style={styles.planBestFor}>{plan.bestFor}</Text>
      </View>

      <View style={styles.planPricing}>
        <Text style={styles.planPrice}>₹{plan.price}</Text>
        <Text style={styles.planDuration}>/{plan.duration}</Text>
        {plan.savings && (
          <Text style={styles.planSavings}>
            Save ₹{plan.savings}
          </Text>
        )}
      </View>

      <View style={styles.planFeatures}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <CheckCircle color="#10B981" size={16} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {selectedPlan?.id === plan.id && (
        <View style={styles.selectedIndicator}>
          <CheckCircle color="#10B981" size={24} />
          <Text style={styles.selectedText}>Selected</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.subtitle}>
          Select a subscription plan to start receiving rides
        </Text>
      </View>

      {/* Benefits */}
      <View style={styles.benefitsCard}>
        <Text style={styles.benefitsTitle}>Platform Benefits</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <TrendingUp color="#10B981" size={20} />
            <Text style={styles.benefitText}>
              Fixed package rates - no haggling
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Clock color="#3B82F6" size={20} />
            <Text style={styles.benefitText}>
              Instant customer contact
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <IndianRupee color="#F59E0B" size={20} />
            <Text style={styles.benefitText}>
              Transparent pricing system
            </Text>
          </View>
        </View>
      </View>

      {/* Plans */}
      <ScrollView style={styles.plansContainer}>
        {plans.map(renderPlanCard)}
      </ScrollView>

      {/* Subscribe Button */}
      <View style={styles.subscribeContainer}>
        <TouchableOpacity
          style={[
            styles.subscribeButton,
            !selectedPlan && styles.disabledButton,
          ]}
          onPress={handleSubscribe}
          disabled={!selectedPlan}
        >
          <Text style={styles.subscribeButtonText}>
            {selectedPlan 
              ? `Subscribe for ₹${selectedPlan.price}` 
              : 'Select a Plan to Continue'
            }
          </Text>
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
  benefitsCard: {
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
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  plansContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlanCard: {
    borderColor: '#10B981',
  },
  popularPlan: {
    borderColor: '#F59E0B',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  planHeader: {
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  planBestFor: {
    fontSize: 14,
    color: '#6B7280',
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
  },
  planDuration: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  planSavings: {
    backgroundColor: '#DCFCE7',
    color: '#166534',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 12,
  },
  planFeatures: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    gap: 8,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  subscribeContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  subscribeButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});