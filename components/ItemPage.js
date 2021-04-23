import React from 'react';
import { View, Button } from 'react-native';
import ItemList from './ItemList';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ItemPage = ({ navigation }) => {
  return(
    <View>
        <Button
        title="Go to test"
        onPress={() =>
          navigation.navigate('Test')
        }
        />
        <ItemList/>
    </View>
  );
}

export default ItemPage;