import ItemCard from '@/components/ui/ItemCard';
import SvgIcon from '@/components/ui/SvgIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const items = [
  {
    id: '1',
    name: 'Sample Item 1',
    price: 9.99,
    image: require('@/assets/images/sampleItem.jpg'),
  },
  {
    id: '2',
    name: 'Sample Item 2',
    price: 14.99,
    image: require('@/assets/images/sampleItem.jpg'),
  },
  {
    id: '3',
    name: 'Sample Item 3',
    price: 7.49,
    image: require('@/assets/images/sampleItem.jpg'),
  },
  {
    id: '4',
    name: 'Sample Item 4',
    price: 12.99,
    image: require('@/assets/images/sampleItem.jpg'),
  },
  {
    id: '5',
    name: 'Sample Item 5',
    price: 3.00,
    image: require('@/assets/images/sampleItem.jpg'),
  },
  // Add more items as needed
];

const Store = () => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 12,
      paddingTop: 24,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 16, position: 'fixed'}}>
        <SvgIcon
          color='white'
          size={48}
          assetModule={require('@/assets/icons/storeIcon.svg')}
        />
      </View>
      <View style={styles.content}>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          numColumns={2}
          key={'flatlist-2-cols'}
          columnWrapperStyle={{ justifyContent: 'space-between', gap: 0 }}
          renderItem={({ item }) => (
            <ItemCard
              name={item.name}
              price={item.price}
              image={item.image}
              onPress={() => console.log(`${item.name} pressed`)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Store;

