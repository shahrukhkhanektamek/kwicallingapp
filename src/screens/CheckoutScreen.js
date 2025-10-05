import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";


export default function CheckoutScreen() {
    const navigation = useNavigation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Dummy Cart Summary
  const cartSummary = [
    { id: "1", name: "Wireless Earbuds", price: 899, quantity: 1 },
    { id: "2", name: "Modern Sofa", price: 12000, quantity: 2 },
  ];

  const totalAmount = cartSummary.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f8f5" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.header}>Checkout</Text>

        {/* 🔹 Shipping Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Shipping Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder="PIN Code"
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
          />
        </View>

        {/* 🔹 Payment Method */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "cod" && styles.activePayment,
            ]}
            onPress={() => setPaymentMethod("cod")}
          >
            <Text
              style={[
                styles.paymentText,
                paymentMethod === "cod" && styles.activePaymentText,
              ]}
            >
              Cash on Delivery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "card" && styles.activePayment,
            ]}
            onPress={() => setPaymentMethod("card")}
          >
            <Text
              style={[
                styles.paymentText,
                paymentMethod === "card" && styles.activePaymentText,
              ]}
            >
              Credit/Debit Card
            </Text>
          </TouchableOpacity>
        </View>

        {/* 🔹 Order Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartSummary.map((item) => (
            <View key={item.id} style={styles.orderRow}>
              <Text style={styles.orderName}>
                {item.name} x {item.quantity}
              </Text>
              <Text style={styles.orderPrice}>₹{item.price * item.quantity}</Text>
            </View>
          ))}
          <View style={styles.orderRow}>
            <Text style={[styles.orderName, { fontWeight: "700" }]}>Total</Text>
            <Text style={[styles.orderPrice, { fontWeight: "700" }]}>₹{totalAmount}</Text>
          </View>
        </View>

        {/* 🔹 Place Order Button */}
        <TouchableOpacity style={styles.placeOrderBtn} onPress={() => navigation.navigate("OrderSuccess")}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>

     
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 22, fontWeight: "700", color: "#333", margin: 15 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 12,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },

  paymentOption: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  paymentText: { fontSize: 14, color: "#555" },
  activePayment: { backgroundColor: "#4caf50", borderColor: "#4caf50" },
  activePaymentText: { color: "#fff", fontWeight: "700" },

  orderRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  orderName: { fontSize: 14, color: "#333" },
  orderPrice: { fontSize: 14, color: "#333" },

  placeOrderBtn: {
    backgroundColor: "#4caf50",
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  placeOrderText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
