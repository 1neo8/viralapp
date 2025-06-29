import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VIEWER_LEVELS, COMMENT_MODES } from '../config/constants';

const SettingsScreen = () => {
  const [viewerLevel, setViewerLevel] = useState('MEDIUM');
  const [commentMode, setCommentMode] = useState(COMMENT_MODES.FANBOY);
  const [showWatermark, setShowWatermark] = useState(true);
  const [autoStart, setAutoStart] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await Promise.all([
        AsyncStorage.getItem('viewerLevel'),
        AsyncStorage.getItem('commentMode'),
        AsyncStorage.getItem('showWatermark'),
        AsyncStorage.getItem('autoStart'),
        AsyncStorage.getItem('soundEnabled'),
      ]);

      if (settings[0]) setViewerLevel(settings[0]);
      if (settings[1]) setCommentMode(settings[1]);
      if (settings[2] !== null) setShowWatermark(JSON.parse(settings[2]));
      if (settings[3] !== null) setAutoStart(JSON.parse(settings[3]));
      if (settings[4] !== null) setSoundEnabled(JSON.parse(settings[4]));
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem('viewerLevel', viewerLevel),
        AsyncStorage.setItem('commentMode', commentMode),
        AsyncStorage.setItem('showWatermark', JSON.stringify(showWatermark)),
        AsyncStorage.setItem('autoStart', JSON.stringify(autoStart)),
        AsyncStorage.setItem('soundEnabled', JSON.stringify(soundEnabled)),
      ]);
      
      Alert.alert('Success', 'Settings saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
      console.log('Error saving settings:', error);
    }
  };

  const resetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([
                'viewerLevel',
                'commentMode', 
                'showWatermark',
                'autoStart',
                'soundEnabled'
              ]);
              
              setViewerLevel('MEDIUM');
              setCommentMode(COMMENT_MODES.FANBOY);
              setShowWatermark(true);
              setAutoStart(true);
              setSoundEnabled(false);
              
              Alert.alert('Success', 'Settings reset to default');
            } catch (error) {
              Alert.alert('Error', 'Failed to reset settings');
            }
          }
        }
      ]
    );
  };

  const SettingSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const SettingRow = ({ label, children, description }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLabel}>
        <Text style={styles.settingLabelText}>{label}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      <View style={styles.settingControl}>
        {children}
      </View>
    </View>
  );

  const OptionButton = ({ title, selected, onPress }) => (
    <TouchableOpacity
      style={[styles.optionButton, selected && styles.selectedOption]}
      onPress={onPress}
    >
      <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>⚙️ Settings</Text>
          <Text style={styles.subtitle}>Customize your fake livestream experience</Text>
        </View>

        <SettingSection title="👥 Viewer Settings">
          <SettingRow 
            label="Viewer Count Level"
            description="Choose the range of fake viewers"
          >
            <View style={styles.optionGroup}>
              {Object.entries(VIEWER_LEVELS).map(([key, level]) => (
                <OptionButton
                  key={key}
                  title={level.label}
                  selected={viewerLevel === key}
                  onPress={() => setViewerLevel(key)}
                />
              ))}
            </View>
          </SettingRow>
        </SettingSection>

        <SettingSection title="💬 Comment Settings">
          <SettingRow 
            label="Comment Mode"
            description="Type of fake comments to display"
          >
            <View style={styles.optionGroup}>
              {Object.values(COMMENT_MODES).map((mode) => (
                <OptionButton
                  key={mode}
                  title={mode.charAt(0).toUpperCase() + mode.slice(1)}
                  selected={commentMode === mode}
                  onPress={() => setCommentMode(mode)}
                />
              ))}
            </View>
          </SettingRow>
        </SettingSection>

        <SettingSection title="🎨 Display Settings">
          <SettingRow 
            label="Show Watermark"
            description="Display disclaimer watermark on recordings"
          >
            <Switch
              value={showWatermark}
              onValueChange={setShowWatermark}
              trackColor={{ false: '#767577', true: '#FF6B6B' }}
              thumbColor={showWatermark ? '#FFFFFF' : '#f4f3f4'}
            />
          </SettingRow>

          <SettingRow 
            label="Auto-start Live"
            description="Automatically start fake stream on app open"
          >
            <Switch
              value={autoStart}
              onValueChange={setAutoStart}
              trackColor={{ false: '#767577', true: '#FF6B6B' }}
              thumbColor={autoStart ? '#FFFFFF' : '#f4f3f4'}
            />
          </SettingRow>

          <SettingRow 
            label="Sound Effects"
            description="Play notification sounds for comments"
          >
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#767577', true: '#FF6B6B' }}
              thumbColor={soundEnabled ? '#FFFFFF' : '#f4f3f4'}
            />
          </SettingRow>
        </SettingSection>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
            <Text style={styles.saveButtonText}>💾 Save Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
            <Text style={styles.resetButtonText}>🔄 Reset to Default</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ViralStage v1.0.0 - For Entertainment Only
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
  },
  section: {
    margin: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  settingLabel: {
    flex: 1,
    marginRight: 15,
  },
  settingLabelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  settingControl: {
    alignItems: 'flex-end',
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#333',
    marginLeft: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  selectedOption: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  optionText: {
    fontSize: 12,
    color: '#AAAAAA',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    padding: 20,
    gap: 15,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resetButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AAAAAA',
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

export default SettingsScreen;

