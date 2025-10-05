import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function AddAddressScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Home");
  const [address, setAddress] = useState("");

  const saveAddress = () => {
    if (!name || !phone || !address) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    // 👉 Here you can integrate API call or pass data back
    Alert.alert("Success", "Address saved successfully!");
    navigation.goBack();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f6f8f5" }}>
      {/* 🔹 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Address</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* 🔹 Form */}
      <View style={styles.form}>
        {/* Name */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={name}
          onChangeText={setName}
        />

        {/* Phone */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {/* Address */}
        <Text style={styles.label}>Full Address</Text>
        <TextInput
          style={[styles.input, { height: 90, textAlignVertical: "top" }]}
          placeholder="House No, Street, City, Pincode"
          value={address}
          onChangeText={setAddress}
          multiline
        />

        {/* Address Type */}
        <Text style={styles.label}>Address Type</Text>
        <View style={styles.typeRow}>
          {["Home", "Office", "Other"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.typeChip, type === item && styles.typeActive]}
              onPress={() => setType(item)}
            >
              <Text style={[styles.typeText, type === item && styles.typeActiveText]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={saveAddress}>
          <Text style={styles.saveText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },

  form: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
    elevation: 1,
  },

  typeRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  typeChip: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    elevation: 1,
  },
  typeText: { fontSize: 14, color: "#555", fontWeight: "500" },
  typeActive: { backgroundColor: "#4caf50" },
  typeActiveText: { color: "#fff" },

  saveButton: {
    backgroundColor: "#4caf50",
    marginTop: 25,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    elevation: 3,
  },
  saveText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
  },
});
