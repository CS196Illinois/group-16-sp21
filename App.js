import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert, ScrollView, SafeAreaView } from "react-native";
import Item from './components/Item';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './components/Search';
import ItemList from './components/ItemList'


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
          <View style = {styles.topElements}>
            <Button title="Mail" onPress={() => navigation.push('Mail')} />
            <Button title="AddItem" onPress={() => navigation.push('AddItem')} />
          </View>
        

        
        
      </View>
      <Search></Search>

      <ScrollView>
        <View style={styles.itemScroll}>
          <ItemList/>
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
      <View style={[styles.topBar, styles.lendColor]}></View>
      <View style = {styles.topElements}>
        <Button title="Mail" onPress={() => navigation.push('Mail')} />
        <Button title="AddItem" onPress={() => navigation.push('AddItem')} />
      </View>
      
      <Search></Search>

      <ScrollView>
        <View style={styles.itemScroll}>
          <ItemList/>
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

function AddItemScreen ({navigation}) {
  return (
    <View style={styles.container}>
      
      <Text>This is the Add new Items Screen</Text>
    </View>

    
  )
}


const Stack = createStackNavigator();



export default function App() {

  return (


    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Borrow" component={BorrowScreen} />
          <Stack.Screen name="Lend" component={LendScreen} />
          <Stack.Screen name="Mail" component = {MailScreen} />
          <Stack.Screen name='AddItem' component = {AddItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <ScrollView>
        <View style={styles.topBar}></View>

        <View style={styles.items}>
          <View style={styles.images}></View>
          <View style={styles.images}></View>
          <View style={styles.images}></View>
          <View style={styles.images}></View>
        </View>

      </ScrollView>

      <StatusBar style="auto" />
      <View style={styles.bottomButtons}>
        <Button title="Borrow" onPress={() => Alert.alert('Going to Borrow Page')} />
        <Button title="Lend" onPress={() => Alert.alert('Going to Lend Page')} />
      </View> */}
    </View>




  );

};



const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: '1',
    
    backgroundColor: '#fff',
  },

  topBar: {
    height: 100,
    width: '100%',
    position: 'absolute',
    top: 0,
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
    color: 'blue',
    border: '1px solid black',
  },

  lendButton: {
    color: 'yellow',
    border: '1px solid green',
  },

  borrowColor: {
    backgroundColor: '#9AC9FF'
  },

  lendColor: {
    backgroundColor: '#FFEFD7'
  },

  itemScroll: {
    overflow: 'scroll',
  },

  topElements: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: 0,
  }

});
