import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Item = (props) => {

  const [summary, setSummary] = useState([]);
  const [image, setImage] = useState("")
  
  window.onload = ( () => {
    fetch('http://localhost:5000/image/' + props.n)
    .then(response => response.blob())
    .then(img => {
      setImage(URL.createObjectURL(img))
    })

    fetch('http://localhost:5000/item/' + props.n)
    .then(response => response.json())
    .then(data => {
      setSummary(data)
    })

  });

  return (
    <View style={styles.container}>
       <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <Text>{summary[0]}</Text>
      <Text>Category: {summary[1]}</Text>
      <Text>Lender: {summary[2]}</Text>
      <StatusBar style="auto" />
     </View>
  );

}

function App() {
  return (
    <View style={styles.container}>
      <Item n={5} />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150
  }
});
