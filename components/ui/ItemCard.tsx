
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


type ItemCardProps = {
  name: string;
  price: string | number;
  image?: any;
  onPress?: () => void;
};


const ItemCard: React.FC<ItemCardProps> = ({ name, price, image, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    {image && (
      <Image source={image} style={styles.image} resizeMode="cover" />
    )}
    <View style={styles.info}>
  <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
  <Text style={styles.price} numberOfLines={1} ellipsizeMode="tail">{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</Text>
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
    width: 110,
    height: 140,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    opacity: 1,
    transform: [{ rotate: '0deg' }],
    gap: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  info: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#60604A',
    maxWidth: 90,
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    color: '#da834d',
    fontWeight: '600',
    maxWidth: 90,
    textAlign: 'center',
  },
});

export default ItemCard;