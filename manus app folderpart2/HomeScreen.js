import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

// Import components
import CommentStream from '../components/CommentStream';
import ViewerOverlay from '../components/ViewerOverlay';
import SkinSwitcher from '../components/SkinSwitcher';
import ExportRecorder from '../components/ExportRecorder';
import DisclaimerOverlay from '../components/DisclaimerOverlay';

// Import utilities
import { PLATFORMS, REACTIONS } from '../config/constants';
import { skinThemes } from '../utils/skinThemes';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [currentSkin, setCurrentSkin] = useState(PLATFORMS.TIKTOK);
  const [isLive, setIsLive] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState([]);
  
  const theme = skinThemes[currentSkin];
  const reactionAnimations = useRef([]).current;

  useEffect(() => {
    // Start the "live" stream automatically
    setIsLive(true);
    
    // Generate floating reactions periodically
    const reactionInterval = setInterval(() => {
      if (isLive) {
        generateFloatingReaction();
      }
    }, 1500);

    return () => clearInterval(reactionInterval);
  }, [isLive]);

  const generateFloatingReaction = () => {
    const reaction = REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
    const id = Date.now() + Math.random();
    const startX = Math.random() * (width - 50);
    
    const newReaction = {
      id,
      emoji: reaction,
      x: startX,
      animation: new Animated.Value(height),
    };

    setFloatingReactions(prev => [...prev.slice(-10), newReaction]); // Keep only last 10

    // Animate the reaction floating up
    Animated.timing(newReaction.animation, {
      toValue: -100,
      duration: 3000 + Math.random() * 2000, // 3-5 seconds
      useNativeDriver: true,
    }).start(() => {
      // Remove reaction after animation
      setFloatingReactions(prev => prev.filter(r => r.id !== id));
    });
  };

  const handleSkinChange = (skinKey) => {
    setCurrentSkin(skinKey);
  };

  const handleRecordingStart = () => {
    setShowDisclaimer(true);
  };

  const handleRecordingStop = () => {
    // Recording stopped, disclaimer will be shown
  };

  const handleDisclaimerDismiss = () => {
    setShowDisclaimer(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Background Video/Camera Feed Placeholder */}
      <View style={styles.videoContainer}>
        <LinearGradient
          colors={[theme.backgroundColor, theme.primaryColor + '20', theme.backgroundColor]}
          style={styles.gradientBackground}
        >
          <View style={styles.dummyVideoContent}>
            <Text style={[styles.dummyVideoText, { color: theme.textColor }]}>
              📹 Dummy Video Feed
            </Text>
            <Text style={[styles.dummyVideoSubtext, { color: theme.secondaryColor }]}>
              Your camera would appear here
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Floating Reactions */}
      {floatingReactions.map((reaction) => (
        <Animated.Text
          key={reaction.id}
          style={[
            styles.floatingReaction,
            {
              left: reaction.x,
              transform: [{ translateY: reaction.animation }],
            },
          ]}
        >
          {reaction.emoji}
        </Animated.Text>
      ))}

      {/* UI Overlays */}
      <ViewerOverlay theme={theme} isActive={isLive} />
      <SkinSwitcher 
        onSkinChange={handleSkinChange} 
        currentSkin={currentSkin} 
      />
      <CommentStream theme={theme} isActive={isLive} />
      <ExportRecorder 
        theme={theme}
        onRecordingStart={handleRecordingStart}
        onRecordingStop={handleRecordingStop}
      />

      {/* Live Status Toggle */}
      <TouchableOpacity
        style={[styles.liveToggle, { backgroundColor: theme.primaryColor }]}
        onPress={() => setIsLive(!isLive)}
      >
        <Text style={[styles.liveToggleText, { color: theme.backgroundColor }]}>
          {isLive ? 'Stop Live' : 'Go Live'}
        </Text>
      </TouchableOpacity>

      {/* Disclaimer Overlay */}
      <DisclaimerOverlay
        theme={theme}
        visible={showDisclaimer}
        onDismiss={handleDisclaimerDismiss}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyVideoContent: {
    alignItems: 'center',
    padding: 20,
  },
  dummyVideoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dummyVideoSubtext: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
  },
  floatingReaction: {
    position: 'absolute',
    fontSize: 30,
    zIndex: 5,
  },
  liveToggle: {
    position: 'absolute',
    top: 60,
    right: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  liveToggleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

