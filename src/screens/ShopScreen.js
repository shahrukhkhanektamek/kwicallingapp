import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get("window");

const categories = ["All", "Electronics", "Fashion", "Home", "Beauty", "Sports"];
const priceFilters = ["All", "₹0-500", "₹500-1000", "₹1000+"];

const products = [
  { id: "1", name: "Wireless Earbuds", price: "₹899", image: require("../assets/img/category/img1.jpg") },
  { id: "2", name: "Modern Sofa", price: "₹12,000", image: require("../assets/img/category/img1.jpg") },
  { id: "3", name: "Running Shoes", price: "₹1,799", image: require("../assets/img/category/img1.jpg") },
  { id: "4", name: "Smart Watch", price: "₹2,299", image: require("../assets/img/category/img1.jpg") },
  { id: "5", name: "Hand Bag", price: "₹1,099", image: require("../assets/img/category/img1.jpg") },
  { id: "6", name: "Gaming Chair", price: "₹7,499", image: require("../assets/img/category/img1.jpg") },
];

export default function ShopScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f6f8f5", marginBottom:50 }}>
      {/* 🔹 Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
        <TouchableOpacity>
          <Icon name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 🔹 Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#777" style={{ marginLeft: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 🔹 Category Filter UI */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        style={{ marginTop: 10 }}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterChip, selectedCategory === cat && styles.activeFilter]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.filterText, selectedCategory === cat && styles.activeFilterText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🔹 Price Filter UI */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, marginTop: 10 }}
      >
        {priceFilters.map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.priceChip, selectedPrice === p && styles.activePrice]}
            onPress={() => setSelectedPrice(p)}
          >
            <Text style={[styles.priceText, selectedPrice === p && styles.activePriceText]}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🔹 Product Grid UI */}
      <View style={styles.productGrid}>
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const CARD_WIDTH = (width - 40) / 2;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#333" },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 12,
    paddingHorizontal: 5,
    elevation: 2,
    marginTop:10
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },

  filterChip: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    elevation: 1,
  },
  filterText: { fontSize: 14, color: "#555", fontWeight: "500" },
  activeFilter: { backgroundColor: "#4caf50" },
  activeFilterText: { color: "#fff" },

  priceChip: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 10,
    elevation: 1,
  },
  priceText: { fontSize: 13, color: "#555" },
  activePrice: { backgroundColor: "#4caf50" },
  activePriceText: { color: "#fff" },

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 15,
    paddingBottom: 20,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4caf50",
  },
});
