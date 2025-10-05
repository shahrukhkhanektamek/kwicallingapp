import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function OrderSuccessScreen({ route }) {
  const navigation = useNavigation();
  const { orderNumber } = route.params || { orderNumber: "#ORD12345" };

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f8f5" }}>
      <View style={styles.container}>
        {/* ✅ Success Icon */}
        <Image
          source={require("../assets/img/success.jpg")} // Add a success image in assets
          style={styles.successImage}
        />

        {/* ✅ Success Message */}
        <Text style={styles.successText}>Order Placed Successfully!</Text>
        <Text style={styles.orderNumberText}>Order Number: {orderNumber}</Text>

        {/* ✅ Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Shop")}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#fff", borderWidth: 1, borderColor: "#4caf50" }]}
          onPress={() => navigation.navigate("Orders")}
        >
          <Text style={[styles.buttonText, { color: "#4caf50" }]}>View My Orders</Text>
        </TouchableOpacity>
      </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  successImage: { width: 120, height: 120, marginBottom: 20, resizeMode: "contain" },
  successText: { fontSize: 22, fontWeight: "700", color: "#4caf50", marginBottom: 10, textAlign: "center" },
  orderNumberText: { fontSize: 16, color: "#333", marginBottom: 30, textAlign: "center" },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 15,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
