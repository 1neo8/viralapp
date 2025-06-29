import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLATFORMS } from '../config/constants';
import { skinThemes } from '../utils/skinThemes';

const SkinSwitcher = ({ onSkinChange, currentSkin }) => {
  const [selectedSkin, setSelectedSkin] = useState(currentSkin || PLATFORMS.TIKTOK);

  useEffect(() => {
    loadSelectedSkin();
  }, []);

  const loadSelectedSkin = async () => {
    try {
      const savedSkin = await AsyncStorage.getItem('selectedSkin');
      if (savedSkin) {
        setSelectedSkin(savedSkin);
        onSkinChange(savedSkin);
      }
    } catch (error) {
      console.log('Error loading skin:', error);
    }
  };

  const handleSkinSelect = async (skinKey) => {
    try {
      setSelectedSkin(skinKey);
      await AsyncStorage.setItem('selectedSkin', skinKey);
      onSkinChange(skinKey);
    } catch (error) {
      console.log('Error saving skin:', error);
    }
  };

  const getSkinIcon = (platform) => {
    const icons = {
      [PLATFORMS.TIKTOK]: '🎵',
      [PLATFORMS.INSTAGRAM]: '📷',
      [PLATFORMS.YOUTUBE]: '📺',
      [PLATFORMS.SNAPCHAT]: '👻',
      [PLATFORMS.FACEBOOK]: '👥',
    };
    return icons[platform] || '📱';
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {Object.entries(skinThemes).map(([key, theme]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.skinButton,
              { backgroundColor: theme.backgroundColor },
              selectedSkin === key && styles.selectedSkin
            ]}
            onPress={() => handleSkinSelect(key)}
          >
            <Text style={styles.skinIcon}>{getSkinIcon(key)}</Text>
            <Text style={[styles.skinName, { color: theme.textColor }]}>
              {theme.name}
            </Text>
            {selectedSkin === key && (
              <View style={[styles.selectedIndicator, { backgroundColor: theme.primaryColor }]} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  skinButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative',
  },
  selectedSkin: {
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  skinIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  skinName: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default SkinSwitcher;

