/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Home';
import Menu from './src/Menu';
import Basket from './src/Basket';
import Order from './src/Order';
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Bilgilerim" component={Home} />
      <HomeStack.Screen name="Menü" component={Menu} />
      <HomeStack.Screen name="Sepet" component={Basket} />
    </HomeStack.Navigator>
  );
}

const MenuStack = createStackNavigator();
function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen name="Menü" component={Menu} />
      <MenuStack.Screen name="Sepet" component={Basket} />
      <MenuStack.Screen name="Bilgilerim" component={Home} />
      <MenuStack.Screen name="Sipariş" component={Order} />
    </MenuStack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor:"tomato"
    }}>
      <Tab.Screen name="Bilgilerim" component={Home} />
      <Tab.Screen name="Menü" component={MenuStackScreen} />
      <Tab.Screen name="Sepet" component={Basket} />
    </Tab.Navigator>
    
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

console.disableYellowBox = true;