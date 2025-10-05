import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../Context/AppContext";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const { userLoggedIn, setUserLoggedIn } = useContext(AppContext);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f6f8f5" }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* 🔹 Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Icon name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* 🔹 User Info */}
      <View style={styles.userContainer}>
        <Image
          source={require("../assets/img/user.png")} // replace with a default avatar
          style={styles.userImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>
        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* 🔹 Quick Actions */}
      <View style={styles.actionList}>
        <MenuItem
          icon="cart-outline"
          label="My Orders"
          onPress={() => navigation.navigate("Orders")}
        />
        <MenuItem
          icon="location-outline"
          label="My Addresses"
          onPress={() => navigation.navigate("MyAddress")}
        />
        <MenuItem
          icon="heart-outline"
          label="Wishlist"
          onPress={() => navigation.navigate("Wishlist")}
        />
        {/* <MenuItem
          icon="card-outline"
          label="Payment Methods"
          onPress={() => navigation.navigate("Payments")}
        /> */}
        <MenuItem
          icon="help-circle-outline"
          label="Help & Support"
          onPress={() => navigation.navigate("Help")}
        />
        <MenuItem
          icon="log-out-outline"
          label="Logout"
          onPress={() => setUserLoggedIn(false)}
          isLogout
        />
      </View>
    </ScrollView>
  );
}

// ✅ Reusable Menu Item
function MenuItem({ icon, label, onPress, isLogout }) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, isLogout && { borderTopWidth: 1, borderTopColor: "#eee" }]}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Icon name={icon} size={22} color={isLogout ? "#f44336" : "#4caf50"} />
        <Text style={[styles.menuLabel, isLogout && { color: "#f44336" }]}>{label}</Text>
      </View>
      {!isLogout && <Icon name="chevron-forward" size={20} color="#999" />}
    </TouchableOpacity>
  );
}

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

  userContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 16,
    paddingVertical: 25,
    elevation: 2,
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  userName: { fontSize: 18, fontWeight: "700", color: "#333" },
  userEmail: { fontSize: 14, color: "#777", marginBottom: 12 },
  editBtn: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  actionList: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 16,
    paddingVertical: 10,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  menuLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginLeft: 15,
  },
});
