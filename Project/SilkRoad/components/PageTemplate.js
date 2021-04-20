import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
// import { Components Here } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Template = ({ navigation }) => {
  return(
    <View>
      <Text>Hello World</Text>
    </View>
  );
}

export default Template;