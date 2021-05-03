import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert, ScrollView, SafeAreaView, TextInput, Image, KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search';
import ItemList from './ItemList';
import TopBar from './TopBar';
import MailList from './MailList'
import { getUuid, storeUuid, logOff } from './functions/asyncStorage';
import { useEffect } from 'react/cjs/react.development';
import ItemAdd from './ItemAdd';
import { Searchbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'


const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.bodyOfBigButtons}>
      <TopBar/>
      <View style={styles.bigButtonContainer}>
        
        <TouchableOpacity
          style={styles.bigButton, styles.borrowingColor}
          onPress={() => navigation.navigate('Borrow')}
  
        >
          <Text style={styles.bigButtonText}>I want to Borrow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bigButton, styles.lendingColor}
          onPress={() => navigation.navigate('Lend')}
         
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

    <View style={styles.container}>
    
      <TopBar type={"borrow"}/>

      
        
      <View style={styles.search}>
        <Searchbar
          placeholder="Search for Item"
          onChangeText={setQuery}
          value={query}
        />
      </View>

      <Text style={{textAlign: "center", fontFamily: "Verdana", paddingTop: 5, fontSize: 18}}>Here's what people are offering:</Text>

      <ScrollView>
        <View style={styles.itemScroll}>
          <ItemList trade_type={"lend"} query={query}/>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={() => navigation.push('Borrow')}>
          <Text style = {[styles.borrowButton, styles.bottomButtonText]}>Borrow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('Post Item', {trade_type: "borrow"})}>
          <Text style = {[styles.addItemButton, styles.bottomButtonText]}>Post offer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('Lend')}>
          <Text style = {[styles.lendButton, styles.bottomButtonText]}>Lend</Text>
        </TouchableOpacity>
      </View>
      
    </View>

  );
}

function LendScreen({ navigation }) {

  const [query, setQuery] = useState("");

  return (

    <View style={styles.container}>
      
      


      <ScrollView
        stickyHeaderIndices={[0]}
      >

        <TopBar type={"lend"}/>

        <View style={styles.search}>
          <Searchbar
            placeholder="Search for Item"
            onChangeText={setQuery}
            value={query}
          />
        </View>

        <Text style={{textAlign: "center", fontFamily: "Verdana", paddingTop: 5, fontSize: 18}}>Here's what people are looking for:</Text>

        <View style={styles.itemScroll}>
          <ItemList trade_type={"borrow"} query={query}/>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={() => navigation.push('Borrow')}>
          <Text style = {[styles.borrowButton, styles.bottomButtonText]}>Borrow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('Post Item', {trade_type: "borrow"})}>
          <Text style = {[styles.addItemButton, styles.bottomButtonText]}>Post offer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('Lend')}>
          <Text style = {[styles.lendButton, styles.bottomButtonText]}>Lend</Text>
        </TouchableOpacity>
      </View>
      
    </View>

  );
}

function MailScreen({ navigation }) {
  const [userUuid, setUserUuid] = useState(null);

  useEffect(() => {
    getUuid()
    .then(result => {
      setUserUuid(result.replace(/\"/g, ''));
    })
  }, [])

  return (
    <View style={styles.container} key={userUuid}>
      <TopBar/>
      <MailList mail_type={"incoming"} uuid={userUuid}/>
      <MailList mail_type={"outgoing"} uuid={userUuid}/>
    </View>
  )
}

function AddItemScreen({ navigation, route }) {

  const {trade_type} = route.params;

  return (
    <View style={styles.container}>
      <TopBar type={trade_type == 'lend' ? 'borrow' : 'lend'}/>
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

    <KeyboardAvoidingView behavior="padding">
      
      
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/SilkRoadDark.png')}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="rgba(180,180,180,1)"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter password"
          secureTextEntry
          placeholderTextColor="rgba(180,180,180,1)"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.loginButtons}>
          <Button
            title = "Log In"
            onPress={() => {
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
              }}
          />
        </View>
        <View  style={styles.loginButtons}>
          <Button
            title={"Register"}
            onPress={() => {navigation.navigate("Register")}}
          />
        </View>
        <Text>{errorText}</Text>
      </View>
      

      <Button title="SKIP THIS" onPress={() => {
          storeUuid("18715ca3-dab8-494b-8583-b94c57cd10e7");
          navigation.navigate('Login');
        }} />

    </KeyboardAvoidingView>
  );
}

function RegistrationScreen({ navigation }) {

  <View>
      <View style={styles.topBar}></View>
  </View>

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
        placeholderTextColor="rgba(180,180,180,1)"
        style={styles.input}
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="rgba(180,180,180,1)"
        style={styles.input}
      />
      <TextInput
        placeholder="Second Name"
        value={secondName}
        onChangeText={setSecondName}placeholderTextColor="rgba(180,180,180,1)"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="rgba(180,180,180,1)"
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.submitContainer}
        onPress={() => {
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
          }}
      >
        <Text>Register</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    bottom: '0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  bottomButtonText: {
    fontSize: 18,
    textShadowRadius: 10,
    textShadowOffset: { width: 3, height: 3 },
    textShadowColor: "#878787",
  },

  borrowButton: {
    padding: "5px",
    flex: 2,
    backgroundColor: '#D2E7FF',
    border: '1px solid black',
    borderTopRightRadius: 10,
  },

  addItemButton: {
    padding: "5px",
    backgroundColor: '#9AC9FF',
    flex: 1,
    border: '1px solid black',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },

  lendButton: {
    padding: "5px",
    flex: 2,
    backgroundColor: '#FFEFD7',
    border: '1px solid black',
    borderTopLeftRadius: 10
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

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    height: 220,
    width: "100%",
    backgroundColor: "#212729"

  },

  logo: {
    width: 335,
    height: 220
  },

  loginButtons: {
    padding: 5
  },

  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,1)',
    marginBottom: 20,
    paddingHorizontal: 10
  },

  inputContainer: {
    padding: 20
  },

  submitContainer: {
    textAlign: 'center'
  },
  
  search: {
    padding: "10px"
  }
});