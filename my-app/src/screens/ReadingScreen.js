import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { getBook } from '../services/api';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const ReadingScreen = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      const bookData = await getBook(bookId);
      setBook(bookData);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    };
    fetchData();
  }, [bookId, fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {book && (
        <>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.content}>{book.content || 'Sample chapter content goes here...'}</Text>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { ...typography.h1, color: colors.textPrimary, marginBottom: 20 },
  content: { ...typography.body, color: colors.textPrimary },
});

export default ReadingScreen;