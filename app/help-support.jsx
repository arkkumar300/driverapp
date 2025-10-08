import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,

} from 'react-native';
import { ArrowLeft, Phone, Mail, MessageCircle, CircleHelp as HelpCircle, BookOpen, Bug, Send, ExternalLink,ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HelpSupportScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const contactMethods = [
    {
      icon: <Phone size={24} color="#FFFFFF" />,
      title: 'Call Support',
      subtitle: 'Available 24/7',
      info: '+91 1800-123-456',
      color: '#10B981',
      onPress: () => Alert.alert('Calling Support', 'Redirecting to phone app...'),
    },
    {
      icon: <MessageCircle size={24} color="#FFFFFF" />,
      title: 'Live Chat',
      subtitle: 'Average response: 2 mins',
      info: 'Start chat',
      color: '#3B82F6',
      onPress: () => Alert.alert('Live Chat', 'Opening chat support...'),
    },
    {
      icon: <Mail size={24} color="#FFFFFF" />,
      title: 'Email Support',
      subtitle: 'Response within 24 hours',
      info: 'support@driverapp.com',
      color: '#8B5CF6',
      onPress: () => Alert.alert('Email Support', 'Opening email app...'),
    },
  ];

  const helpCategories = [
    'Account Issues',
    'Payment Problems',
    'App Technical Issues',
    'Vehicle Registration',
    'Document Verification',
    'Ride Related',
    'Other'
  ];

  const faqItems = [
    {
      question: 'How do I update my vehicle documents?',
      answer: 'Go to Documents section and upload new photos of your documents.',
    },
    {
      question: 'Why is my account verification pending?',
      answer: 'Document verification usually takes 24-48 hours. Contact support if it takes longer.',
    },
    {
      question: 'How do I change my subscription plan?',
      answer: 'Visit the Subscription section to upgrade or change your current plan.',
    },
    {
      question: 'What if I have issues during a ride?',
      answer: 'Use the emergency button in the ride screen or call our 24/7 support hotline.',
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim() || !selectedCategory) {
      Alert.alert('Error', 'Please select a category and enter your message.');
      return;
    }
    Alert.alert('Message Sent', 'Your message has been sent to our support team. We\'ll get back to you soon!');
    setMessage('');
    setSelectedCategory('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contact Methods */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactCard}
              onPress={method.onPress}
            >
              <View style={[styles.contactIcon, { backgroundColor: method.color }]}>
                {method.icon}
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>{method.title}</Text>
                <Text style={styles.contactSubtitle}>{method.subtitle}</Text>
                <Text style={styles.contactInfo}>{method.info}</Text>
              </View>
              <ExternalLink size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Help Form */}
        <View style={styles.helpForm}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>

          <View style={styles.categorySection}>
            <Text style={styles.inputLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {helpCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.selectedCategory
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.messageSection}>
            <Text style={styles.inputLabel}>Message</Text>
            <TextInput
              style={styles.messageInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Describe your issue or question..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.sendButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqItems.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <View style={styles.faqQuestion}>
                <HelpCircle size={16} color="#3B82F6" />
                <Text style={styles.questionText}>{item.question}</Text>
              </View>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          ))}
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinks}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <TouchableOpacity style={styles.linkItem}>
            <BookOpen size={20} color="#6B7280" />
            <Text style={styles.linkText}>User Guide</Text>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem}>
            <Bug size={20} color="#6B7280" />
            <Text style={styles.linkText}>Report a Bug</Text>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  contactSection: {
    marginTop: 16,
    marginBottom: 32,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  contactSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  contactInfo: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginTop: 4,
  },
  helpForm: {
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
  categorySection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  categoryScroll: {
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedCategory: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  messageSection: {
    marginBottom: 20,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    height: 100,
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  faqSection: {
    marginBottom: 32,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  answerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginLeft: 24,
  },
  quickLinks: {
    marginBottom: 32,
  },
  linkItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  linkText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    marginLeft: 12,
    flex: 1,
  },
});