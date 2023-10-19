import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './home';


const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} options={{ title: '' }} />

    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
