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
import { Searchbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'


const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.bodyOfBigButtons}>
      <TouchableOpacity onPress={()=>{navigation.toggleDrawer()}}>
          <Image source={require("./../assets/drawer.png")}
                  style={{width: 50, height: 50}}/>
      </TouchableOpacity>
      <View style={styles.bigButtonContainer}>
        
        <TouchableOpacity
          style={styles.bigButton, styles.borrowingColor}
          onPress={() => navigation.navigate('Borrow')}
  
        >
          <Text style={styles.bigButtonText}>I want to Borrow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bigButton, styles.lendingColor}
          onPress={() => navigation.navigate('Borrow')}
         
        >
          <Text style={styles.bigButtonText}>I want to Lend</Text>
        </TouchableOpacity>


      </View>  
      
    </View>
  );
}

function BorrowScreen({ navigation }) {

  const [query, setQuery] = useState("");

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
      <Searchbar
        placeholder="Search for Item"
        onChangeText={setQuery}
        value={query}
      />

      <ScrollView>
        <View style={styles.itemScroll}>
          <ItemList trade_type={"borrow"} query={query}/>
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

  const [query, setQuery] = useState("");

  return (

    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{navigation.toggleDrawer()}}>
          <Image source={require("./../assets/drawer.png")}
                  style={{width: 50, height: 50}}/>
      </TouchableOpacity>
      <Text>This is the Lend Screen</Text>
      <View style={[styles.topBar, styles.lendingColor]}></View>
      <View style = {styles.topElements}>
        <Button title="Mail" onPress={() => navigation.push('Mail')} />
        <Button title="AddItem" onPress={() => navigation.push('AddItem', {trade_type: "lend"})} />
      </View>
      
      <Searchbar
        placeholder="Search for Item"
        onChangeText={setQuery}
        value={query}
      />

      <ScrollView>
        <View style={styles.itemScroll}>
          <ItemList trade_type={"lend"} query={query}/>
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
  },

  bigButton: {
    width: '10%',
    
  },

  borrowingColor: {
    backgroundColor: '#D2E7FF'
  },

  lendingColor: {
    backgroundColor: '#FFEFD7'
  },

  bodyOfBigButtons: {
   
    display: 'flex',
    height: '90vh',
  },

  bigButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
   
    justifyContent: 'space-around',
    margin: '5%',
    textAlign: 'center',
    borderRadius: '50px',
  },

  bigButtonText: {
    fontSize: 50,
    padding: '10%',
     
  },

  topElements: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },


});