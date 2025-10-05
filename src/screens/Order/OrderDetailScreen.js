import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";


const sampleItems = [
  { id: "1", name: "Bracelet Woman", quantity: 1, price: "$65" },
  { id: "2", name: "Sofa single coco", quantity: 2, price: "$120" },
];

export default function OrderDetailScreen({ route }) {
  const { order } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f8f5" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Page Title */}
        <Text style={styles.header}>Order Details</Text>

        {/* Order Info */}
        <View style={styles.orderInfoCard}>
          <InfoRow label="Order Number:" value={order.orderNumber} />
          <InfoRow label="Order Date:" value={order.date} />
          <InfoRow
            label="Status:"
            value={order.status}
            valueStyle={[
              order.status === "Delivered" && { color: "#4caf50" },
              order.status === "Processing" && { color: "#ff9800" },
              order.status === "Cancelled" && { color: "#f44336" },
            ]}
          />
          <InfoRow label="Total:" value={order.total} />
        </View>

        {/* Items List */}
        <Text style={[styles.header, { marginTop: 10 }]}>Items</Text>
        {sampleItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.itemRow}>
              <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

    </View>
  );
}

/* 🔹 Reusable row for order info */
function InfoRow({ label, value, valueStyle }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoText, valueStyle]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  orderInfoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#777",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemQty: { fontSize: 14, color: "#555" },
  itemPrice: { fontSize: 14, fontWeight: "600", color: "#333" },
});
