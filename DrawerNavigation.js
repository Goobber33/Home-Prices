import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './home';
import MortgageCalculator from './MortgageCalculator'; // Import the MortgageCalculator component

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: 'black',  // Color for the active link
        drawerInactiveTintColor: 'gray', // Color for the inactive link
        drawerActiveBackgroundColor: 'white',  // Background color for the active link
        drawerStyle: { marginVertical: 5 },
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Drawer.Screen 
        name="MortgageCalculator" 
        component={MortgageCalculator} 
        options={{ title: 'Mortgage Calculator' }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
