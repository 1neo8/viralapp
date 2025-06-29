import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BILLING_TIERS } from '../config/constants';

const BillingScreen = () => {
  const [selectedTier, setSelectedTier] = useState('CREATOR');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (tierKey) => {
    setIsProcessing(true);
    
    
    // This is a placeholder for the actual payment processing
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Payment Processing',
        `This is a demo app. In a real implementation, you would be charged ${BILLING_TIERS[tierKey].price} for the ${BILLING_TIERS[tierKey].name} plan.`,
        [
          {
            text: 'OK',
            onPress: () => {
              
              
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const restorePurchases = () => {
    
    Alert.alert(
      'Restore Purchases',
      'Purchase restoration functionality will be implemented with actual payment integration.',
      [{ text: 'OK' }]
    );
  };

  const TierCard = ({ tierKey, tier, isPopular = false }) => {
    const isSelected = selectedTier === tierKey;
    
    return (
      <View style={[
        styles.tierCard,
        isSelected && styles.selectedTierCard,
        isPopular && styles.popularTierCard
      ]}>
        {isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularBadgeText}>🔥 MOST POPULAR</Text>
          </View>
        )}
        
        <View style={styles.tierHeader}>
          <Text style={[styles.tierName, isSelected && styles.selectedTierName]}>
            {tier.name}
          </Text>
          <Text style={[styles.tierPrice, isSelected && styles.selectedTierPrice]}>
            {tier.price}
          </Text>
        </View>
        
        <View style={styles.tierFeatures}>
          {tier.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={[styles.featureText, isSelected && styles.selectedFeatureText]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity
          style={[
            styles.selectButton,
            isSelected && styles.selectedButton,
            isPopular && styles.popularButton
          ]}
          onPress={() => setSelectedTier(tierKey)}
          disabled={isProcessing}
        >
          <Text style={[
            styles.selectButtonText,
            isSelected && styles.selectedButtonText
          ]}>
            {isSelected ? 'Selected' : 'Select Plan'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>💳 Subscription Plans</Text>
          <Text style={styles.subtitle}>
            Unlock premium features for the ultimate fake livestream experience
          </Text>
        </View>

        <View style={styles.tiersContainer}>
          <TierCard 
            tierKey="STARTER" 
            tier={BILLING_TIERS.STARTER} 
          />
          
          <TierCard 
            tierKey="CREATOR" 
            tier={BILLING_TIERS.CREATOR} 
            isPopular={true}
          />
          
          <TierCard 
            tierKey="ELITE" 
            tier={BILLING_TIERS.ELITE} 
          />
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.subscribeButton, isProcessing && styles.processingButton]}
            onPress={() => handleSubscribe(selectedTier)}
            disabled={isProcessing}
          >
            <Text style={styles.subscribeButtonText}>
              {isProcessing ? '⏳ Processing...' : `🚀 Subscribe to ${BILLING_TIERS[selectedTier].name}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.restoreButton}
            onPress={restorePurchases}
            disabled={isProcessing}
          >
            <Text style={styles.restoreButtonText}>🔄 Restore Purchases</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerTitle}>📋 Important Notes:</Text>
          <Text style={styles.disclaimerText}>
            • This is a demo app for entertainment purposes only{'\n'}
            • No real payments will be processed{'\n'}
            • All features are simulated for demonstration{'\n'}
            • Subscriptions auto-renew until cancelled{'\n'}
            • Cancel anytime in your device settings
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Secure payments powered by Stripe (Demo)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 22,
  },
  tiersContainer: {
    padding: 20,
    gap: 20,
  },
  tierCard: {
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#333',
    position: 'relative',
  },
  selectedTierCard: {
    borderColor: '#FF6B6B',
    backgroundColor: '#1A0A0A',
  },
  popularTierCard: {
    borderColor: '#FFD700',
    backgroundColor: '#1A1A0A',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    right: 20,
    backgroundColor: '#FFD700',
    paddingVertical: 6,
    borderRadius: 15,
    alignItems: 'center',
  },
  popularBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  tierHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  tierName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  selectedTierName: {
    color: '#FF6B6B',
  },
  tierPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#AAAAAA',
  },
  selectedTierPrice: {
    color: '#FF6B6B',
  },
  tierFeatures: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 12,
    width: 20,
  },
  featureText: {
    fontSize: 14,
    color: '#CCCCCC',
    flex: 1,
  },
  selectedFeatureText: {
    color: '#FFFFFF',
  },
  selectButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
  },
  selectedButton: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  popularButton: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AAAAAA',
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
  actionContainer: {
    padding: 20,
    gap: 15,
  },
  subscribeButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
  },
  processingButton: {
    backgroundColor: '#666',
  },
  subscribeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  restoreButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
  },
  restoreButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AAAAAA',
  },
  disclaimerContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#111',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#AAAAAA',
    lineHeight: 18,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default BillingScreen;

