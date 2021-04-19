import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

// Uses props 'trade_type' (str) and 'n' (int)
// n refers to item_id

const Item = (props) => {

  const [summary, setSummary] = useState([]);
  const [image, setImage] = useState(null);
  
  // Retrieve image and then other details from database
  useEffect( () => {
    fetch('http://127.0.0.1:5000/item/image/' + props.trade_type + "/" + props.n)
    .then(response => response.blob())
    .then(img => {
      setImage(URL.createObjectURL(img))
    })

    fetch('http://127.0.0.1:5000/item/' + props.trade_type + "/" + props.n)
    .then(response => response.json())
    .then(data => {
      setSummary(data)
    })

  }, []);

  // Return one item's image and other data
return (
    <View style={styles.itemContainer}>
       <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <Text>{summary[0]}</Text>
      <Text>Final date: {summary[1]}</Text>
      <Text>Category: {summary[2]}</Text>
      <Text>Lender: {summary[3]}</Text>
    </View>
  );
}

export default Item;

const styles = StyleSheet.create({
    // Width and height of image must be written here for it to be shown
    image: {
        width: 150,
        height: 150,
    },
    itemContainer: {
        display: 'flex',
        
        padding: '10px',
        alignItems: 'center',
        flex: 1,
        height: '250px',
        width: '250px',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#F8EF9F'
  }
});