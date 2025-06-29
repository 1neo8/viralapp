import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DisclaimerOverlay = ({ theme, visible, onDismiss }) => {
  const [showWatermark, setShowWatermark] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    loadWatermarkSetting();
  }, []);

  useEffect(() => {
    if (visible) {
      showDisclaimer();
    } else {
      hideDisclaimer();
    }
  }, [visible]);

  const loadWatermarkSetting = async () => {
    try {
      const watermarkSetting = await AsyncStorage.getItem('showWatermark');
      if (watermarkSetting !== null) {
        setShowWatermark(JSON.parse(watermarkSetting));
      }
    } catch (error) {
      console.log('Error loading watermark setting:', error);
    }
  };

  const showDisclaimer = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideDisclaimer = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDismiss = () => {
    hideDisclaimer();
    setTimeout(() => {
      onDismiss && onDismiss();
    }, 200);
  };

  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.primaryColor }]}>
            ⚠️ DISCLAIMER
          </Text>
        </View>
        
        <View style={styles.content}>
          <Text style={[styles.mainText, { color: theme.textColor }]}>
            FOR ENTERTAINMENT ONLY
          </Text>
          
          <Text style={[styles.subText, { color: theme.textColor }]}>
            This is a simulated livestream experience. All viewers, comments, and interactions are fake and generated for entertainment purposes only.
          </Text>
          
          <Text style={[styles.warningText, { color: theme.secondaryColor }]}>
            Do not use this content to mislead others about your actual social media engagement.
          </Text>
          
          {showWatermark && (
            <View style={styles.watermarkContainer}>
              <Text style={[styles.watermarkText, { color: theme.primaryColor }]}>
                🎭 VIRALSTAGE - FAKE STREAM
              </Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          style={[styles.dismissButton, { backgroundColor: theme.primaryColor }]}
          onPress={handleDismiss}
        >
          <Text style={[styles.dismissButtonText, { color: theme.backgroundColor }]}>
            I Understand
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    paddingHorizontal: 20,
  },
  container: {
    borderRadius: 15,
    padding: 20,
    maxWidth: 350,
    width: '100%',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    marginBottom: 20,
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
    opacity: 0.9,
  },
  warningText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 16,
    marginBottom: 15,
  },
  watermarkContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  watermarkText: {
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  dismissButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  dismissButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DisclaimerOverlay;

