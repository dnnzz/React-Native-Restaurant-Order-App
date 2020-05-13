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
import Home from './src/Home';
import Menu from './src/Menu';
const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      activeTintColor:"tomato"
    }}>
      <Tab.Screen name="Bilgilerim" component={Home} />
      <Tab.Screen name="Menü" component={Menu} />
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