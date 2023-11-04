import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigation';
import MortgageCalculator from './MortgageCalculator'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeDrawer">
        <Stack.Screen name="HomeDrawer"
          component={DrawerNavigator}
          options={{ headerShown: false }} />
        <Stack.Screen 
          name="MortgageCalculator" 
          component={MortgageCalculator} 
          options={{ title: 'Mortgage Calculator' }} />
        {/* Add more Stack.Screen here if you have other routes */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
