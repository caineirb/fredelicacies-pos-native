import CategoryIndicator from '@/components/ui/CategoryIndicator';
import { Colors } from '@/constants/Colors';
import { Item, tempItems } from '@/constants/items';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const tempCategories = [
  { color: "#FF6347", name: "Fruits", count: 3 },
  { color: "#3CB371", name: "Vegetables", count: 1 },
  { color: "#FFD700", name: "Dairy", count: 7 },
  { color: "#FF4500", name: "Meat", count: 10 },
  { color: "#8A2BE2", name: "Seafood", count: 1 },
];

const Inventory = () => {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const [items, setItems] = useState<Item[]>(tempItems);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categoryArea}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Categories</Text>
          <TouchableOpacity 
            style={styles.categoryAddButton}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>+ Add Category</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryContainer}>
          {tempCategories.map((category) => (
            <CategoryIndicator
              key={category.name}
              categoryColor={category.color}
              colorScheme={colorScheme}
              categoryName={category.name}
              count={category.count}
            />
          ))}
        </View>
      </View>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Inventory</Text>
          <TouchableOpacity 
            style={styles.categoryAddButton}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>+ Add Item</Text>
          </TouchableOpacity>
        </View>
      <View>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          numColumns={1}
          key={`flatlist-1-cols`}
          renderItem={({ item }) => (
            <View style={{ flex: 1, maxWidth: '48%' }}>
              {item.name.toString()}
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            padding: 16,
          }}
        />
      </View>
      </View>
    </SafeAreaView>
  )
}
export default Inventory;

function createStyles(colorScheme: 'light' | 'dark' | null | undefined) {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    headerText: {
      color: Colors[colorScheme ?? 'light'].text,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    categoryArea: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignContent: 'center',
    },
    categoryContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      gap: 16,
      paddingHorizontal: 16,
      paddingBottom: 16,
      minHeight: 100,
    },
    categoryAddButton: {
      backgroundColor: Colors[colorScheme ?? 'light'].tint,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
}