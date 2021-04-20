import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageTemplate from './components/PageTemplate';
import { getUsername, storeUsername, logOff } from './components/functions/asyncStorage';
import { HomeScreen, BorrowScreen, LendScreen, SignInScreen } from './components/Screens';
import { useEffect } from 'react';

const Stack = createStackNavigator();
export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [effect, setEffect] = useState(true);

  useEffect(() => {
    // logOff();
    getUsername()
    .then(result => {
        if (result != null) {
          setUserToken(result);
        } else {
          setUserToken(null);
        }
    }, []);
    setEffect(false);
  }, [effect]);

  if (userToken != null) {
    return (

      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Borrow" component={BorrowScreen} />
            <Stack.Screen name="Lend" component={LendScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <NavigationContainer 
        onStateChange = {() => {setEffect(true); console.log("YOOO!")}}
        >
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={SignInScreen} />
            <Stack.Screen name="Register" component={PageTemplate} />
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