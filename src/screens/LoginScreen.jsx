import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ToastAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../redux/userSlice';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      dispatch(login({email, password}));
      navigation.replace('ProductList');
    } else {
      Alert.alert('Error', 'Please enter both email and password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Image
            source={require('../assets/person.png')}
            style={styles.loginImage}
          />
          <Text style={styles.title}>Login in</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordWrapper}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                style={styles.input}
                value={password}
                secureTextEntry={secure}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setSecure(!secure)}>
                <Image
                  style={styles.iconImage}
                  source={
                    secure
                      ? require('../assets/closeeye.png')
                      : require('../assets/eye.png')
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              ToastAndroid.show(
                'Open forget password screen',
                ToastAndroid.SHORT,
              );
            }}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Don’t have an account?
            <Text
              style={styles.signupLink}
              onPress={() =>
                ToastAndroid.show('Open sign up screen', ToastAndroid.SHORT)
              }>
              {' '}
              Sign up
            </Text>
          </Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              onPress={() =>
                ToastAndroid.show(
                  'Authenticate with facebook',
                  ToastAndroid.SHORT,
                )
              }>
              <Image
                source={require('../assets/facebook.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                ToastAndroid.show(
                  'Authenticate with google',
                  ToastAndroid.SHORT,
                )
              }>
              <Image
                source={require('../assets/google.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const violet = '#6a0dad';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  loginImage: {
    height: 120,
    width: 120,
    marginBottom: 20,
  },
  iconImage: {
    width: 20,
    height: 20,
    tintColor: '#999',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    color: violet,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  passwordWrapper: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 14,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 25,
    color: violet,
    fontSize: 14,
  },
  button: {
    backgroundColor: violet,
    paddingVertical: 14,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#999',
    fontSize: 14,
  },
  signupLink: {
    color: violet,
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 15,
  },
  socialIcon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
});
