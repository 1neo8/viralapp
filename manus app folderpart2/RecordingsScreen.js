import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  Image,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const RecordingsScreen = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const savedRecordings = await AsyncStorage.getItem('recordings');
      if (savedRecordings) {
        const parsedRecordings = JSON.parse(savedRecordings);
        setRecordings(parsedRecordings.reverse()); // Show newest first
      }
    } catch (error) {
      console.log('Error loading recordings:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecording = async (recordingId) => {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedRecordings = recordings.filter(r => r.id !== recordingId);
              setRecordings(updatedRecordings);
              await AsyncStorage.setItem('recordings', JSON.stringify(updatedRecordings));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete recording');
            }
          }
        }
      ]
    );
  };

  const shareRecording = (recording) => {
    // TODO: Implement actual sharing functionality
    Alert.alert(
      'Share Recording',
      'Sharing functionality will be implemented in a future update.',
      [{ text: 'OK' }]
    );
  };

  const playRecording = (recording) => {
    // TODO: Implement video playback
    Alert.alert(
      'Play Recording',
      'Video playback functionality will be implemented in a future update.',
      [{ text: 'OK' }]
    );
  };

  const clearAllRecordings = () => {
    Alert.alert(
      'Clear All Recordings',
      'Are you sure you want to delete all recordings? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: async () => {
            try {
              setRecordings([]);
              await AsyncStorage.removeItem('recordings');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear recordings');
            }
          }
        }
      ]
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getPlatformEmoji = (platform) => {
    const emojis = {
      tiktok: '🎵',
      instagram: '📷',
      youtube: '📺',
      snapchat: '👻',
      facebook: '👥',
    };
    return emojis[platform] || '📱';
  };

  const renderRecording = ({ item }) => (
    <View style={styles.recordingCard}>
      <TouchableOpacity 
        style={styles.thumbnailContainer}
        onPress={() => playRecording(item)}
      >
        <View style={styles.placeholderThumbnail}>
          <Text style={styles.playIcon}>▶️</Text>
          <Text style={styles.durationText}>{item.duration}s</Text>
        </View>
        {item.hasWatermark && (
          <View style={styles.watermarkBadge}>
            <Text style={styles.watermarkText}>🎭</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <View style={styles.recordingInfo}>
        <View style={styles.recordingHeader}>
          <Text style={styles.platformText}>
            {getPlatformEmoji(item.platform)} {item.platform?.toUpperCase() || 'UNKNOWN'}
          </Text>
          <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
        </View>
        
        <View style={styles.recordingActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => shareRecording(item)}
          >
            <Text style={styles.actionButtonText}>📤 Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => deleteRecording(item.id)}
          >
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📹</Text>
      <Text style={styles.emptyTitle}>No Recordings Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start recording fake livestreams from the Home screen to see them here.
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading recordings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📹 My Recordings</Text>
        <Text style={styles.subtitle}>
          {recordings.length} recording{recordings.length !== 1 ? 's' : ''}
        </Text>
        
        {recordings.length > 0 && (
          <TouchableOpacity 
            style={styles.clearAllButton}
            onPress={clearAllRecordings}
          >
            <Text style={styles.clearAllText}>🗑️ Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={recordings}
        renderItem={renderRecording}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#AAAAAA',
  },
  header: {
    padding: 20,
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
    marginBottom: 15,
  },
  clearAllButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#555',
  },
  clearAllText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  listContainer: {
    padding: 20,
  },
  recordingCard: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  thumbnailContainer: {
    width: 120,
    height: 90,
    position: 'relative',
  },
  placeholderThumbnail: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  durationText: {
    fontSize: 10,
    color: '#AAAAAA',
    fontWeight: 'bold',
  },
  watermarkBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watermarkText: {
    fontSize: 10,
  },
  recordingInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  recordingHeader: {
    marginBottom: 10,
  },
  platformText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  recordingActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#333',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#555',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderColor: '#FF6B6B',
  },
  actionButtonText: {
    fontSize: 10,
    color: '#AAAAAA',
    fontWeight: '500',
  },
  deleteButtonText: {
    color: '#FF6B6B',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 40,
  },
});

export default RecordingsScreen;

