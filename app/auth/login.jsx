import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Phone, ArrowRight, Zap } from 'lucide-react-native';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Animation values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start logo animation
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoRotation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(logoRotation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // After 3 seconds, transition to login
    const timer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowLogin(true);
        Animated.timing(screenOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendOtp = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowOtpInput(true);
      Alert.alert('OTP Sent', `OTP sent to ${phoneNumber}`);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) {
      Alert.alert('Error', 'Please enter the complete OTP');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const rotateInterpolate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Show animated logo screen first
  if (!showLogin) {
    return (
      <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
        <View style={styles.logoScreen}>
          <Animated.View
            style={[
              styles.animatedLogoContainer,
              {
                opacity: logoOpacity,
                transform: [
                  { scale: logoScale },
                  { scale: pulseAnimation },
                  { rotate: rotateInterpolate },
                ],
              },
            ]}
          >
            <Animated.Image
              source={require('../../assets/images/finallogo4.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.Text style={[styles.appName, { opacity: logoOpacity }]}>
            Driver App
          </Animated.Text>
          <Animated.Text style={[styles.tagline, { opacity: logoOpacity }]}>
            Your journey starts here
          </Animated.Text>

{/*           <View style={styles.animatedLogo}> */}
{/*             <Zap color="#FFFFFF" size={60} /> */}
{/*           </View> */}
        </View>
      </Animated.View>
    );
  }

  // Show login screen after animation
  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <View style={styles.content}>
        {/* Logo/Header */}
        <View style={styles.header}>
{/*           <View style={styles.logoContainer}> */}
{/*             <Zap color="#10B981" size={48} /> */}
{/*           </View> */}

          <Text style={styles.title}>Driver App</Text>
          <Text style={styles.subtitle}>
            {showOtpInput
              ? 'Enter the OTP sent to your phone'
              : 'Enter your phone number to continue'}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {!showOtpInput ? (
            <>
              <View style={styles.inputContainer}>
                <Phone color="#6B7280" size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  loading && styles.disabledButton,
                ]}
                onPress={handleSendOtp}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </Text>
                <ArrowRight color="#FFFFFF" size={20} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.otpInput}
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={4}
                  textAlign="center"
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  loading && styles.disabledButton,
                ]}
                onPress={handleVerifyOtp}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </Text>
                <ArrowRight color="#FFFFFF" size={20} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleSendOtp}
              >
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Features */}
        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Why drive with us?</Text>
          <View style={styles.featureItem}>
            <View style={styles.featureBullet} />
            <Text style={styles.featureText}>
              Flexible subscription plans starting ₹100/day
            </Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureBullet} />
            <Text style={styles.featureText}>
              Direct customer contact for better earnings
            </Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureBullet} />
            <Text style={styles.featureText}>
              Fixed package rates with no haggling
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  // Animated logo screen styles
  logoScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10B981',
  },
  animatedLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedLogo: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  // Login screen styles
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  otpInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    letterSpacing: 8,
  },
  primaryButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  resendButtonText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  features: {
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureBullet: {
    width: 8,
    height: 8,
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  logoImage: {
    width: 150,
    height: 150,
  },
});
