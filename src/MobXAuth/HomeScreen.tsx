// HomeScreen.tsx
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from './AuthContext';

const HomeScreen: React.FC = () => {
  const { authStore } = useAuth();

  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {authStore.isAuthenticated
          ? 'You are logged in!'
          : 'You are not logged in!'}
      </Text>
      {authStore.isAuthenticated && (
        <Button title="Logout" onPress={handleLogout} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
  },
});

export default HomeScreen;
