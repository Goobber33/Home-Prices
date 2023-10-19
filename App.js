import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeDrawer">
        <Stack.Screen name="HomeDrawer"
          component={DrawerNavigator}
          options={{ headerShown: false }} />
        {/* Add more Stack.Screen here if you have other routes */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
