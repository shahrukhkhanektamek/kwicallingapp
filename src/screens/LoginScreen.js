import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';

import appstyles from "../assets/app";

import { AppContext } from "../Context/AppContext";

export default function LoginScreen({navigation}) {

  const { setUserLoggedIn, Urls, postData, Toast } = useContext(AppContext);

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);


  const handleLogin = async () => {
      if (!username || !password) {
        Toast.show({ type: "error", text1: 'Please enter username and password' })
        return;
      }
      const filedata = {
        "username":username,
        "password":password,
      };
    const response = await postData(filedata, Urls.login,"POST");
    if(response.action=='login')
    {
      setUserLoggedIn(true);
    }
  };


 
  return (
    
    <ScrollView contentContainerStyle={appstyles.container}>
      {/* Logo + Title */}
      <View style={appstyles.logoHeader}>
        <Image
          source={require('../assets/img/logo.png')}
          style={appstyles.logo}
        />
      </View>

      {/* Login Box */}
      <View style={appstyles.card}>
        <Text style={appstyles.welcome}>Welcome to,</Text>
        <Text style={appstyles.brand}>Shivveda</Text>

        <TextInput
          placeholder="Mobile Number"
          value={username}
          onChangeText={setusername}
          keyboardType="default"
          autoCapitalize="none"
          style={appstyles.input}
        />

        <View style={appstyles.passwordRow}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            style={[appstyles.input, { width:'100%' }]}
          />
          <TouchableOpacity
            style={appstyles.eyeButton}
            onPress={() => setShowPass(!showPass)}
          >
            <Text style={appstyles.eyeIcon}>{showPass ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>


        {/* Login Button */} 
        <TouchableOpacity style={appstyles.loginBtn} onPress={handleLogin}>
          <Text style={appstyles.loginBtnText}>Login</Text>
        </TouchableOpacity>

       
      

      </View>
    </ScrollView>
   
  );
}
