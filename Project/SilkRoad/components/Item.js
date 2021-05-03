import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text, Button } from 'react-native';
import { getUuid } from './functions/asyncStorage';

// Uses props 'trade_type' (str) and 'n' (int)
// n refers to item_id

const Item = (props) => {
  
  const [name, setName] = useState("Loading...");
  const [finalDate, setFinalDate] = useState("Loading...");
  const [category, setCategory] = useState("Loading...");
  const [userFirstName, setUserFirstName] = useState("Loading...");
  const [userId, setUserId] = useState("ID UNKNOWN");
  const [userUuid, setUserUuid] = useState(null);
  const [image, setImage] = useState(null);
  const [buttonText, setButtonText] = useState("Loading...");
  const [disabled, setDisabled] = useState(false);
  
  // Retrieve image and then other details from database
  useEffect( () => {

    getUuid()
    .then(result => {setUserUuid(result);})

    fetch('http://127.0.0.1:5000/item/image/' + props.n)
    .then(response => response.blob())
    .then(img => {
        setImage(URL.createObjectURL(img));
    })

    fetch('http://127.0.0.1:5000/item/' + props.n)
    .then((response => response.json()))
    .then(data => {
      setName(data[0]);
      setFinalDate(data[1]);
      setCategory(data[2]);
      setUserFirstName(data[3]);
      setUserId(data[4]);
      setButtonText(props.trade_type == "lend" ? "Send request" : "Send offer");
    })

  }, []);

  // Return one item's image and other data
return (
    <View>

      <View style={styles.imageWrap}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text, {fontSize: 17}}>{userFirstName}</Text>
        <View style={{maxWidth: "100%"}}>
            <Text style={[styles.text, {fontWeight: "bold", flex: 1}]}>{name}</Text>
        </View>
        
        <Text style={styles.text}>{category}</Text>
        <Text style={styles.text}>Final date: {finalDate}</Text>
      </View>

      <Button
        title = {buttonText}
        disabled = {disabled}
        onPress = {() => {
          fetch('http://127.0.0.1:5000/mail/item/post',
              {
                  method: 'POST',
                  body: JSON.stringify({
                      item_id: props.n,
                      recipient_id: userId,
                      sender_uuid: userUuid
                  }),
                  headers: {
                      'Content-Type': 'application/json'
                  },
              }
          ).then(response => {
            console.log(response)
            setButtonText("Sent!");
            setDisabled(true);
          })
        }}
      />

    </View>
  );
}

export default Item;

const styles = StyleSheet.create({
    // Width and height of image must be written here for it to be shown
    image: {
        width: "100%",
        height: 175
    },
    imageWrap: {
      display: "flex",
      width: "100%"
    },
    text: {
      fontFamily: "Verdana",
      textShadowRadius: 2,
      textShadowOffset: { width: 1, height: 1 },
      textShadowColor: "#878787",
      padding: 5
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
});