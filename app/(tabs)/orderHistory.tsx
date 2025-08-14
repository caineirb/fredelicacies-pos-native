import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OrderHistory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order History</Text>
    </View>
  )
}
export default OrderHistory;

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

