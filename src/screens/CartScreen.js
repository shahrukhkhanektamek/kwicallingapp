import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";


const { width } = Dimensions.get("window");

import { useNavigation } from "@react-navigation/native";
 
// ✅ Dummy Cart Data
const initialCart = [
  { id: "1", name: "Wireless Earbuds", price: 899, quantity: 1, image: require("../assets/img/category/img1.jpg") },
  { id: "2", name: "Modern Sofa", price: 12000, quantity: 2, image: require("../assets/img/category/img1.jpg") },
  { id: "3", name: "Running Shoes", price: 1799, quantity: 1, image: require("../assets/img/category/img1.jpg") },
];

export default function CartScreen() {

    const navigation = useNavigation();
  const [cartItems, setCartItems] = useState(initialCart);

  const increment = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item));
  };

  const decrement = (id) => {
    setCartItems(cartItems.map(item => item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f8f5" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.header}>My Cart</Text>

        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.cartImage} />
            <View style={styles.cartDetails}>
              <Text style={styles.cartName}>{item.name}</Text>
              <Text style={styles.cartPrice}>₹{item.price}</Text>
              <View style={styles.quantityRow}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => decrement(item.id)}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => increment(item.id)}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Total Section */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>₹{totalAmount}</Text>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </ScrollView>

    
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 22, fontWeight: "700", color: "#333", margin: 15 },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 12,
    elevation: 2,
  },
  cartImage: { width: 100, height: 100, borderRadius: 12 },
  cartDetails: { flex: 1, marginLeft: 10, justifyContent: "space-between" },
  cartName: { fontSize: 16, fontWeight: "600", color: "#333" },
  cartPrice: { fontSize: 14, fontWeight: "700", color: "#4caf50", marginTop: 5 },
  quantityRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  qtyBtn: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  qtyBtnText: { fontSize: 18, fontWeight: "600" },
  qtyText: { fontSize: 16, marginHorizontal: 10 },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalText: { fontSize: 18, fontWeight: "600", color: "#333" },
  totalAmount: { fontSize: 18, fontWeight: "700", color: "#4caf50" },
  checkoutBtn: {
    backgroundColor: "#4caf50",
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
