import 'react-native-gesture-handler';
import React from 'react';
import { View, Button, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Temp = ({ navigation }) => {
  return(
    <View>
      <Text>Hello</Text>
      <Button
        title="Go back"
        onPress={() =>
          navigation.navigate('Items')
        }
      />
    </View>
  );
}

export default Temp;