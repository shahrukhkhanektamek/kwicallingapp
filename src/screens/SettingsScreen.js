import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [isNotificationOn, setIsNotificationOn] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => Alert.alert("Logged Out") },
    ]);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f6f8f5" }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.section}>
        <SettingItem
          icon="person-outline"
          label="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <SettingItem
          icon="location-outline"
          label="My Addresses"
          onPress={() => navigation.navigate("MyAddress")}
        />
      </View>

      {/* App Settings Section */}
      <Text style={styles.sectionTitle}>App Settings</Text>
      <View style={styles.section}>
        <SettingSwitch
          icon="notifications-outline"
          label="Notifications"
          value={isNotificationOn}
          onValueChange={() => setIsNotificationOn(!isNotificationOn)}
        />
        <SettingSwitch
          icon="moon-outline"
          label="Dark Mode"
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(!isDarkMode)}
        />
        <SettingItem
          icon="help-circle-outline"
          label="Help & Support"
          onPress={() => navigation.navigate("HelpSupport")}
        />
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Icon name="log-out-outline" size={20} color="#f44336" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

/* ✅ Reusable Components */
const SettingItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemLeft}>
      <Icon name={icon} size={22} color="#4caf50" />
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    <Icon name="chevron-forward" size={20} color="#777" />
  </TouchableOpacity>
);

const SettingSwitch = ({ icon, label, value, onValueChange }) => (
  <View style={styles.item}>
    <View style={styles.itemLeft}>
      <Icon name={icon} size={22} color="#4caf50" />
      <Text style={styles.itemLabel}>{label}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? "#4caf50" : "#ccc"}
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 15,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 15,
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 12,
    paddingVertical: 5,
    elevation: 2,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f44336",
    marginLeft: 8,
  },
});
