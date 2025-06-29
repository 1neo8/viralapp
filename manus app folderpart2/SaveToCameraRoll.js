import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function SaveToCameraRoll({ exportUri, isProUser }) {
  const handleSave = async () => {
    if (!isProUser) {
      Alert.alert("Pro Feature Only", "Upgrade to ViralPro to export videos.");
      return;
    }

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Camera roll access is required.");
      return;
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(exportUri);
      await MediaLibrary.createAlbumAsync('ViralStage Exports', asset, false);
      Alert.alert("Success", "Video saved to your camera roll.");
    } catch (err) {
      Alert.alert("Error", "Could not save video.");
      console.error(err);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSave}>
      <Text style={styles.text}>📤 Save Clip to Camera Roll</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: '#0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'center',
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
  },
});
