import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Item from './Item';

// Uses props 'trade_type'

export default function ItemList(props) {
    const [items, setItems] = useState([]);

    useEffect (() => {
        fetch('http://127.0.0.1:5000/item/count/' + props.trade_type + "/" + props.query)
        .then(response => response.json())
        .then(data => {
            if (items != data) {
                setItems(data);
            }
        });
        
    }, [props.query]);

    return (
        <View
            key={items}
        >
            {items.map(i => {
                return (
                    <Item
                    n={i}
                    trade_type = {props.trade_type}
                    />
                )
            })}
        </View>
    );
};