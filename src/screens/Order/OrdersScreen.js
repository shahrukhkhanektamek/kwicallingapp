import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function OrdersScreen() {
    const navigation = useNavigation();
  const orders = [
    { id: "1", orderNumber: "#ORD12345", date: "2025-09-23", total: "$150.00", status: "Delivered" },
    { id: "2", orderNumber: "#ORD12346", date: "2025-09-21", total: "$85.00", status: "Processing" },
    { id: "3", orderNumber: "#ORD12347", date: "2025-09-19", total: "$240.00", status: "Cancelled" },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f6f8f5" }}
      contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>My Orders</Text>

      {orders.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.orderCard}
          onPress={() => navigation.navigate("OrderDetail", { order: item })}
        >
          <View style={styles.orderRow}>
            <Text style={styles.orderNumber}>{item.orderNumber}</Text>
            <Text style={styles.orderDate}>{item.date}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderTotal}>Total: {item.total}</Text>
            <Text
              style={[
                styles.orderStatus,
                item.status === "Delivered" && { color: "#4caf50" },
                item.status === "Processing" && { color: "#ff9800" },
                item.status === "Cancelled" && { color: "#f44336" },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginVertical: 15,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  orderNumber: { fontSize: 16, fontWeight: "600", color: "#333" },
  orderDate: { fontSize: 14, color: "#777" },
  orderTotal: { fontSize: 14, fontWeight: "500", color: "#333" },
  orderStatus: { fontSize: 14, fontWeight: "600" },
});
