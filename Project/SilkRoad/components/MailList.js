import MailIncomingBar from './MailIncomingBar';
import MailOutgoingBar from './MailOutgoingBar';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';

const MailList = (props) => {
  
  const [items, setItems] = useState([]);

  useEffect (() => {
      fetch('http://127.0.0.1:5000/mail/item/count/' + props.mail_type + "/" + props.uuid)
        .then(response => response.json())
        .then(data => {
            setItems(data);
            console.log(data);
        });
  }, []);

  if (props.mail_type == "incoming") {
    return(
      <View style={styles.incomingList, styles.itemContainer}>
        {items.map(i => {
            return (
              <MailIncomingBar
                n={i}
              />
            );
        })}
      </View>
    );
  } else if (props.mail_type == "outgoing") {
    return (
      <View style={styles.incomingList, styles.itemContainer}>
        {items.map(i => {
            return (
              <MailOutgoingBar
                n={i}
              />
            );
        })}
      </View>
    );
  }
    
}

export default MailList;

const styles = StyleSheet.create({
  incomingList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%"
    
  },
  itemContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#C4C4C4',
        textAlign: 'center',
        marginTop: 5,
        
  }
});