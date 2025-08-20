import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  IndianRupee,
  TrendingUp,
  Calendar,
  Clock,
  Car,
  Star,
  CreditCard,
} from 'lucide-react-native';

export default function EarningsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const earningsData = {
    today: {
      total: '₹2,450',
      rides: 5,
      hours: '8h 30m',
      avg: '₹490',
    },
    week: {
      total: '₹14,200',
      rides: 28,
      hours: '52h 15m',
      avg: '₹507',
    },
    month: {
      total: '₹48,500',
      rides: 95,
      hours: '180h 45m',
      avg: '₹511',
    },
  };

  const subscriptionPlans = [
    {
      name: 'Daily Plan',
      price: '₹100',
      duration: '1 Day',
      savings: null,
      popular: false,
    },
    {
      name: '15-Day Plan',
      price: '₹1,200',
      duration: '15 Days',
      savings: '₹300',
      popular: true,
    },
    {
      name: 'Monthly Plan',
      price: '₹2,500',
      duration: '30 Days',
      savings: '₹500',
      popular: false,
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'earning',
      description: 'Tirupati Local Temples',
      amount: '+₹2,850',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'subscription',
      description: 'Daily Plan Renewal',
      amount: '-₹100',
      time: 'This morning',
    },
    {
      id: 3,
      type: 'earning',
      description: 'Airport → Tirumala',
      amount: '+₹4,000',
      time: 'Yesterday',
    },
  ];

  const currentData = earningsData[selectedPeriod];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Earnings</Text>
        <Text style={styles.subtitle}>Track your income and expenses</Text>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {['today', 'week', 'month'].map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.activePeriodButton,
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.activePeriodButtonText,
              ]}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Earnings Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <IndianRupee color="#10B981" size={24} />
          <Text style={styles.summaryTitle}>Total Earnings</Text>
        </View>
        <Text style={styles.summaryAmount}>{currentData.total}</Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Car color="#6B7280" size={16} />
            <Text style={styles.statText}>{currentData.rides} rides</Text>
          </View>
          <View style={styles.statItem}>
            <Clock color="#6B7280" size={16} />
            <Text style={styles.statText}>{currentData.hours}</Text>
          </View>
          <View style={styles.statItem}>
            <TrendingUp color="#6B7280" size={16} />
            <Text style={styles.statText}>{currentData.avg}/ride</Text>
          </View>
        </View>
      </View>

      {/* Subscription Plans */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription Plans</Text>
        <View style={styles.plansContainer}>
          {subscriptionPlans.map((plan, index) => (
            <TouchableOpacity key={index} style={[
              styles.planCard,
              plan.popular && styles.popularPlan,
            ]}>
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
              <Text style={styles.planDuration}>{plan.duration}</Text>
              {plan.savings && (
                <Text style={styles.planSavings}>Save {plan.savings}</Text>
              )}
              <TouchableOpacity style={[
                styles.subscribeButton,
                plan.popular && styles.popularSubscribeButton,
              ]}>
                <Text style={[
                  styles.subscribeButtonText,
                  plan.popular && styles.popularSubscribeButtonText,
                ]}>
                  Subscribe
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {recentTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionIcon}>
              {transaction.type === 'earning' ? (
                <TrendingUp color="#10B981" size={20} />
              ) : (
                <CreditCard color="#EF4444" size={20} />
              )}
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionDescription}>
                {transaction.description}
              </Text>
              <Text style={styles.transactionTime}>{transaction.time}</Text>
            </View>
            <Text style={[
              styles.transactionAmount,
              {
                color: transaction.type === 'earning' ? '#10B981' : '#EF4444',
              },
            ]}>
              {transaction.amount}
            </Text>
          </View>
        ))}
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
  periodSelector: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activePeriodButton: {
    backgroundColor: '#FFFFFF',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activePeriodButtonText: {
    color: '#1F2937',
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
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
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
  plansContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  planCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  popularPlan: {
    borderWidth: 2,
    borderColor: '#10B981',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  planName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  planDuration: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  planSavings: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginBottom: 12,
  },
  subscribeButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  popularSubscribeButton: {
    backgroundColor: '#10B981',
  },
  subscribeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  popularSubscribeButtonText: {
    color: '#FFFFFF',
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
});