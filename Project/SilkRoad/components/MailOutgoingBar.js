import MailItem from './MailItem';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, SliderComponent } from 'react-native';
import { call } from 'react-native-reanimated';
import { getUuid, storeUuid } from './functions/asyncStorage';

const MailOutgoingBar = (props) => {

    const [userResponse, setUserResponse] = useState(null);
    const [senderName, setSenderName] = useState("N/A");
    const [flavorText, setFlavorText] = useState("");
    const [tradeType, setTradeType] = useState("");
    const [textTrigger, setTextTrigger] = useState("True");

    useEffect( () => {
        fetch('http://127.0.0.1:5000/mail/response/outgoing/' + props.n,
        {
            method: 'POST',
            body: JSON.stringify({
                response: userResponse
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).
        then(response => {
            console.log(response);
        })
        .then(() => {
            setTextTrigger(true);
        })
    }, [userResponse])

    useEffect(() => {
        fetch('http://127.0.0.1:5000/mail/response/outgoing/' + props.n)
        .then((response => response.json()))
        .then(data => {
            if (data[0] == null) {
                setFlavorText("Waiting for response from " + data[4]);
            } else {
                if (data[3] == "lend") {
                    setFlavorText(data[4] + " has " + (data[0] == 0 ? "reject" : "accept") + "ed your request");
                } else if (data[3] == "borrow") {
                    setFlavorText(data[4] + " has " + (data[0] == 0 ? "reject" : "accept") + "ed your offer");
                }
            }
            setTextTrigger(false);
        })
        
        
    },)

    return(
        <View style={styles.masterBox}>

        <View style={styles.buttonContainer} key={flavorText}>
            <View style={styles.requestText}>
                <Text style={styles.requestText}>
                    {flavorText}
                </Text>
            </View>
        </View>

        <View
            style={styles.itemContainer}
        >
            <MailItem
                n={props.n}
                user_response={userResponse}
            />
        </View>

        </View>
    );
}

export default MailOutgoingBar;

const styles = StyleSheet.create({
  masterBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: "100%",
      backgroundColor: '#C4C4C4',
      marginTop: 5
  },
  itemContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C4C4C4',
      textAlign: 'center',
      margin: 5
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: "40vw",
    borderWidth: 1
  },
  requestText: {
    textAlign: "center",
    display: "flex",
    width: "100%",
    textAlignVertical: "center",
    padding: 3
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin:5
  }
});