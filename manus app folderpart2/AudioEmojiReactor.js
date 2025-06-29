import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const EMOJIS = ["🔥", "❤️", "👏", "😍", "😂"];
const THRESHOLD = 0.05; // Adjust sensitivity

export default function AudioEmojiReactor() {
  const floaters = useRef([]);

  useEffect(() => {
    let soundMeter;
    let interval;

    const startAudio = async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();

      soundMeter = setInterval(async () => {
        const status = await recording.getStatusAsync();
        if (status.metering && status.metering > THRESHOLD) {
          spawnEmoji();
        }
      }, 1000);
    };

    const spawnEmoji = () => {
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      const id = Math.random().toString();
      const yAnim = new Animated.Value(0);

      floaters.current.push({ id, emoji, yAnim });
      Animated.timing(yAnim, {
        toValue: -200,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        floaters.current = floaters.current.filter(f => f.id !== id);
      });
    };

    startAudio();

    return () => {
      clearInterval(soundMeter);
    };
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {floaters.current.map(f => (
        <Animated.Text
          key={f.id}
          style={{
            position: 'absolute',
            bottom: 10,
            left: `${Math.random() * 90}%`,
            transform: [{ translateY: f.yAnim }],
            fontSize: 30,
          }}>
          {f.emoji}
        </Animated.Text>
      ))}
    </View>
  );
}
