import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Logs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Logs</Text>
    </View>
  )
}
export default Logs;

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

