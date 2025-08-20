import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Switch
} from 'react-native';
import {
  ArrowLeft,
  Bell,
  Moon,
  Globe,
  Shield,
  Volume2,
  Smartphone,
  MapPin,
  Trash2,
  ChevronRight
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    notifications: true,
    locationTracking: true,
    soundEnabled: true,
    darkMode: false,
    autoAcceptRides: false,
    offlineMode: false,
  });

  const toggleSetting = (setting) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => Alert.alert('Account Deleted', 'Your account has been scheduled for deletion.')
        }
      ]
    );
  };

  const settingsSections = [
    {
      title: 'Notifications',
      items: [
        {
          icon: <Bell size={20} color="#3B82F6" />,
          title: 'Push Notifications',
          subtitle: 'Receive ride requests and updates',
          type: 'toggle',
          value: settings.notifications,
          onPress: () => toggleSetting('notifications'),
        },
        {
          icon: <Volume2 size={20} color="#10B981" />,
          title: 'Sound Alerts',
          subtitle: 'Play sound for new ride requests',
          type: 'toggle',
          value: settings.soundEnabled,
          onPress: () => toggleSetting('soundEnabled'),
        },
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: <MapPin size={20} color="#F59E0B" />,
          title: 'Location Tracking',
          subtitle: 'Allow app to track your location',
          type: 'toggle',
          value: settings.locationTracking,
          onPress: () => toggleSetting('locationTracking'),
        },
        {
          icon: <Shield size={20} color="#8B5CF6" />,
          title: 'Privacy Settings',
          subtitle: 'Manage data sharing preferences',
          type: 'navigate',
          onPress: () => Alert.alert('Privacy', 'Privacy settings coming soon.'),
        },
      ]
    },
    {
      title: 'App Preferences',
      items: [
        {
          icon: <Moon size={20} color="#6B7280" />,
          title: 'Dark Mode',
          subtitle: 'Use dark theme',
          type: 'toggle',
          value: settings.darkMode,
          onPress: () => toggleSetting('darkMode'),
        },
        {
          icon: <Globe size={20} color="#3B82F6" />,
          title: 'Language',
          subtitle: 'English',
          type: 'navigate',
          onPress: () => Alert.alert('Language', 'Language selection coming soon.'),
        },
        {
          icon: <Smartphone size={20} color="#10B981" />,
          title: 'Auto Accept Rides',
          subtitle: 'Automatically accept ride requests',
          type: 'toggle',
          value: settings.autoAcceptRides,
          onPress: () => toggleSetting('autoAcceptRides'),
        },
      ]
    },
    {
      title: 'Account',
      items: [
        {
          icon: <Trash2 size={20} color="#DC2626" />,
          title: 'Delete Account',
          subtitle: 'Permanently delete your account',
          type: 'danger',
          onPress: handleDeleteAccount,
        },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1 && styles.lastItem
                  ]}
                  onPress={item.onPress}
                >
                  <View style={styles.settingIcon}>
                    {item.icon}
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={[
                      styles.settingTitle,
                      item.type === 'danger' && styles.dangerText
                    ]}>
                      {item.title}
                    </Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  <View style={styles.settingAction}>
                    {item.type === 'toggle' ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onPress}
                        trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                        thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                      />
                    ) : item.type !== 'danger' ? (
                      <ChevronRight size={20} color="#9CA3AF" />
                    ) : null}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Driver App v1.0.0</Text>
          <Text style={styles.appInfoSubtext}>Built with ❤️ for drivers</Text>
        </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  dangerText: {
    color: '#DC2626',
  },
  settingAction: {
    marginLeft: 12,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  appInfoText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  appInfoSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});