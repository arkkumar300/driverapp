import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch, Alert, Dimensions } from "react-native";
import { Power, MapPin, Star, IndianRupee, Calendar, Car } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import ApiService from "../../hooks/ApiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from 'dayjs';

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

const subscriptionPlans = {
  daily: { name: "Daily Plan", price: "₹100", expires: "Today 11:59 PM" },
  weekly: { name: "15-Day Plan", price: "₹1,200", expires: "15 days left" },
  monthly: { name: "Monthly Plan", price: "₹2,500", expires: "28 days left" },
};

const { fontScale, width } = Dimensions.get('screen');
const guidelineBaseWidth = 375;

const scale = size => (width / guidelineBaseWidth) * size;

export default function HomeScreen() {
    const [isOnline, setIsOnline] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState("");
  const [driverData, setDriverData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [planDetails, setPlanDetails] = useState(subscriptionPlans);
  const [totalRides, setTotalRides] = useState("");
  const [todayRides, setTodayRides] = useState("");
  const [ratting, setRatting] = useState("");
  const [page, setPage] = useState(1);
  const [plane, setPlane] = useState(null);
  const [raidList, setRaidList] = useState(recentRides);
  const [activeSubscription, setActiveSubscription] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);
  const date = dayjs().format('YYYY-MM-DD');

  useFocusEffect(useCallback(() => {
    const getDriverData = async () => {
      const userDataString = await AsyncStorage.getItem("user") || "";
      if (userDataString) {
        const userData = JSON.parse(userDataString);

        setDriverData(userData || "");
        setPhoneNumber(userData.phoneNumber || "");
      } else {
        console.log("No user data found in AsyncStorage.");
      } try {
        setLoading(true)
        const payload = {
          countryCode: "+91",
          phoneNumber: phoneNumber,
        }
        const driveJWT = await AsyncStorage.getItem("token") || "";
        const response = await ApiService.get('/v1/users/driver/stats',
          {
            headers: {
              Authorization: `Bearer ${driveJWT}`,
              'Content-Type': 'application/json' // Optional, but good to specify
            }
          }
        );
        if (!response.data.success) {
          throw new Error(response.message || 'Failed to send OTP');
        }

        if (response?.data?.success) {
          const dashboardData = response.data
          setTodayRides(dashboardData.data.todayRides);
          setRatting(dashboardData.data.rating);

          setLoading(false)
        } else {
          console.warn('⚠️ driver  response is invalid');
        }
        // You can now use response.Verification or response.userId
      } catch (error) {
        console.error('❌ Error getting details:', error.message || error);
      }

    }
    getDriverData();
  }, [])
  )

  useFocusEffect(useCallback(() => {
    const getDriverRides = async () => {
      const userDataString = await AsyncStorage.getItem("user") || "";
      if (userDataString) {
        const userData = JSON.parse(userDataString);

        setDriverData(userData || "");
        setPhoneNumber(userData?.phoneNumber || "");
      } else {
        console.log("No user data found in AsyncStorage.");
      }
      try {
        setLoading(true)
        const driveJWT = await AsyncStorage.getItem("token") || "";
        const response = await ApiService.get(`/v1/rides/?page=${page}&limit=5&driver=${driverData?._id}&date=${date}`,
          {
            headers: {
              Authorization: `Bearer ${driveJWT}`,
              'Content-Type': 'application/json' // Optional, but good to specify
            }
          } 
        );
        if (!response.data.success) {
          throw new Error(response.message || 'Failed to send OTP');
        }
        if (response?.data?.success) {
          const ridesData = response?.data
          setRaidList(ridesData?.data?.rides);
          setTotalRides(ridesData?.data?.total);

          setLoading(false)
        } else {
          console.warn('⚠️ driver  response is invalid');
        }
        // You can now use response.Verification or response.userId
      } catch (error) {
        console.error('❌ Error getting details:', error.message || error);
      }

    }
    getDriverRides();
  }, [driverData])
  )


  const handleToggleOnline = async () => {
    if (!activeSubscription) {
      Alert.alert(
        "Subscription Required",
        "Please activate a subscription plan to go online",
        [{ text: "OK" }]
      );
      return;
    }
    const newStatus = !isOnline; // ✅ Compute the next value
    setIsOnline(newStatus);      // ✅ Update state
    setLoading(true); try {
      setLoading(true)
      const payload = {
        isAvailable: newStatus,
      }
      const userJWT = await AsyncStorage.getItem("token") || "";

      const response = await ApiService.patch('v1/users/availability',
        payload,
        {
          headers: {
            Authorization: `Bearer ${userJWT}`,
            'Content-Type': 'application/json' // Optional, but good to specify
          }
        }
      );

      if (!response.data.success) {
        throw new Error(response.message || 'Failed to send OTP');
      }
      const driverUpdate = response?.data?.user;
      if (response.data.success) {
        await AsyncStorage.setItem("user", JSON.stringify(driverUpdate));
        setDriverData(driverUpdate)
        setPlane(driverUpdate?.subscriptionExpiry)
        Alert.alert(`${driverUpdate?.fullName} is now ${newStatus ? 'online' : 'offline'}`);
      } else {
        console.warn('⚠️ OTP not included in response or invalid');
      }
      // You can now use response.Verification or response.userId
    } catch (error) {
      console.error('❌ Error sending OTP:', error.message || error);
    }

  };

  // Dynamic Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#3B82F6", "#2563EB"]}
        style={styles.header}
      >
        <Text style={styles.greeting}>{getGreeting()}, {driverData?.fullName} 👋</Text>
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
          {planDetails[activeSubscription].name}
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
          <Car color="#3B82F6" size={20} />
          <Text style={styles.statValue}> {totalRides || 0}</Text>
          <Text style={styles.statLabel}>Rides Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Star color="#F59E0B" size={20} />
          <Text style={styles.statValue}>{ratting || 5}</Text>
          <Text style={styles.statLabel}>Driver Rating</Text>
        </View>
      </View>

      {/* Recent Rides */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Rides</Text>
        {
          raidList.length > 0 ? (
            <>
              {raidList.map((ride) => {
                return(
                <View key={ride._id} style={styles.rideCard}>
                  <View style={styles.rideHeader}>
                    <View>
                      <Text style={styles.rideName}>{ride?.destination}</Text>
                      <Text style={styles.rideCode}>{ride?._id}</Text>
                    </View>
                    <Text style={styles.rideAmount}>{ride?.price}</Text>
                  </View>
                  <View style={styles.rideDetails}>
                    <MapPin color="#6B7280" size={16} />
                    <Text style={styles.ridePickup}>{ride?.destination}</Text>
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
              )})}
            </>
          ) : (
            <>
              <Text style={{ justifyContent: "center",top:50, textAlign: 'center', fontSize: scale(22)*fontScale, fontWeight: 'bold' }}> NO RIDES YET</Text>
              <Image
                source={require('../../assets/images/emptyRide.png')}
                style={{ width: width, height: 200, justifyContent: "center", alignSelf: 'center' }}
                resizeMode="contain"
              />
            </>
          )
        }
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
  greeting: { fontSize: scale(12)*fontScale, fontWeight: "700", color: "#fff", marginBottom: 6 },
  subGreeting: { fontSize: scale(8)*fontScale, color: "#E0E7FF" },

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
  statusText: { fontSize: scale(8)*fontScale, fontWeight: "600" },
  statusSubtext: {
    marginTop: 8,
    fontSize: scale(8)*fontScale,
    color: "#10B981",
    fontWeight: "500",
  },

  // Subscription
  subscriptionHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  subscriptionTitle: { fontSize: scale(8)*fontScale, fontWeight: "600", color: "#1F2937" },
  planName: { fontSize: scale(6)*fontScale, fontWeight: "600", color: "#2563EB", marginTop: 8 },
  planExpiry: { fontSize: scale(6)*fontScale, color: "#6B7280", marginBottom: 14 },
  renewButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  renewButtonText: { color: "#fff", fontWeight: "600", fontSize: scale(8)*fontScale },

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
  statValue: { fontSize: scale(10)*fontScale, fontWeight: "700", marginTop: 6, color: "#111827" },
  statLabel: { fontSize: scale(6)*fontScale, color: "#6B7280", textAlign: "center" },

  // Section
  section: { marginHorizontal: 20, marginTop: 24, overflow: 'scroll', height: 300, marginBottom: 10 },
  sectionTitle: { fontSize: scale(10)*fontScale, fontWeight: "700", marginBottom: 12 },

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
  rideName: { fontSize: scale(8)*fontScale, fontWeight: "600", color: "#111827" },
  rideCode: { fontSize:scale(7)*fontScale, color: "#6B7280", marginTop: 2 },
  rideAmount: { fontSize: scale(8)*fontScale, fontWeight: "700", color: "#10B981" },
  rideDetails: { flexDirection: "row", alignItems: "center", gap: 6 },
  ridePickup: { fontSize: scale(8)*fontScale, color: "#6B7280" },
  rideFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  ratingContainer: { flexDirection: "row", gap: 2 },
  statusCompleted: { fontSize: scale(8)*fontScale, color: "#10B981", fontWeight: "600" },
});
