import React, { useState } from 'react';
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
import { navigationRef } from '../navigators/RootNavigator';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('info@adminuiux');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
 
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
        <Text style={appstyles.welcome}>Create Account,</Text>
        <Text style={appstyles.brand}>Shivveda</Text>

        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={appstyles.input}
        />

        <TextInput
          placeholder="Mobile"
          keyboardType="phone-pad"
          autoCapitalize="none"
          style={appstyles.input}
        />

        <View style={appstyles.passwordRow}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            style={[appstyles.input, { flex: 1 }]}
          />
          <TouchableOpacity
            style={appstyles.eyeButton}
            onPress={() => setShowPass(!showPass)}
          >
            <Text style={appstyles.eyeIcon}>{showPass ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <View style={appstyles.passwordRow}>
          <TextInput
            placeholder="Confirm Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            style={[appstyles.input, { flex: 1 }]}
          />
          <TouchableOpacity
            style={appstyles.eyeButton}
            onPress={() => setShowPass(!showPass)}
          >
            <Text style={appstyles.eyeIcon}>{showPass ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={appstyles.loginBtn}>
          <Text style={appstyles.loginBtnText}>Signup</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <Text style={appstyles.signupText}>
          Have you account?{' '}
          <Text style={appstyles.link} onPress={()=>navigation.navigate('Login')}>Login</Text>
        </Text>

      

      </View>
    </ScrollView>
   
  );
}
