import ItemCard from '@/components/ui/ItemCard';
import OrdersModal from '@/components/ui/OrdersModal';
import SearchBar from '@/components/ui/SearchBar';
import { Colors } from '@/constants/Colors';
import { Item, tempItems } from '@/constants/Items';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScaledSize, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const Store = () => {
  const colorScheme = useColorScheme();
  const [items, setItems] = useState<Item[]>(tempItems);
  const [numColumns, setNumColumns] = useState(2);
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [searchItem, setSearchItem] = useState('');
  const [orders, setOrders] = useState<{[key: string]: number}>({});
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleShowOrderModal = () => {
    setShowOrderModal(true);
  };

  const handleHideOrderModal = () => {
    setShowOrderModal(false);
  };

  useEffect(() => {
    const onChange = (result: { window: ScaledSize; screen: ScaledSize; }) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const { width } = screenData;
    
    // Determine number of columns based on screen width
    // You can adjust these breakpoints as needed
    if (width < 480) {
      setNumColumns(2); // Small screens (phones in portrait)
    } else if (width < 768) {
      setNumColumns(2); // Medium screens (phones in landscape, small tablets)
    } else if (width < 1024) {
      setNumColumns(3); // Large screens (tablets)
    } else {
      setNumColumns(4); // Extra large screens (desktop, large tablets)
    }
  }, [screenData]);

  const handleOrderPress = (itemId: string) => {
    const item = items.find(item => item.id === itemId);
    const currentQuantity = orders[itemId] || 0;
    
    // Don't add if current quantity equals or exceeds stock
    if (item && currentQuantity < item.stock) {
      setOrders((prevOrders) => ({
        ...prevOrders,
        [itemId]: currentQuantity + 1,
      }));
      console.log(`Added ${itemId} to orders. Total: ${currentQuantity + 1}/${item.stock}`);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Maximum quantity reached',
        text2: `Cannot add more. Only ${item?.stock || 0} available in stock`,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
      });
    }
  };

  const handleChangeQuantity = (itemId: string, quantity: number) => {
    const item = items.find(item => item.id === itemId);
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      setOrders((prevOrders) => {
        const newOrders = { ...prevOrders };
        delete newOrders[itemId];
        return newOrders;
      });
    } else if (item && quantity <= item.stock) {
      // Only update if quantity doesn't exceed stock
      setOrders((prevOrders) => ({
        ...prevOrders,
        [itemId]: quantity,
      }));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Quantity too high',
        text2: `Maximum available: ${item?.stock || 0}`,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 60,
      });
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    content: {
      flex: 1,
      width: '100%',
      paddingTop: 100,
      alignSelf: 'center',
    },
    header: {
      padding: 16,
      position: 'absolute',
      top: 22,
      left: 0,
      zIndex: 1,
    },
    searchBarContainer: {
      position: 'absolute',
      top: 80,
      left: 16,
      right: 16,
      backgroundColor: 'white',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 10, // Position above tabs (tabs are usually 80px high)
      left: '5%',
      right: '5%',
      zIndex: 1,
      height: 30, // Half the height of searchbar (40px / 2)
      width: '90%',
    },
    button: {
      backgroundColor: Colors[colorScheme ?? 'light'].tint,
      borderRadius: 4,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    buttonText: {
      color: 'white',
      fontSize: 12,
      fontFamily: 'Poppins-Medium',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          searchItem={searchItem}
          setSearchItem={setSearchItem}
        />
      </View>
      <View style={styles.content}>
        <FlatList
          data={items.filter(item => item.name.toLowerCase().includes(searchItem.toLowerCase()))}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          key={`flatlist-${numColumns}-cols`}
          columnWrapperStyle={numColumns > 1 ? {
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          } : null}
          renderItem={({ item }) => (
            <View style={{ flex: 1, maxWidth: '48%' }}>
              <ItemCard
                item={item}
                onPress={() => handleOrderPress(item.id)}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            padding: 16,
          }}
        />
      </View>
      {orders && Object.keys(orders).length > 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleShowOrderModal}
          >
            <Text style={styles.buttonText}>View Orders</Text>
          </TouchableOpacity>
        </View>
      )}
      <OrdersModal
        onClose={handleHideOrderModal}
        onChangeQuantity={handleChangeQuantity}
        showModal={showOrderModal}
        orders={Object.entries(orders).map(([id, quantity]) => ({
          item: items.find(item => item.id === id) || { id, name: 'Unknown', price: 0, image: null, stock: 0 },
          quantity,
        }))}
      />
      <Toast />
    </SafeAreaView>
  );
};

export default Store;