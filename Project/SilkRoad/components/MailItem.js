import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Image, Text} from 'react-native';

// Uses props 'trade_type' (str) and 'n' (int)
// n refers to item_id

const MailItem = (props) => {
  
  const [name, setName] = useState("Loading...");
  const [finalDate, setFinalDate] = useState("Loading...");
  const [category, setCategory] = useState("Loading...");
  const [userFirstName, setUserFirstName] = useState("Loading...");
  const [userUUID, setUserUUID] = useState("UUID UNKNOWN");
  const [image, setImage] = useState(null);
  
  // Retrieve image and then other details from database
  useEffect( () => {
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
      setUserUUID(data[4]);
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

      <View>
        <View style={{maxWidth: "100%"}}>
            <Text style={[styles.text, {fontWeight: "bold", flex: 1, height: "10vw"}]}>{name}</Text>
        </View>
        <Text style={styles.text}>{category}</Text>
        <Text style={styles.text}>Respond by: {finalDate}</Text>
      </View>

    </View>
  );
}

export default MailItem;

const styles = StyleSheet.create({
    // Width and height of image must be written here for it to be shown
    image: {
        width: "50%",
        height: 80
    },
    imageWrap: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      justifyContent: "center"
    },
    text: {
      fontFamily: "Verdana",
      textShadowRadius: 2,
      textShadowOffset: { width: 1, height: 1 },
      textShadowColor: "#878787",
      padding: 5
    }
});