import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  MapPin,
  Clock,
  IndianRupee,
  Users,
  Star,
  ArrowRight,
} from 'lucide-react-native';

export default function PackagesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const packageCategories = [
    { id: 'all', name: 'All Packages' },
    { id: 'temple', name: 'Temple Tours' },
    { id: 'airport', name: 'Airport' },
    { id: 'multiday', name: 'Multi-day' },
  ];

  const packages = [
    {
      id: 'TIR001',
      name: 'Tirupati Local Temples',
      category: 'temple',
      duration: '8-10 hours',
      inclusions: ['Padmavati Temple', 'ISKCON Temple', 'Regional Science Centre'],
      pricing: {
        '4-seater': 2850,
        '6-seater': 3400,
        '7-seater': 4000,
        '8-seater': 4600,
        '12-seater': 5600,
      },
      popular: true,
    },
    {
      id: 'AIR001',
      name: 'Airport ↔ Tirupati',
      category: 'airport',
      duration: '2-3 hours',
      inclusions: ['Round trip', 'Waiting time included'],
      pricing: {
        '4-seater': 1500,
        '7-seater': 2000,
      },
    },
    {
      id: 'AIR002',
      name: 'Airport → Tirumala (Drop)',
      category: 'airport',
      duration: '3-4 hours',
      inclusions: ['One way drop', 'Hill route'],
      pricing: {
        '4-seater': 2500,
        '7-seater': 4000,
      },
    },
    {
      id: 'MUL001',
      name: 'Golden Temple Circuit',
      category: 'multiday',
      duration: '3 days',
      inclusions: ['Tirumala', 'Kalahasthi', 'Kanipakam', 'Golden Temple', 'Kanchipuram'],
      pricing: {
        '4-seater': 14000,
        '7-seater': 21000,
        '12-seater': 28000,
      },
    },
  ];

  const vehicleTypes = [
    { key: '4-seater', name: '4-seater', examples: 'Dzire, Etios, Amaze, Baleno' },
    { key: '6-seater', name: '6-seater', examples: 'Ertiga' },
    { key: '7-seater', name: '7-seater', examples: 'Innova Crysta, Xylo' },
    { key: '8-seater', name: '8-seater', examples: 'Tavera' },
    { key: '12-seater', name: '12-seater', examples: 'Tempo Traveller' },
  ];

  const filteredPackages = selectedCategory === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  const renderPackageCard = (pkg) => (
    <View style={styles.packageCard} key={pkg.id}>
      <View style={styles.packageHeader}>
        <View>
          <View style={styles.packageTitleRow}>
            <Text style={styles.packageName}>{pkg.name}</Text>
            {pkg.popular && (
              <View style={styles.popularBadge}>
                <Star color="#FFFFFF" size={12} fill="#FFFFFF" />
                <Text style={styles.popularText}>Popular</Text>
              </View>
            )}
          </View>
          <Text style={styles.packageCode}>{pkg.id}</Text>
        </View>
      </View>

      <View style={styles.packageDetails}>
        <View style={styles.detailRow}>
          <Clock color="#6B7280" size={16} />
          <Text style={styles.detailText}>{pkg.duration}</Text>
        </View>
        <View style={styles.inclusionsContainer}>
          <Text style={styles.inclusionsTitle}>Inclusions:</Text>
          {pkg.inclusions.map((item, index) => (
            <Text key={index} style={styles.inclusionItem}>
              • {item}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.pricingSection}>
        <Text style={styles.pricingTitle}>App-Recommended Rates</Text>
        <View style={styles.pricingGrid}>
          {Object.entries(pkg.pricing).map(([vehicleType, price]) => (
            <View key={vehicleType} style={styles.priceItem}>
              <Text style={styles.vehicleType}>{vehicleType}</Text>
              <Text style={styles.price}>₹{price.toLocaleString()}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Package Rates</Text>
        <Text style={styles.subtitle}>Fixed pricing for all packages</Text>
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        {packageCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.activeCategoryButtonText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Vehicle Types Reference */}
      <View style={styles.vehicleReference}>
        <Text style={styles.referenceTitle}>Vehicle Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.vehicleTypesContainer}>
            {vehicleTypes.map((vehicle) => (
              <View key={vehicle.key} style={styles.vehicleTypeCard}>
                <Text style={styles.vehicleTypeName}>{vehicle.name}</Text>
                <Text style={styles.vehicleExamples}>{vehicle.examples}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Packages List */}
      <ScrollView style={styles.packagesContainer}>
        {filteredPackages.map(renderPackageCard)}
      </ScrollView>
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
  categoryScroll: {
    marginBottom: 20,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeCategoryButton: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeCategoryButtonText: {
    color: '#FFFFFF',
  },
  vehicleReference: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  vehicleTypesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  vehicleTypeCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  vehicleTypeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  vehicleExamples: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 14,
  },
  packagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  packageCard: {
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
  packageHeader: {
    marginBottom: 12,
  },
  packageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  packageName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  packageCode: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  packageDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  inclusionsContainer: {
    marginTop: 8,
  },
  inclusionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  inclusionItem: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
    lineHeight: 16,
  },
  pricingSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  pricingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  pricingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  priceItem: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  vehicleType: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
});