import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert, ScrollView, SafeAreaView, TextInput, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search';
import ItemList from './ItemList';
import { getUuid, storeUuid, logOff } from './functions/asyncStorage';
import { useEffect } from 'react/cjs/react.development';
import ItemAdd from './ItemAdd';
import { useIsFocused } from '@react-navigation/native'


const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View>
      <TouchableOpacity onPress={()=>{navigation.toggleDrawer()}}>
          <Image source={require("./../assets/drawer.png")}
                  style={{width: 50, height: 50}}/>
      </TouchableOpacity>
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

  const callbackFunction = (childData) => {
    console.log(childData);
  }

  return (

    <View>
      <TouchableOpacity onPress={()=>{navigation.toggleDrawer()}}>
          <Image source={require("./../assets/drawer.png")}
                  style={{width: 50, height: 50}}/>
      </TouchableOpacity>
      <View>
        <Text>This is the Borrow Screen</Text>
        <View style={styles.topBar}></View>
          <View style = {styles.topElements}>
            <Button title="Mail" onPress={() => navigation.push('Mail')} />
            <Button title="AddItem" onPress={() => navigation.push('AddItem', {trade_type: "borrow"})} />
          </View>
        

        
        
      </View>
      <Search parentCallback = {callbackFunction}/>

      <ScrollView>
        <View style={styles.itemScroll}>
          <ItemList trade_type={"borrow"}/>
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
      <TouchableOpacity onPress={()=>{navigation.toggleDrawer()}}>
          <Image source={require("./../assets/drawer.png")}
                  style={{width: 50, height: 50}}/>
      </TouchableOpacity>
      <Text>This is the Lend Screen</Text>
      <View style={[styles.topBar, styles.lendColor]}></View>
      <View style = {styles.topElements}>
        <Button title="Mail" onPress={() => navigation.push('Mail')} />
        <Button title="AddItem" onPress={() => navigation.push('AddItem', {trade_type: "lend"})} />
      </View>
      
      <Search/>

      <ScrollView>
        <View style={styles.itemScroll}>
          <ItemList trade_type={"lend"}/>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <Button title="Borrow" style={styles.borrowButton} onPress={() => navigation.push('Borrow')} />
        <Button title="Lend" style={styles.lendButton} onPress={() => navigation.push('Lend')} />
      </View>
      
    </View>

  );
}

function MailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text> This is the Mail Screen</Text>

    </View>
  )
}

function AddItemScreen({ navigation, route }) {

  const {trade_type} = route.params;

  return (
    <View style={styles.container}>
      
      <Text>This is the Add new Items Screen</Text>
      <ItemAdd trade_type={trade_type}/>
    </View>

    
  )
}


function SignInScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText]= useState('');

  useEffect(() => {
    logOff();
  }, [])

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => {

        fetch('http://127.0.0.1:5000/login',
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                email: email,
                                password: password
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    )
                    .then(response => {
                      if (response.status == 200) {
                        return response.text();
                      } else {
                        setErrorText("Wrong email or password");
                        throw new Error("hey");
                      }
                    })
                    .then(text => {storeUuid(text); navigation.navigate('Login');})
                    .catch(error => {console.log(errorText)})
        }} />
        <Text>{errorText}</Text>
        <Button title="Register" onPress={() => {navigation.navigate("Register")}}/>
        <Button title="SKIP THIS" onPress={() => {
          storeUuid("hi!");
          navigation.navigate('Login');
        }} />
        <Text>{errorText}</Text>
    </View>

  );
}

function RegistrationScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [password, setPassword] = useState('');

  


  useEffect(() => {
    logOff();
  }, [])

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Second Name"
        value={secondName}
        onChangeText={setSecondName}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={() => {
        fetch('http://127.0.0.1:5000/register',
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                email: email,
                                firstName: firstName,
                                secondName: secondName,
                                password: password
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    ).then(response => {console.log(response)})

        navigation.navigate('Login');
        }} />
    </View>
  );
}

export { HomeScreen, BorrowScreen, LendScreen, SignInScreen, RegistrationScreen, MailScreen, AddItemScreen };

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