import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';

// Uses props 'trade_type' (str) and 'n' (int)
// n refers to item_id

const Item = (props) => {
  
  const [summary, setSummary] = useState([]);
  const [name, setName] = useState("Loading...");
  const [finalDate, setFinalDate] = useState("Loading...");
  const [category, setCategory] = useState("Loading...");
  const [userFirstName, setUserFirstName] = useState("Loading...");
  const [userUUID, setUserUUID] = useState("UUID UNKNOWN");
  const [image, setImage] = useState(null);
  
  // Retrieve image and then other details from database
  useEffect( () => {
    fetch('http://127.0.0.1:5000/item/image/' + props.trade_type + "/" + props.n)
    .then(response => response.blob())
    .then(img => {
        setImage(URL.createObjectURL(img));
    })

    fetch('http://127.0.0.1:5000/item/' + props.trade_type + "/" + props.n)
    .then((response => response.json()))
    .then(data => {
      setName(data[0]);
      setFinalDate(data[1]);
      setCategory(data[2]);
      setUserFirstName(data[3]);
      setUserUUID(data[4]);
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
      <Text>{name}</Text>
      <Text>Final date: {finalDate}</Text>
      <Text>Category: {category}</Text>
      <Text>{props.trade_type == "lend" ? <Text>Lender</Text> : <Text>Request by</Text>}: {userFirstName}</Text>

      <Button
        title = {props.trade_type == "lend" ? "Send request" : "Send offer"}
        onPress = {() => {console.log(userUUID);}}
      />

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