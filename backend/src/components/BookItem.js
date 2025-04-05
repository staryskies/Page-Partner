import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const BookItem = ({ book, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.placeholder}>
        <Text style={styles.initial}>{book.title[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: colors.textSecondary },
  placeholder: { width: 50, height: 50, backgroundColor: colors.accent, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  initial: { ...typography.h2, color: colors.white },
  info: { flex: 1 },
  title: { ...typography.body, color: colors.textPrimary },
  author: { ...typography.body, color: colors.textSecondary },
});

export default BookItem;