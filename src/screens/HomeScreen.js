import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity, Linking, ScrollView } from "react-native";
import io from "socket.io-client";
import Icon from "react-native-vector-icons/Ionicons";
import Sound from "react-native-sound";
import appstyles, { colors } from "../assets/app";
import { StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native";
import { AppContext } from '../Context/AppContext';
const { width } = Dimensions.get('window');
export default function HomeScreen({ route, navigation }) {

  const { setUserLoggedIn } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("New");

  const deviceId = "sfsf";
  const [socket, setSocket] = useState(null);
  const [incomingData, setIncomingData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Ref to keep track of sound instance
  const soundRef = useRef(null);

  const contacts = [
    { id: 1, number: "9999999999" },
    { id: 2, number: "8888888888" },
    { id: 3, number: "7777777777" },
    { id: 4, number: "7777777777" },
    { id: 5, number: "7777777777" }, 
    { id: 6, number: "7777777777" },
    { id: 7, number: "7777777777" },
    { id: 8, number: "7777777777" },
    { id: 9, number: "7777777777" },
    { id: 10, number: "7777777777" },
    { id: 11, number: "7777777777" },
    { id: 12, number: "7777777777" },
    { id: 13, number: "7777777777" },
    { id: 14, number: "7777777777" },
    { id: 15, number: "7777777777" },
    { id: 16, number: "7777777777" },
    { id: 17, number: "7777777777" },
  ];

  useEffect(() => {
    const newSocket = io("http://192.168.1.61:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("joinDevice", deviceId);
    });

    newSocket.on(deviceId, (data) => {
      console.log("Incoming Data:", data);
      setIncomingData(data);
      setModalVisible(true);
      playSound(); // play sound on incoming
    });

    return () => {
      stopSound(); // stop sound when component unmounts
      newSocket.disconnect();
    };
  }, []);

  // Play looping sound
  const playSound = () => {
    stopSound(); // stop previous sound if any

    const incomingSound = new Sound("incoming", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Failed to load the sound", error);
        return;
      }
      incomingSound.setNumberOfLoops(-1); // loop continuously
      incomingSound.play((success) => {
        if (!success) console.log("Sound playback failed");
      });
    });

    soundRef.current = incomingSound;
  };

  // Stop and release sound
  const stopSound = () => {
    if (soundRef.current) {
      soundRef.current.pause(); // pause first
      setTimeout(() => {        // release after a tiny delay
        soundRef.current?.release();
        soundRef.current = null;
      }, 100);
    }
  };

  const handleCall = () => {
    stopSound(); // stop sound when call starts
    if (incomingData?.phone) {
      Linking.openURL(`tel:${incomingData.phone}`);
      fetch("http://YOUR_API/call-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: incomingData.phone, status: "called" }),
      });
      setModalVisible(false);
    }
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity
      style={appstyles.card}
      onPress={() => navigation.navigate("CallLog", { number: item.number })}
    >
      <Icon name="call-outline" size={22} color={colors.primary} />
      <Text style={[appstyles.value, { marginLeft: 10 }]}>{item.number}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={appstyles.container}>
      <View style={styles.header}>
          <View style={styles.headerLeft}>            
            <Image
              source={require('../assets/img/logo.png')}
              style={styles.logo}
            />
          </View>
          <TouchableOpacity onPress={() => {
            setUserLoggedIn(false)
            // handle logout
            
          }} >
            <Icon name="log-out-outline" style={styles.menu} />
          </TouchableOpacity>
        </View>
      <Text style={appstyles.brand}>Contact Numbers</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["New", "Called", "Missed"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ paddingBottom: 20 }}>
        {contacts.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={appstyles.card}
            onPress={() => navigation.navigate("CallLog", { number: item.number })}
          >
            <Icon name="call-outline" size={22} color={colors.primary} />
            <Text style={[{ marginLeft: 10 }]}>{item.number}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={appstyles.modalOverlay}>
          <View style={appstyles.modalBox}>
            <Text style={appstyles.modalTitle}>Incoming Request</Text>

            <View style={appstyles.detailBox}>
              <Text style={appstyles.label}>Name:</Text>
              <Text style={appstyles.value}>{incomingData?.name}</Text>
            </View>
            <View style={appstyles.detailBox}>
              <Text style={appstyles.label}>Email:</Text>
              <Text style={appstyles.value}>{incomingData?.email}</Text>
            </View>
            <View style={appstyles.detailBox}>
              <Text style={appstyles.label}>Phone:</Text>
              <Text style={appstyles.value}>{incomingData?.phone}</Text>
            </View>

            <View style={appstyles.modalActions}>
              <TouchableOpacity style={appstyles.callBtn} onPress={handleCall}>
                <Icon name="call" size={24} color={colors.white} />
                <Text style={appstyles.btnText}>Call Now</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={appstyles.closeBtn}
                onPress={() => {
                  stopSound(); // stop sound when modal closes
                  setModalVisible(false);
                }}
              >
                <Icon name="close-circle-outline" size={22} color={colors.grey} />
                <Text style={[appstyles.btnText, { color: colors.grey }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f6f8f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0, 
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  menu:{
    fontSize:30,
    color:'white'
  },
  logo: { width: 150, height: 40, borderRadius: 0, marginLeft: -15, resizeMode:'contain' },

  tabContainer: { flexDirection: 'row', marginVertical: 10, justifyContent: 'space-around' },
  tab: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#e0e0e0' },
  activeTab: { backgroundColor: colors.primary },
  tabText: { color: '#000', fontWeight: 'bold' },
  activeTabText: { color: '#fff' },
});
