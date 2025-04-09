import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from '../redux/store';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {Image, TouchableOpacity} from 'react-native';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={({navigation}) => ({
              title: 'Products List',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/9219/9219671.png',
                    }}
                    style={{width: 24, height: 24, marginRight: 15}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerShown: true,
              title: 'Your Cart',
            }}
          />

          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailScreen}
            options={{headerShown: true, title: 'Product Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigation;
