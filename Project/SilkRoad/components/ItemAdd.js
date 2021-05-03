import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Text, Image, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CalendarPicker from 'react-native-calendar-picker';
import { getUuid } from './functions/asyncStorage';
import { StackActions } from '@react-navigation/routers';
import { createStackNavigator } from '@react-navigation/stack';
import { withNavigation } from '@react-navigation/compat';
import { BorderlessButton } from 'react-native-gesture-handler';

// Uses prop 'trade_type'
// TODO: Eject and add an image picker

const Stack = createStackNavigator();

const ItemAdd = ( props ) => {
    const [uuid, setUuid] = useState("");
    const [name, onChangeName] = useState("");
    const[date, onChangeDate] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("6");

    useEffect (() => {
        fetch('http://127.0.0.1:5000/item/count/categories')
        .then(response => response.json())
        .then(data => {
            setCategories(data)
        })

        getUuid()
        .then(result => {setUuid(result);})

    }, []);
    

    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Name of item"
                    placeholderTextColor="rgba(180,180,180,1)"
                    returnKeyType="next"
                    value={name}
                    onChangeText={onChangeName}
                    style={styles.input}
                />
            </View>

            

            <Text style={{fontSize: 17}}>
                Select an end date:
            </Text>
            <CalendarPicker
                onDateChange={onChangeDate}
            />
            
            <View style={{padding: 25}}>
                <RNPickerSelect
                placeholder={{
                    label: "Select a category",
                    value: "no_category_selected"
                }}
                onValueChange={(value) => {
                    if (value != "no_category_selected") {
                        setCategory(value);
                    }
                }}
                items={categories.map(i => (
                    {
                        label: i[1],
                        value: i[0]
                    }))}
                />
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={require("./../assets/" + category + ".png")}
                    style={styles.image}
                />
            </View>

            
            

            <Button
                title="Submit"
                onPress={() => {
                    console.log();

                    fetch('http://127.0.0.1:5000/forms/add_item',
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                uuid: uuid,
                                name: name,
                                category: category,
                                date: date.format('YYYY-MM-DD'),
                                type: props.trade_type,
                                image: category + ".png"
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    ).then(response => {console.log(response)})

                    props.navigation.dispatch(StackActions.pop(2));
                }}
            />
        </View>
        
    );
};

export default withNavigation(ItemAdd);

const styles = StyleSheet.create({
    inputContainer: {
        padding: 25,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderWidth: 1
    },
    image : {
        width: "50%",
        height: "100%"
    },
    imageContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        height: "30vh",
        padding: 15
    }
});