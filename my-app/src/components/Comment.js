import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const Comment = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.user}>{comment.userInitial || 'U'}</Text>
      <View style={styles.content}>
        <Text style={styles.text}>{comment.text}</Text>
        <Text style={styles.timestamp}>{new Date(comment.timestamp).toLocaleTimeString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: colors.textSecondary },
  user: { width: 30, height: 30, backgroundColor: colors.accent, borderRadius: 15, textAlign: 'center', lineHeight: 30, ...typography.body, color: colors.white, marginRight: 10 },
  content: { flex: 1 },
  text: { ...typography.body, color: colors.textPrimary },
  timestamp: { ...typography.body, color: colors.textSecondary, fontSize: 12 },
});

export default Comment;