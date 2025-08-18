import { Item } from '@/app/(tabs)/store';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

interface Order {
  item: Item;
  quantity: number;
}

interface OrdersModalProps {
  showModal: boolean;
  orders: Order[];
  onClose: () => void;
  onChangeQuantity: (itemId: string, quantity: number) => void;
}

const OrdersModal = ({ showModal, orders, onClose, onChangeQuantity }: OrdersModalProps) => {
  const colorScheme = useColorScheme();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempQuantity, setTempQuantity] = useState<string>('');

  const totalPrice = orders.reduce((sum, order) => sum + (order.item.price * order.quantity), 0);

  const handleQuantityPress = (itemId: string, currentQuantity: number) => {
    setEditingItemId(itemId);
    setTempQuantity(currentQuantity.toString());
  };

  const handleQuantityChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setTempQuantity(numericText);
  };

  const handleQuantitySubmit = (itemId: string) => {
    const newQuantity = parseInt(tempQuantity, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onChangeQuantity(itemId, newQuantity);
    }
    setEditingItemId(null);
    setTempQuantity('');
  };

  const handleQuantityBlur = (itemId: string) => {
    if (tempQuantity.trim() !== '') {
      handleQuantitySubmit(itemId);
    } else {
      setEditingItemId(null);
      setTempQuantity('');
    }
  };

  const handleIncrement = (itemId: string, currentQuantity: number) => {
    onChangeQuantity(itemId, currentQuantity + 1);
  };

  const handleDecrement = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 0) {
      onChangeQuantity(itemId, currentQuantity - 1);
    }
  };

  const handleOrder = () => {
    // Handle order submission logic here
    orders.map((order) => {
      console.log('Order submitted:', {...order, subtotal: order.item.price * order.quantity, datetime: new Date().toISOString()});
    });
  };

  return (
    <Modal
      visible={showModal}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles(colorScheme).modalOverlay}>
          <View style={styles(colorScheme).modalContainer}>
            <View style={styles(colorScheme).header}>
              <Text style={styles(colorScheme).title}>Your Orders</Text>
            </View>

            {orders.length === 0 ? (
              <View style={styles(colorScheme).emptyState}>
                <Text style={styles(colorScheme).emptyText}>
                  No items in your order yet.{"\n"}Start adding some delicious items!
                </Text>
              </View>
            ) : (
              <ScrollView style={styles(colorScheme).ordersList} showsVerticalScrollIndicator={false}>
                {orders.map((order) => (
                  <View key={order.item.id} style={styles(colorScheme).orderItem}>
                    <Image
                      source={typeof order.item.image === 'number' ? order.item.image : { uri: order.item.image }}
                      style={styles(colorScheme).itemImage}
                    />
                    <View style={styles(colorScheme).itemDetails}>
                      <Text style={styles(colorScheme).itemName}>{order.item.name}</Text>
                      <Text style={styles(colorScheme).itemPrice}>${order.item.price.toFixed(2)}</Text>
                      <Text style={styles(colorScheme).itemAmount}>Available: {order.item.stock}</Text>
                    </View>
                    <View style={styles(colorScheme).quantityContainer}>
                      <TouchableOpacity
                        style={styles(colorScheme).quantityButton}
                        onPress={() => handleDecrement(order.item.id, order.quantity)}
                        accessible accessibilityLabel="Decrease quantity"
                      >
                        <Text style={styles(colorScheme).quantityButtonText}>−</Text>
                      </TouchableOpacity>

                      {editingItemId === order.item.id ? (
                        <TextInput
                          style={styles(colorScheme).quantityInput}
                          value={tempQuantity}
                          onChangeText={handleQuantityChange}
                          onSubmitEditing={() => handleQuantitySubmit(order.item.id)}
                          onBlur={() => handleQuantityBlur(order.item.id)}
                          keyboardType="numeric"
                          selectTextOnFocus
                          autoFocus
                          maxLength={5}
                          accessible
                          accessibilityLabel="Quantity input"
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleQuantityPress(order.item.id, order.quantity)}
                          accessible accessibilityLabel="Edit quantity"
                        >
                          <Text style={styles(colorScheme).quantity}>{order.quantity}</Text>
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={styles(colorScheme).quantityButton}
                        onPress={() => handleIncrement(order.item.id, order.quantity)}
                        accessible accessibilityLabel="Increase quantity"
                      >
                        <Text style={styles(colorScheme).quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            <View style={styles(colorScheme).footer}>
              {orders.length > 0 && (
                <View style={styles(colorScheme).totalContainer}>
                  <Text style={styles(colorScheme).totalLabel}>Total:</Text>
                  <Text style={styles(colorScheme).totalPrice}>${totalPrice.toFixed(2)}</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles(colorScheme).closeButton}
                onPress={onClose}
                accessible accessibilityLabel="Close modal"
              >
                <Text style={styles(colorScheme).closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles(colorScheme).orderButton}
                onPress={handleOrder}
                accessible accessibilityLabel="Order modal"
              >
                <Text style={styles(colorScheme).orderButtonText}>Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OrdersModal;

const styles = (colorScheme: ReturnType<typeof useColorScheme>) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderRadius: 16,
      width: '90%',
      height: '80%',
      paddingVertical: 24,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    header: {
      paddingHorizontal: 24,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? 'light'].tab.content,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Poppins-Bold',
      color: Colors[colorScheme ?? 'light'].text,
      textAlign: 'center',
    },
    ordersList: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    orderItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? 'light'].tab.content,
    },
    itemImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 16,
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: 4,
    },
    itemPrice: {
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      color: Colors[colorScheme ?? 'light'].tab.content,
    },
    itemAmount: {
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      color: Colors[colorScheme ?? 'light'].tab.content,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 8,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? 'light'].tab.content,
      overflow: 'hidden',
    },
    quantityButton: {
      backgroundColor: Colors[colorScheme ?? 'light'].tint,
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityButtonText: {
      color: 'white',
      fontSize: 18,
      fontFamily: 'Poppins-Bold',
      lineHeight: 18,
    },
    quantity: {
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
      color: Colors[colorScheme ?? 'light'].text,
      marginHorizontal: 15,
      minWidth: 30,
      textAlign: 'center',
    },
    quantityInput: {
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
      color: Colors[colorScheme ?? 'light'].text,
      marginHorizontal: 15,
      minWidth: 30,
      textAlign: 'center',
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
    },
    footer: {
      paddingHorizontal: 24,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: Colors[colorScheme ?? 'light'].tab.content,
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    totalLabel: {
      fontSize: 18,
      fontFamily: 'Poppins-SemiBold',
      color: Colors[colorScheme ?? 'light'].text,
    },
    totalPrice: {
      fontSize: 24,
      fontFamily: 'Poppins-Bold',
      color: Colors[colorScheme ?? 'light'].tint,
    },
    closeButton: {
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    closeButtonText: {
      color: Colors[colorScheme ?? 'light'].text,
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
    },
    orderButton: {
      backgroundColor: Colors[colorScheme ?? 'light'].tint,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    orderButtonText: {
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
      color: 'white',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
      color: Colors[colorScheme ?? 'light'].tab.content,
      textAlign: 'center',
    },
  });
