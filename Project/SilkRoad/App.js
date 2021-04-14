import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert, ScrollView, SafeAreaView } from "react-native";
import Item from './components/Item';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './components/Search';


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
  var items = [];
  for (let i = 0; i < 4; ++i) {
    items.push(i);
  }

  
  return (

    <View>
      <View>
        <Text>This is the Borrow Screen</Text>
        <View style={styles.topBar}></View>

        <Search></Search>
      </View>

      <ScrollView>
        <View style={styles.itemScroll}>
          {items.map((item, index) => {
            return <Item id={index} username="BillNye123" name="Bag of Doritos" description="Description" duration="5 weeks" ></Item>
          })}
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

      

      <View style={styles.bottomButtons}>
        <Button title="Borrow" style={styles.borrowButton} onPress={() => navigation.push('Borrow')} />
        <Button title="Lend" style={styles.lendButton} onPress={() => navigation.push('Lend')} />
      </View>
      
    </View>

  );
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
