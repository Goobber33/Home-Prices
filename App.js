import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';  // Make sure to put the correct path to your Home.js file

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        {/* Add more Stack.Screen here if you have other routes */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
