import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { getBooks, getRecommendations } from '../services/api';
import BookItem from '../components/BookItem';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const HomeScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [books, setBooks] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      const bookData = await getBooks();
      const recData = await getRecommendations();
      setBooks([...recData, ...bookData]);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    };
    fetchData();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Your Books</Text>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <BookItem book={item} onPress={() => navigation.navigate('BookDetail', { bookId: item.id, userId })} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Friends', { userId })}>
        <Text style={styles.navText}>Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile', { userId })}>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { ...typography.h1, color: colors.textPrimary, marginBottom: 20 },
  navButton: { backgroundColor: colors.accent, padding: 10, borderRadius: 8, marginTop: 10 },
  navText: { ...typography.button, color: colors.white, textAlign: 'center' },
});

export default HomeScreen;