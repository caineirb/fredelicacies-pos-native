import CategoryIndicator from '@/components/ui/CategoryIndicator';
import InventoryCard from '@/components/ui/InventoryCard';
import { Colors } from '@/constants/Colors';
import { Item, tempItems } from '@/constants/Items';
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
  
  const renderInventoryItem = ({ item }: { item: Item }) => (
    <InventoryCard
      name={item.name}
      price={item.price}
      cost={10}
      stock={item.stock}
      icon={item.image}
      onAction={() => {}}
    />
  );
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Categories Section */}
      <View style={styles.categoriesSection}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Categories</Text>
          <TouchableOpacity 
            style={styles.addButton}
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

      {/* Inventory Section */}
      <View style={styles.inventorySection}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Inventory</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>+ Add Item</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          numColumns={1}
          key="inventory-flatlist"
          renderItem={renderInventoryItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.inventoryListContent}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Inventory;

function createStyles(colorScheme: 'light' | 'dark' | null | undefined) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    
    // Categories Section
    categoriesSection: {
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? 'light'].tab.content,
    },
    
    // Header styling
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 12,
    },
    headerText: {
      color: Colors[colorScheme ?? 'light'].text,
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'left',
    },
    
    // Category container
    categoryContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: 12,
      paddingHorizontal: 16,
      paddingBottom: 20,
      minHeight: 80,
    },
    
    // Inventory Section
    inventorySection: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    
    // Inventory list styling
    inventoryListContent: {
      paddingHorizontal: 16,
      paddingBottom: 20,
      paddingTop: 8,
    },
    itemSeparator: {
      height: 8,
    },
    
    // Button styling
    addButton: {
      backgroundColor: Colors[colorScheme ?? 'light'].tint,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 14,
    },
  });
}