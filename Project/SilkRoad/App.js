// When you're ready.
// I am.

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PageTemplate from './components/PageTemplate';
import { getUuid, storeUuid, logOff } from './components/functions/asyncStorage';
import { HomeScreen, BorrowScreen, LendScreen, MailScreen, AddItemScreen, SignInScreen, RegistrationScreen } from './components/Screens';
import { useEffect } from 'react';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Main() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Borrow" component={BorrowScreen} />
      <Stack.Screen name="Lend" component={LendScreen} />
      <Stack.Screen name="Mail" component = {MailScreen} />
      <Stack.Screen name='Post Item' component = {AddItemScreen}  />
    </Stack.Navigator>
  );
}

function Activity() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Mail" component = {MailScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  const [uuid, setUuid] = useState(null);
  const [effect, setEffect] = useState(true);

  useEffect(() => {
    getUuid()
    .then(result => {
        if (result != null) {
          setUuid(result);
        } else {
          setUuid(null);
        }
    }, []);
    setEffect(false);
  }, [effect]);

  if (uuid != null) {
    return (
    
      <View style={styles.container}>
        <NavigationContainer onStateChange = {() => {setEffect(true)}}>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Main}/>
            <Drawer.Screen name="Activity" component={Activity}/>
            <Drawer.Screen name="Log out" component={SignInScreen} styles={{color:"#FF0000"}}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <NavigationContainer onStateChange = {() => {setEffect(true)}}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={SignInScreen} />
            <Stack.Screen name="Register" component={RegistrationScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
  }
  
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: '1',
    
    backgroundColor: '#fff',
  }
});