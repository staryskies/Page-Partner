import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { getUserProfile } from '../services/api';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const ProfileScreen = ({ route }) => {
  const { userId } = route.params;
  const [profile, setProfile] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getUserProfile(userId);
      setProfile(profileData);
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    };
    fetchData();
  }, [fadeAnim, userId]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {profile && (
        <>
          <Text style={styles.title}>{profile.name}'s Profile</Text>
          <Text style={styles.stat}>Books Read: {profile.booksRead}</Text>
          <Text style={styles.stat}>Badges Earned: {profile.badges.length}</Text>
          <Text style={styles.sectionTitle}>Badges</Text>
          {profile.badges.map((badge, index) => (
            <Text key={index} style={styles.badge}>{badge}</Text>
          ))}
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { ...typography.h1, color: colors.textPrimary, marginBottom: 20 },
  stat: { ...typography.body, color: colors.textPrimary, marginBottom: 10 },
  sectionTitle: { ...typography.h2, color: colors.textPrimary, marginTop: 20, marginBottom: 10 },
  badge: { ...typography.body, color: colors.accent, marginBottom: 5 },
});

export default ProfileScreen;