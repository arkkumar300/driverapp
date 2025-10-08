import React, { useState, useEffect, useRef } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Platform,Animated,Dimensions} from 'react-native';
import { router } from 'expo-router';
import { Phone, ArrowRight } from 'lucide-react-native';
import ApiService from '../../hooks/ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Application from 'expo-application';

const { width } = Dimensions.get('window');

// Device.osName — Platform name (e.g., Android, iOS)
// Device.modelName — Device model (e.g., iPhone 13, Pixel 6)
// Device.osVersion — OS version
// Device.deviceName — (may return null on some Android devices)
// Device.deviceType — Phone, tablet, etc.
// Device.osBuildId — Unique OS build
// Device.deviceYearClass — Approximate release year
// Device.manufacturer — Apple, Google, etc.
// Device.totalMemory — RAM
// Device.getUptimeAsync() — How long the device has been running

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [deviceId, setdeviceId] = useState('');
  const [platform, setPlatform] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const inputRefs = useRef([]);

  // Animations
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const removeIntenalData=async ()=>{
      await AsyncStorage.clear();
    }
removeIntenalData()
  }, [])


useEffect(() => {
  const getDeviceInfo = async () => {
    const deviceId =
      Platform.OS === 'android'
        ? Application.getAndroidId()
        : await Application.getIosIdForVendorAsync(); // iOS equivalent

    const platform = Device.osName;
    setdeviceId(deviceId);
    setPlatform(Platform.OS);
    console.log('Device ID:', deviceId);
    console.log('Platform:', platform);

    // You can include it in your payload if needed
    // e.g., when sending login info
  };

  getDeviceInfo();
}, []);


  useEffect(() => {
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

  const rotateInterpolate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleSendOtp = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
console.log("rrr::")
    try {
        const payload = {
          countryCode: countryCode,
          phoneNumber: phoneNumber,
          role: "driver",
          deviceInfo: {
            deviceToken: deviceId,
            deviceType: platform
          }
        };
        console.log("rrr:::",payload)
        const response = await ApiService.post('/auth/login', payload);
  
        if (response.data.success) {
          setShowOtpInput(true);
          Alert.alert('Success', `OTP sent to ${phoneNumber}`);
          setOtp(['', '', '', '', '', '']);
          inputRefs.current[0]?.focus();
        } else {
          throw new Error(response.data.message || 'Failed to send OTP');
        }     
        //  return;
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // 👉 Move forward if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // 👈 Move backward if value is deleted and not the first input
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // ✅ Check if all digits are filled
    if (newOtp.every((digit) => digit !== '')) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleVerifyOtp = async (otpValue) => {
    try {
      setLoading(true);
      const payload = {
        countryCode: countryCode.trim(), // make sure it's "+91"
        phoneNumber: phoneNumber.trim(), // ensure it's a valid 10-digit number
        OTP: otpValue.trim(), // or whatever variable you're using
      };
      const response = await ApiService.post('/auth/verify-phone', payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = response.data;

      if (!data.success) throw new Error(data.message || 'OTP verification failed');
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("isLogin", "true");
      router.replace({
        pathname: '/(tabs)',
      });
    } catch (err) {
      Alert.alert('Error', err.message || 'Invalid OTP');
      console.log('Errorrr', err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();

      const response = await ApiService.post('auth/send-otp', {
        countryCode: '+91',
        phoneNumber,
      });

      if (response.data.success) {
        Alert.alert('Success', 'OTP resent successfully');
      } else {
        throw new Error(response.data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Could not resend OTP');
    }
  };

  // Splash Screen
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
        </View>
      </Animated.View>
    );
  }

  // Login Screen
  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Driver App</Text>
          <Text style={styles.subtitle}>
            {showOtpInput
              ? 'Enter the OTP sent to your phone'
              : 'Enter your phone number to continue'}
          </Text>
        </View>

        <View style={styles.form}>
          {!showOtpInput ? (
            <>
              <View style={styles.inputContainer}>
                {/* Country Code Input */}
                <TextInput
                  style={styles.countryCodeInput}
                  value={countryCode}
                  onChangeText={setCountryCode}
                  placeholder="+91"
                  keyboardType="phone-pad"
                  maxLength={4}
                />

                {/* Phone Number Input */}
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  placeholderTextColor={'#f6f6f6'}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.disabledButton]}
                onPress={handleSendOtp}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? 'Sending...' : 'Send OTP'}
                </Text>
                <ArrowRight color="#FFF" size={20} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={styles.otpInput}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
                        inputRefs.current[index - 1]?.focus();
                      }
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.disabledButton]}
                onPress={() => handleVerifyOtp(otp.join(''))}
                disabled={loading}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </Text>
                <ArrowRight color="#FFF" size={20} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

// Add your own styles below this line
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
  },
  logoScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  animatedLogoContainer: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  appName: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 8,
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 4,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#1F2937',
  },
  countryCodeInput: {
    width: 60,
    color: '#FFF',
    fontSize: 16,
    paddingVertical: 10,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#FFF',
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    width: 45,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#FFF',
    backgroundColor: '#1F2937',
  },
  resendButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
  resendButtonText: {
    color: '#10B981',
    fontWeight: 'bold',
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   // Animated logo screen styles
//   logoScreen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#10B981',
//   },
//   animatedLogoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   animatedLogo: {
//     width: 120,
//     height: 120,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   appName: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textShadowColor: 'rgba(0, 0, 0, 0.3)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 4,
//     marginBottom: 8,
//   },
//   tagline: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     textAlign: 'center',
//   },
//   // Login screen styles
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logoContainer: {
//     width: 80,
//     height: 80,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#1F2937',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#6B7280',
//     textAlign: 'center',
//     lineHeight: 24,
//   },
//   form: {
//     marginBottom: 40,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderRadius: 12,
//     marginBottom: 20,
//     gap: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#1F2937',
//   },
//   otpInput: {
//     flex: 1,
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#1F2937',
//     letterSpacing: 8,
//   },
//   primaryButton: {
//     backgroundColor: '#10B981',
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 12,
//     marginBottom: 12,
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   primaryButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   resendButton: {
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   resendButtonText: {
//     color: '#3B82F6',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   features: {
//     marginTop: 20,
//   },
//   featuresTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1F2937',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     gap: 12,
//   },
//   featureBullet: {
//     width: 8,
//     height: 8,
//     backgroundColor: '#10B981',
//     borderRadius: 4,
//   },
//   featureText: {
//     fontSize: 14,
//     color: '#6B7280',
//     flex: 1,
//   },
//   logoImage: {
//     width: 150,
//     height: 150,
//   },
// });
