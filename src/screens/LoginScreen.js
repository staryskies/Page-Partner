import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { login } from '../services/api';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = async () => {
    try {
      const { token, name } = await login(email, password);
      navigation.replace('Home', { userId: token, userName: name });
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Welcome to BookApp</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  title: { ...typography.h1, color: colors.textPrimary, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: colors.textSecondary, padding: 10, borderRadius: 8, width: '80%', marginBottom: 10 },
  button: { backgroundColor: colors.accent, padding: 15, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 },
  buttonText: { ...typography.button, color: colors.white },
});

export default LoginScreen;