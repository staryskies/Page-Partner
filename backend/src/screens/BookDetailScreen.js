import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { getBook, addComment } from '../services/api';
import Comment from '../components/Comment';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const BookDetailScreen = ({ route, navigation }) => {
  const { bookId, userId } = route.params;
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      const bookData = await getBook(bookId);
      setBook(bookData);
      setComments(bookData.comments || []);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    };
    fetchData();
  }, [bookId, fadeAnim]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addComment(bookId, newComment, userId);
      const updatedBook = await getBook(bookId);
      setComments(updatedBook.comments);
      setNewComment('');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {book && (
        <>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>by {book.author}</Text>
          <Text style={styles.description}>{book.description}</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reading', { bookId, userId })}>
            <Text style={styles.buttonText}>Read Now</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Comments</Text>
          <FlatList
            data={comments}
            renderItem={({ item }) => <Comment comment={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
          <TextInput
            style={styles.input}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Add a comment..."
          />
          <TouchableOpacity style={styles.button} onPress={handleAddComment}>
            <Text style={styles.buttonText}>Post Comment</Text>
          </TouchableOpacity>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { ...typography.h1, color: colors.textPrimary },
  author: { ...typography.body, color: colors.textSecondary, marginBottom: 10 },
  description: { ...typography.body, color: colors.textPrimary, marginBottom: 20 },
  button: { backgroundColor: colors.accent, padding: 10, borderRadius: 8, marginBottom: 20 },
  buttonText: { ...typography.button, color: colors.white, textAlign: 'center' },
  sectionTitle: { ...typography.h2, color: colors.textPrimary, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: colors.textSecondary, padding: 10, borderRadius: 8, marginBottom: 10 },
});

export default BookDetailScreen;