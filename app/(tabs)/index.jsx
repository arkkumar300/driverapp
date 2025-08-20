import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import {
  Power,
  MapPin,
  Star,
  IndianRupee,
  Calendar,
  Car,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState("daily");

  const handleToggleOnline = () => {
    if (!activeSubscription) {
      Alert.alert(
        "Subscription Required",
        "Please activate a subscription plan to go online",
        [{ text: "OK" }]
      );
      return;
    }
    setIsOnline(!isOnline);
  };

  // Dynamic Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  const subscriptionPlans = {
    daily: { name: "Daily Plan", price: "₹100", expires: "Today 11:59 PM" },
    weekly: { name: "15-Day Plan", price: "₹1,200", expires: "15 days left" },
    monthly: { name: "Monthly Plan", price: "₹2,500", expires: "28 days left" },
  };

  const recentRides = [
    {
      id: 1,
      type: "Package",
      name: "Tirupati Local Temples",
      code: "TIR001",
      pickup: "Tirupati Railway Station",
      amount: "₹2,850",
      status: "completed",
      rating: 5,
    },
    {
      id: 2,
      type: "Airport",
      name: "Airport ↔ Tirupati",
      pickup: "Chennai Airport",
      amount: "₹1,500",
      status: "completed",
      rating: 4,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#3B82F6", "#2563EB"]}
        style={styles.header}
      >
        <Text style={styles.greeting}>{getGreeting()}, Ravi 👋</Text>
        <Text style={styles.subGreeting}>Let’s get you on the road today!</Text>
      </LinearGradient>

      {/* Online/Offline Toggle */}
      <View style={styles.card}>
        <View style={styles.statusHeader}>
          <View style={styles.statusInfo}>
            <Power color={isOnline ? "#10B981" : "#6B7280"} size={26} />
            <Text
              style={[
                styles.statusText,
                { color: isOnline ? "#10B981" : "#6B7280" },
              ]}
            >
              {isOnline ? "You are Online" : "You are Offline"}
            </Text>
          </View>
          <Switch
            value={isOnline}
            onValueChange={handleToggleOnline}
            trackColor={{ false: "#E5E7EB", true: "#10B981" }}
            thumbColor="#fff"
          />
        </View>
        {isOnline && (
          <Text style={styles.statusSubtext}>
            ✅ You are ready to receive rides
          </Text>
        )}
      </View>

      {/* Subscription */}
      <View style={styles.card}>
        <View style={styles.subscriptionHeader}>
          <Calendar color="#2563EB" size={22} />
          <Text style={styles.subscriptionTitle}>Your Plan</Text>
        </View>
        <Text style={styles.planName}>
          {subscriptionPlans[activeSubscription].name}
        </Text>
        <Text style={styles.planExpiry}>
          Expires: {subscriptionPlans[activeSubscription].expires}
        </Text>
        <TouchableOpacity
          style={styles.renewButton}
          onPress={() => router.push("/subscription")}
        >
          <Text style={styles.renewButtonText}>Renew / Change Plan</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <IndianRupee color="#10B981" size={20} />
          <Text style={styles.statValue}>₹2,450</Text>
          <Text style={styles.statLabel}>Today’s Earnings</Text>
        </View>
        <View style={styles.statCard}>
          <Car color="#3B82F6" size={20} />
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Rides Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Star color="#F59E0B" size={20} />
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Driver Rating</Text>
        </View>
      </View>

      {/* Recent Rides */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Rides</Text>
        {recentRides.map((ride) => (
          <View key={ride.id} style={styles.rideCard}>
            <View style={styles.rideHeader}>
              <View>
                <Text style={styles.rideName}>{ride.name}</Text>
                <Text style={styles.rideCode}>{ride.code}</Text>
              </View>
              <Text style={styles.rideAmount}>{ride.amount}</Text>
            </View>
            <View style={styles.rideDetails}>
              <MapPin color="#6B7280" size={16} />
              <Text style={styles.ridePickup}>{ride.pickup}</Text>
            </View>
            <View style={styles.rideFooter}>
              <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    color={i < ride.rating ? "#F59E0B" : "#E5E7EB"}
                    fill={i < ride.rating ? "#F59E0B" : "transparent"}
                  />
                ))}
              </View>
              <Text style={styles.statusCompleted}>✔ Completed</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },

  // Header
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: { fontSize: 26, fontWeight: "700", color: "#fff", marginBottom: 6 },
  subGreeting: { fontSize: 16, color: "#E0E7FF" },

  // Card Base
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 16,
    padding: 18,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  // Status
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  statusText: { fontSize: 18, fontWeight: "600" },
  statusSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#10B981",
    fontWeight: "500",
  },

  // Subscription
  subscriptionHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  subscriptionTitle: { fontSize: 18, fontWeight: "600", color: "#1F2937" },
  planName: { fontSize: 16, fontWeight: "600", color: "#2563EB", marginTop: 8 },
  planExpiry: { fontSize: 14, color: "#6B7280", marginBottom: 14 },
  renewButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  renewButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },

  // Stats
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: { fontSize: 20, fontWeight: "700", marginTop: 6, color: "#111827" },
  statLabel: { fontSize: 12, color: "#6B7280", textAlign: "center" },

  // Section
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12 },

  // Ride Card
  rideCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rideName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  rideCode: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  rideAmount: { fontSize: 18, fontWeight: "700", color: "#10B981" },
  rideDetails: { flexDirection: "row", alignItems: "center", gap: 6 },
  ridePickup: { fontSize: 14, color: "#6B7280" },
  rideFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  ratingContainer: { flexDirection: "row", gap: 2 },
  statusCompleted: { fontSize: 12, color: "#10B981", fontWeight: "600" },
});
