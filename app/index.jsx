import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexScreen() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 0); // Wait for next tick — ensures navigation is mounted

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {

    const rrr=async ()=>{
    if (!isReady) return;
const isAuthenticated=await AsyncStorage.getItem("isLogin") || 'false';

if (isAuthenticated==='true') {
      router.replace('/(tabs)');
    } else {
      router.replace('/auth/login');
    }
  }
  rrr();
  }, [isReady]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={"green"} />
    </View>
  );
}
