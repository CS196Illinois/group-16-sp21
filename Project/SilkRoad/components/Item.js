import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, Alert, ScrollView, SafeAreaView } from "react-native";


export default function Item(props) {
    return (
        <View className='item-container' style={{borderColor: 'black',
            borderStyle: 'solid', height: '300px', width: '300px'}}>
            <p>{props.itemName}</p>
            <p>{props.username} is looking for</p>
            <p>{props.description}</p>
            <p>Duration: {props.duration}</p>
        </View>
    );

}
