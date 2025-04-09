import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import { login } from '../redux/userSlice';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      dispatch(login({name: email}));
      navigation.replace('ProductList');
    } else {
      Alert.alert('Error', 'Email and Password are required!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.inner}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
          }}
          style={styles.avatar}
        />
        <Text style={styles.title}>Welcome Back!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.signup}>Sign up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
  },
  inner: {
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#007bff',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  signup: {
    color: '#007bff',
    fontWeight: '600',
  },
});
