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
import { ArrowLeft, Crown, Check, Calendar, CreditCard, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SubscriptionScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const currentSubscription = {
    plan: 'Monthly Premium',
    status: 'Active',
    expiryDate: 'Dec 31, 2024',
    autoRenewal: true,
  };

  const plans = [
    {
      id: 'weekly',
      name: 'Weekly',
      price: '₹199',
      period: 'per week',
      features: ['Unlimited rides', 'Basic support', '7 days access'],
      popular: false,
    },
    {
      id: 'monthly',
      name: 'Monthly',
      price: '₹699',
      period: 'per month',
      features: ['Unlimited rides', 'Priority support', 'Analytics dashboard', 'Monthly bonus'],
      popular: true,
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: '₹1899',
      period: 'per 3 months',
      features: ['Unlimited rides', 'Premium support', 'Advanced analytics', 'Quarterly bonus', 'Priority bookings'],
      popular: false,
    },
  ];

  const handleUpgrade = () => {
    Alert.alert(
      'Upgrade Subscription',
      `Upgrade to ${plans.find(p => p.id === selectedPlan)?.name} plan?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Proceed', onPress: () => Alert.alert('Success', 'Subscription upgraded successfully!') }
      ]
    );
  };

  const toggleAutoRenewal = () => {
    Alert.alert('Auto Renewal', 'Auto renewal settings updated.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Subscription</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Subscription */}
        <View style={styles.currentSubscription}>
          <View style={styles.subscriptionHeader}>
            <Crown size={24} color="#F59E0B" />
            <Text style={styles.currentPlanTitle}>Current Plan</Text>
          </View>
          <Text style={styles.currentPlanName}>{currentSubscription.plan}</Text>
          <Text style={styles.currentPlanStatus}>
            Status: <Text style={styles.activeStatus}>{currentSubscription.status}</Text>
          </Text>
          <View style={styles.expiryInfo}>
            <Calendar size={16} color="#6B7280" />
            <Text style={styles.expiryText}>Expires on {currentSubscription.expiryDate}</Text>
          </View>
        </View>

        {/* Auto Renewal Toggle */}
        <View style={styles.autoRenewalCard}>
          <View style={styles.autoRenewalContent}>
            <Text style={styles.autoRenewalTitle}>Auto Renewal</Text>
            <Text style={styles.autoRenewalSubtitle}>Automatically renew your subscription</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, currentSubscription.autoRenewal && styles.toggleActive]}
            onPress={toggleAutoRenewal}
          >
            <View style={[styles.toggleThumb, currentSubscription.autoRenewal && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>

        {/* Available Plans */}
        <Text style={styles.sectionTitle}>Available Plans</Text>

        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.selectedPlan,
              plan.popular && styles.popularPlan
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Star size={12} color="#FFFFFF" />
                <Text style={styles.popularText}>Most Popular</Text>
              </View>
            )}

            <View style={styles.planHeader}>
              <View style={styles.planInfo}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
              </View>
              <View style={[
                styles.radioButton,
                selectedPlan === plan.id && styles.radioButtonSelected
              ]}>
                {selectedPlan === plan.id && <Check size={16} color="#FFFFFF" />}
              </View>
            </View>

            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color="#10B981" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        {/* Payment Method */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.paymentMethod}>
            <CreditCard size={20} color="#3B82F6" />
            <Text style={styles.paymentText}>•••• •••• •••• 1234</Text>
            <Text style={styles.changePaymentText}>Change</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
          <Text style={styles.upgradeButtonText}>
            {selectedPlan === 'monthly' ? 'Continue Current Plan' : 'Upgrade Plan'}
          </Text>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  currentSubscription: {
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
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPlanTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  currentPlanName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  currentPlanStatus: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  activeStatus: {
    color: '#10B981',
    fontWeight: '600',
  },
  expiryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  autoRenewalCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  autoRenewalContent: {
    flex: 1,
  },
  autoRenewalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  autoRenewalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D1D5DB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedPlan: {
    borderColor: '#3B82F6',
  },
  popularPlan: {
    borderColor: '#F59E0B',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 20,
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  planPeriod: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  featuresContainer: {
    marginTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  paymentSection: {
    marginTop: 20,
  },
  paymentMethod: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
    flex: 1,
  },
  changePaymentText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  upgradeButton: {
    backgroundColor: '#3B82F6',
    marginHorizontal: 16,
    marginVertical: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});