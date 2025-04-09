import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import store from '../redux/store';
import ProductListScreen from '../screens/ProductListScreen';

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
            options={{headerShown: true, title: 'Product List'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigation;
