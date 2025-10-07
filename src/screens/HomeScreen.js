import React, { useEffect, useState, useRef, useContext, useCallback } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity, Linking, ScrollView, RefreshControl, TextInput } from "react-native";
import io from "socket.io-client";
import Icon from "react-native-vector-icons/Ionicons";
import Sound from "react-native-sound";
import appstyles, { colors } from "../assets/app";
import { StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native";
import { AppContext } from '../Context/AppContext';
import PageLoading from "../components/Loader/PageLoding";
const { width } = Dimensions.get('window');
export default function HomeScreen({ route, navigation }) {

  const { deviceId, handleLogout, setUserLoggedIn, Urls, postData, Toast, user } = useContext(AppContext);
  // console.log(deviceId)
   
  const [socket, setSocket] = useState(null);
  const [incomingData, setIncomingData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
   
 
  // Ref to keep track of sound instance 
  const soundRef = useRef(null);

  const types = [
    { id: 0, text: "New" }, 
    { id: 1, text: "Called" },    
  ]; 
 
  
  useEffect(() => {
    const serverIp = 'http://145.223.18.56:3003'; 
    // const serverIp = 'http://localhost:3003'; 
    // const newSocket = io(serverIp);
     

    const newSocket = io(serverIp, {
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: true, // ✅ important for self-signed cert
    });

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

  const handleCall = async (id,phone) => {

    stopSound(); // stop sound when call starts
    if (phone) {
      Linking.openURL(`tel:${phone}`);
      setModalVisible(false);
    }

    if(id){
      const filedata = {id:id};
      const response = await postData(filedata, Urls.leadScretch,"POST",1,1);
      if(response.status==200)
      {
        setPage(0);
        fetchdata()
      }
    }
  };

  const [isOnline, setIsOnline] = useState(user.is_online);

  const toggleStatus = async () => {  
    
    const response = await postData({employee_id:user.id}, Urls.online_offline,"POST");
    if(response.status==200)
    {      
      setIsOnline(response.data.is_online);
    }
  };


  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [paidunpaid, setpaidunpaid] = useState();
  const [selectedStatus, setSelectedStatus] = useState('All');

  const options = [
    { label: "All", value: false },
    { label: "Paid", value: 1 },
    { label: "Unpaid", value: 0 },
  ];

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (item) => {
    setSelectedStatus(item.label);
    setpaidunpaid(item.value);
    setIsDropdownVisible(false);
  };
 

  const [typingTimeout, setTypingTimeout] = useState(null);
  const [search, setsearch] = useState('');
  const [page, setPage] = useState(0);
  const [type, settype] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setdata] = useState([]);
  const onRefresh = useCallback(() => {
    setPage(0);
    setRefreshing(true);
    setRefreshing(false); 
    fetchdata(); 
  }, [type, page, paidunpaid]);
  const handleTyping = (value) => {
    setsearch(value);

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout (e.g., 1 second)
    const timeout = setTimeout(() => {
          onTypingStopped(value);
      }, 500);
      setTypingTimeout(timeout);
    };
    const onTypingStopped = (value) => {
      console.log("User stopped typing. Final value:", value);
      setPage(0);
      fetchdata();
  };
  
    const fetchdata = async () => {
        const filedata = {
          page:page,
          search:search,
          type:type,
          paidunpaid:paidunpaid,
        };
      const response = await postData(filedata, Urls.lead,"GET",0,1);
      if(response.status==200)
      {
        const data = response.data;
        setdata(prevPosts => page === 0 ? data : [...prevPosts, ...data]); 
        setisLoading(false);
      }
    };  
    
  const handleLoadMore = () => {
    setPage(page + 1);      
  }; 
  useEffect(() => {
    fetchdata()
  }, [type, page, paidunpaid]);
  if (isLoading) {
    return (
        <PageLoading />          
    );
  }





  
  return (
    <View flex={1}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>            
          <Image
            source={require('../assets/img/logo.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.headerRight}>
          {/* Online/Offline toggle */}
          <TouchableOpacity 
            style={[styles.statusBtn, { backgroundColor: isOnline ? colors.primary : "#FF3B30" }]}
            onPress={toggleStatus}
          >
            <View style={styles.statusDotContainer}>
              <View style={[styles.statusDot, { backgroundColor: isOnline ? "#00FF00" : "#FF0000" }]} />
            </View>
            <Text style={styles.statusText}>{isOnline ? "Online" : "Offline"}</Text>
          </TouchableOpacity>

          {/* Logout icon */}
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="log-out-outline" style={styles.menu} />
          </TouchableOpacity>
        </View>
      </View>


      <ScrollView style={[appstyles.container, {paddingTop:5}]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const paddingToBottom = 100; // pixel threshold before bottom
        if (
          layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom
        ) {
          handleLoadMore(); // call when near bottom
        }
      }}
      scrollEventThrottle={400}
      >
        
        {/* <Text style={appstyles.brand}>Contact Numbers</Text> */}

        {/* Tabs */}
        <View style={[styles.row, {alignItems:'center', justifyContent:'space-between'}]}>
            <View style={[styles.col6, {width:'65%'}]}>
              <View style={styles.tabContainer}>
                  {types.map((tab) => (
                    <TouchableOpacity
                      key={tab.id} 
                      style={[styles.tab, type === tab.id && styles.activeTab]}
                      onPress={() => {settype(tab.id);setPage(0);}}
                    >
                      <Text style={[styles.tabText, type === tab.id && styles.activeTabText]}>
                        {tab.text}
                      </Text>
                    </TouchableOpacity>
                  ))} 
              </View>
            </View>
            <View style={[styles.col6, {width:'30%'}]}>
              <View>
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    style={[styles.tab]}
                    onPress={toggleDropdown}
                  >
                    <Text style={[styles.tabText]}>
                      <Text style={styles.tabText}>{selectedStatus}</Text>
                    </Text>
                  </TouchableOpacity>
                </View>

                {isDropdownVisible && (
                  <View style={styles.dropdownBox}>
                    {options.map((item) => (
                      <TouchableOpacity
                        key={item.value.toString()}
                        style={styles.dropdownItem}
                        onPress={() => handleSelect(item)}
                      >
                        <Text style={styles.dropdownText}>{item.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>



        <TextInput
            placeholder="Search Keyword..."
            value={search}
            onChangeText={handleTyping}
            keyboardType="default"
            style={[appstyles.input]}
          />


            
            <View style={{ paddingBottom: 20 }}>
              {data.map((item, index) => (
                <View            
                  key={`${item.id}-${index}`}
                  style={appstyles.card}
                >
                  <View style={[styles.row]}>
                    
                    <View style={[styles.col8]}> 
                      <View style={[styles.col12]}> 
                        <Text style={[{ marginLeft: 0 }]}>{item.name}</Text>

                        {/* Email clickable */}
                        {item.email ? (
                          <Text
                            style={[{ marginLeft: 0, color: colors.primary }]}
                            onPress={() => Linking.openURL(`mailto:${item.email}`)}
                          >
                            {item.email}
                          </Text>
                        ) : null}
                      </View>
                      <View style={[styles.col12]}>
                        <Text style={[{ marginLeft: 0, },styles.phone]}>{item.phone}</Text>
                      </View>
                      <View style={[styles.col12]}>
                        <Text style={[{ marginLeft: 0, },styles.status_text,
                        {backgroundColor:item.leadStatus==1?'lightgreen':'red'}

                        ]}>{item.status_text}</Text>
                      </View>
                    </View>

                    <View style={[styles.col4]}>                    
                      {/* Call Icon */}
                      <TouchableOpacity onPress={() => handleCall(item.id, item.phone)}>
                        <Icon name="call-outline"
                          style={[styles.iconCall]}
                          color={colors.white} 
                        />
                      </TouchableOpacity> 

                      {/* WhatsApp Icon */}
                      {item.phone ? (
                        <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${item.phone}`)}>
                          <Icon name="logo-whatsapp"
                            style={[styles.iconCallWhatsApp]}
                            color="white"
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>

                  </View>
                </View>
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
              <Text style={[{ marginLeft: 0, },styles.status_text,
                {backgroundColor:incomingData?.leadStatus==1?'lightgreen':'red'}

                ]}>{incomingData?.status_text}</Text>

              <View style={[appstyles.modalActions, styles.row]}>
                <TouchableOpacity  onPress={() => handleCall(incomingData?.id, incomingData?.phone)}>
                  <Icon name="call" 
                  style={[styles.iconCall]}
                  color={colors.white} 
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    stopSound(); // stop sound when modal closes
                    setModalVisible(false);
                  }}
                >
                  <Icon name="call" 
                  style={[styles.iconCallRed]}
                  color={colors.white}  
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  ); 
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: colors.background 
  },

  // 🔹 Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.black,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  headerLeft: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  logo: { 
    width: 150, 
    height: 45, 
    resizeMode: 'contain',
  },
  menu: {
    fontSize: 28,
    color: colors.white,
  },
  iconCall:{
    backgroundColor:'lightgreen',
    fontSize:30,
    borderRadius:50,
    padding:5,
    width:45,
    height:45,
    borderWidth:2,
    borderColor:'lightgray'
  },
  iconCallRed:{
    backgroundColor:'red', 
    fontSize:35, 
    borderRadius:50,
    padding:5,
    width:50,
    height:50,
    borderWidth:2,
    borderColor:'lightgray'
  },
  iconCallWhatsApp: {
    backgroundColor: '#25D366', // WhatsApp green
    fontSize: 30,
    borderRadius: 50,
    padding: 5,
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: 'lightgray',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop:5
  },


  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  
  statusBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  
  statusDotContainer: {
    width: 10,
    height: 10,
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  
  statusText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 13,
  },

  status_text:{
    backgroundColor:'green',
    width:80,
    color:'white',
    textAlign:'center',
    borderRadius:5
  },


  

  // 🔹 Tabs
  tabContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    backgroundColor: '#EEE',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 5,
  },
  tab: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeTab: { 
    backgroundColor: colors.primary,
  },
  tabText: { 
    color: colors.grey, 
    fontWeight: '600',
    fontSize: 15,
  },
  activeTabText: { 
    color: colors.white,
    fontWeight: '700',
  },



  dropdownBox: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 120,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownText: {
    color: "#333",
    fontSize: 14,
  },
  



  // 🔹 List Rows
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  col8: {
    width: '85%',
  },
  col4: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  col12: {
    width: '100%',
  },
  col6: {
    width: '50%',
  },
  phone: {
    fontSize: 18,
    textAlign: 'left',
    color: colors.primaryDark,
    fontWeight: '600',
    marginTop: 4,
  },

  // 🔹 ScrollView Padding
  content: {
    paddingBottom: 30,
  },

  // 🔹 Empty State / Bottom Padding
  emptyText: {
    textAlign: 'center',
    color: colors.grey,
    fontSize: 15,
    marginTop: 30,
  },
});
