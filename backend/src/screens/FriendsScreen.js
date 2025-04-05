import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Animated } from 'react-native';
import { getFriends } from '../services/api';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const FriendsScreen = ({ route }) => {
  const { userId } = route.params;
  const [friends, setFriends] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      const friendData = await getFriends();
      setFriends(friendData);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    };
    fetchData();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Friends</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendName}>{item.name}</Text>
            <Text style={styles.progress}>{item.progress}%</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { ...typography.h1, color: colors.textPrimary, marginBottom: 20 },
  friendItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: colors.textSecondary },
  friendName: { ...typography.body, color: colors.textPrimary },
  progress: { ...typography.body, color: colors.accent },
});

export default FriendsScreen;