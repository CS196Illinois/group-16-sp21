import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CalendarPicker from 'react-native-calendar-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Uses prop 'trade_type'
// TODO: Eject and add an image picker

const ItemAdd = (props) => {
    const [email, onChangeEmail] = useState("");
    const [name, onChangeName] = useState("");
    const[date, onChangeDate] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");

    useEffect (() => {
        fetch('http://127.0.0.1:5000/item/count/categories')
        .then(response => response.json())
        .then(data => {
            setCategories(data)
        })
    }, []);
    

    return (
        <View>
            <TextInput
            onChangeText={onChangeEmail}
                value={email}
                placeholder="User email"
            />
            <TextInput
            onChangeText={onChangeName}
                value={name}
                placeholder="Name of item"
            />

            <CalendarPicker
                onDateChange={onChangeDate}
            />

            <RNPickerSelect
            placeholder={{
                label: "Select a category",
                value: "no_category_selected"
            }}
            onValueChange={(value) => {setCategory(value)}}
            items={categories.map(i => (
                {
                    label: i[1],
                    value: i[0]
                }))}
            />

            <Button
                title="Submit"
                onPress={() => {
                    console.log()
                    fetch('http://127.0.0.1:5000/forms/add_item',
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                email: email,
                                name: name,
                                category: category,
                                date: date.format('YYYY-MM-DD'),
                                type: props.trade_type,
                                image: 'default.jpg'
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    ).then(response => {console.log(response)})
                }}
            />
        </View>
        
    );
};

export default ItemAdd;