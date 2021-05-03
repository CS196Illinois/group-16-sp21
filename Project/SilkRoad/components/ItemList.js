import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
            style={styles.listFlexbox}
            key={items}
        >
            {items.map(i => {
                return (
                    <View style={styles.itemContainer}>
                        <Item
                            n={i}
                        />
                    </View>
                );
            })}
            
        </View>
    );
}

const styles = StyleSheet.create({
    listFlexbox: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#F4F4F4',
        textAlign: 'center',
        marginTop: 5,
        width: "170px",
        height: "360px"
  }
});