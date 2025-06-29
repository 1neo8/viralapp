import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VIEWER_LEVELS } from '../config/constants';

const ViewerOverlay = ({ theme, isActive }) => {
  const [viewerCount, setViewerCount] = useState(0);
  const [viewerLevel, setViewerLevel] = useState('MEDIUM');
  const countAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadViewerLevel();
  }, []);

  useEffect(() => {
    if (isActive) {
      generateViewerCount();
      const interval = setInterval(() => {
        updateViewerCount();
      }, 3000); // Update every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isActive, viewerLevel]);

  const loadViewerLevel = async () => {
    try {
      const savedLevel = await AsyncStorage.getItem('viewerLevel');
      if (savedLevel) {
        setViewerLevel(savedLevel);
      }
    } catch (error) {
      console.log('Error loading viewer level:', error);
    }
  };

  const generateViewerCount = () => {
    const level = VIEWER_LEVELS[viewerLevel] || VIEWER_LEVELS.MEDIUM;
    const baseCount = Math.floor(Math.random() * (level.max - level.min) + level.min);
    setViewerCount(baseCount);
  };

  const updateViewerCount = () => {
    const level = VIEWER_LEVELS[viewerLevel] || VIEWER_LEVELS.MEDIUM;
    const variation = Math.floor(Math.random() * 2000) - 1000; // ±1000 variation
    const newCount = Math.max(level.min, Math.min(level.max, viewerCount + variation));
    
    // Animate the count change
    Animated.sequence([
      Animated.timing(countAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(countAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setViewerCount(newCount);
  };

  const formatViewerCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.viewerContainer, 
          theme.viewerCountStyle,
          { transform: [{ scale: countAnim }] }
        ]}
      >
        <View style={styles.liveIndicator}>
          <View style={[styles.liveDot, { backgroundColor: theme.primaryColor }]} />
          <Text style={[styles.liveText, { color: theme.textColor }]}>LIVE</Text>
        </View>
        <Text style={[styles.viewerCount, { color: theme.textColor }]}>
          {formatViewerCount(viewerCount)}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  viewerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  viewerCount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ViewerOverlay;

