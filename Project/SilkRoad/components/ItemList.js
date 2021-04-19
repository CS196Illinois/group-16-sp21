import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Item from './Item';

export default function ItemList(props) {
    const [items, setItems] = useState([]);

    useEffect (() => {
        fetch('http://127.0.0.1:5000/item/count/' + props.trade_type)
        .then(response => response.json())
        .then(data => {
            setItems(data)
        })
    }, []);

    return (
        <View>
            {items.map(i => {
                return (
                    <Item
                    n={i}
                    trade_type = {props.trade_type}
                    ></Item>
                )
            })}
        </View>
    );
};