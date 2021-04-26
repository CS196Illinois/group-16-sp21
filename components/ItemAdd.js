import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Text, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CalendarPicker from 'react-native-calendar-picker';
import { getUuid } from './functions/asyncStorage';
import { StackActions } from '@react-navigation/routers';
import { createStackNavigator } from '@react-navigation/stack';
import { withNavigation } from '@react-navigation/compat';

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

            <TextInput
            onChangeText={onChangeName}
                value={name}
                placeholder="Name of item"
            />

            <CalendarPicker
                onDateChange={onChangeDate}
            />

            <Image source={require("./../assets/" + category + ".png")}
                  style={{width: 50, height: 50}}/>

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