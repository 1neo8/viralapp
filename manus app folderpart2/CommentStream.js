import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COMMENT_MODES, COMMENT_INTERVAL } from '../config/constants';
import fakeCommentsData from '../utils/fakeComments.json';

const CommentStream = ({ theme, isActive }) => {
  const [comments, setComments] = useState([]);
  const [commentMode, setCommentMode] = useState(COMMENT_MODES.FANBOY);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadCommentMode();
  }, []);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        addRandomComment();
      }, COMMENT_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [isActive, commentMode]);

  const loadCommentMode = async () => {
    try {
      const savedMode = await AsyncStorage.getItem('commentMode');
      if (savedMode) {
        setCommentMode(savedMode);
      }
    } catch (error) {
      console.log('Error loading comment mode:', error);
    }
  };

  const addRandomComment = () => {
    const modeComments = fakeCommentsData[commentMode] || fakeCommentsData.fanboy;
    const randomComment = modeComments[Math.floor(Math.random() * modeComments.length)];
    const randomUsername = generateRandomUsername();
    
    const newComment = {
      id: Date.now() + Math.random(),
      username: randomUsername,
      text: randomComment,
      timestamp: Date.now(),
    };

    setComments(prevComments => {
      const updatedComments = [...prevComments, newComment];
      // Keep only last 20 comments for performance
      return updatedComments.slice(-20);
    });

    // Animate new comment
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const generateRandomUsername = () => {
    const prefixes = ['user', 'fan', 'viewer', 'stream', 'live', 'watch', 'love', 'cool'];
    const suffixes = ['123', '456', '789', 'pro', 'fan', 'lover', 'star', 'king', 'queen'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix}${suffix}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.commentBackgroundColor }]}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {comments.map((comment, index) => (
          <Animated.View
            key={comment.id}
            style={[
              styles.commentContainer,
              theme.commentStyle,
              index === comments.length - 1 && { opacity: fadeAnim }
            ]}
          >
            <Text style={[styles.username, { color: theme.usernameColor }]}>
              {comment.username}
            </Text>
            <Text style={[styles.commentText, { color: theme.textColor }]}>
              {comment.text}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    height: 300,
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  username: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  commentText: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default CommentStream;

