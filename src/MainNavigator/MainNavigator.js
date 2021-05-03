import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Capture from '../Screens/Capture';
import Gallery from '../Screens/Gallery';

const Stack = createStackNavigator();
export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Capture}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Capture" component={Capture} />
        <Stack.Screen name="Gallery" component={Gallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
