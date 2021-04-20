import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert, ScrollView, SafeAreaView, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search';
import ItemList from './ItemList';
import { getUsername, storeUsername } from './functions/asyncStorage';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>This is the Home Screen</Text>
      <Button
        title="I want to Borrow"
        style={{
          height: 500,
        }}
        onPress={() => navigation.navigate('Borrow')}
      />
      <Button
        title="I want to Lend"
        onPress={() => navigation.navigate('Lend')}
      />
    </View>
  );
}

function BorrowScreen({ navigation }) {
  
  return (

    <View>
      <View>
        <Text>This is the Borrow Screen</Text>
        <View style={styles.topBar}></View>
        <Search></Search>
      </View>

      <ScrollView>
        <View style={styles.itemScroll}>
          <ItemList trade_type = 'borrow'/>
        </View>

      </ScrollView>

      <View style={styles.bottomButtons}>
        <Button title="Borrow" style={styles.borrowButton} onPress={() => navigation.push('Borrow')} />
        <Button title="Lend" style={styles.lendButton} onPress={() => navigation.push('Lend')} />
      </View>
      
    </View>
  );
}

function LendScreen({ navigation }) {
  return (

    <View style={styles.container}>
      <Text>This is the Lend Screen</Text>
      <View style={styles.topBar}></View>
      <Search></Search>

      <ScrollView>
        <View style={styles.itemScroll}>
          <ItemList trade_type = 'lend'/>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <Button title="Borrow" style={styles.borrowButton} onPress={() => navigation.push('Borrow')} />
        <Button title="Lend" style={styles.lendButton} onPress={() => navigation.push('Lend')} />
      </View>
      
    </View>

  );
}

function SignInScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => {
        storeUsername(username);
        navigation.navigate('Login');
        }} />
    </View>
  );
}

export { HomeScreen, BorrowScreen, LendScreen, SignInScreen };

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: '1',
    
    backgroundColor: '#fff',
  },

  topBar: {
    height: 100,
    width: '100%',
    backgroundColor: '#9AC9FF',
  },

  bottomBar: {
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFF6E9'
  },

  items: {
    flex: 1,
    display: 'flex',

  },

  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    margin: 1,
    height: 150,
    width: 150,
    backgroundColor: 'gray'
  },

  profilePicture: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    borderRadius: 30
  },

  addBox: {
    position: 'absolute',
    bottom: 0,
    left: '37%',
    height: 100,
    width: 100,
    backgroundColor: '#FFEFD7'
  },

  bottomButtons: {
    display: 'flex',
    position: 'sticky',
    bottom: '0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

  },

  borrowButton: {
    width: '100%',
    backgroundColor: 'blue',
    border: '1px solid black',
  },

  lendButton: {
    
    backgroundColor: 'yellow',
    border: '1px solid green',
  },

  itemScroll: {
    overflow: 'scroll',
  }

});