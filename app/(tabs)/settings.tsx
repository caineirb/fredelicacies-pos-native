import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  )
}
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#333',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

