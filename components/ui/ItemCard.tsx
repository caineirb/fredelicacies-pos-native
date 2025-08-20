import { Item } from '@/constants/Items';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface ItemCardProps {
  item: Item;
  onPress?: () => void;
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    {item.image && (
      <Image source={item.image} style={styles.image} resizeMode="cover" />
    )}
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
      <Text style={styles.price} numberOfLines={1} ellipsizeMode="tail">{typeof item.price === 'number' ? `₱${item.price.toFixed(2)}` : item.price}</Text>
      <Text style={styles.amount} numberOfLines={1} ellipsizeMode="tail">Available: {item.stock}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    margin: 8,
    // Dynamic sizing with constraints
    minWidth: 150,
    maxWidth: 200,
    minHeight: 170,
    maxHeight: 220,
    flex: 1,
    aspectRatio: 0.8, // Maintains consistent proportions (width/height ratio)
    padding: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    gap: 8,
  },
  image: {
    flex: 1,
    width: '80%',
    maxWidth: 160,
    maxHeight: 160,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  info: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    minHeight: 40, // Ensures consistent space for text
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#60604A',
    width: '100%',
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    color: '#da834d',
    fontWeight: '600',
    width: '100%',
    textAlign: 'center',
  },
  amount: {
    fontSize: 12,
    color: '#60604A',
    fontWeight: '400',
    width: '100%',
    textAlign: 'center',
  },
});

export default ItemCard;