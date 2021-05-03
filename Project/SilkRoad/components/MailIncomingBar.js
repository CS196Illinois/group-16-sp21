import MailItem from './MailItem';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, SliderComponent } from 'react-native';
import { call } from 'react-native-reanimated';
import { getUuid, storeUuid } from './functions/asyncStorage';

const MailIncomingBar = (props) => {

    const [userResponse, setUserResponse] = useState(null);
    const [senderName, setSenderName] = useState("N/A");
    const [flavorText, setFlavorText] = useState("");
    const [tradeType, setTradeType] = useState("");
    const [textTrigger, setTextTrigger] = useState("True");

    useEffect( () => {
        fetch('http://127.0.0.1:5000/mail/response/incoming/' + props.n,
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
        fetch('http://127.0.0.1:5000/mail/response/incoming/' + props.n)
        .then((response => response.json()))
        .then(data => {
            if (data[0] == null) {
                if (data[3] == "lend") {
                    setFlavorText(data[4] + " is requesting");
                } else if (data[3] == "borrow") {
                    setFlavorText(data[4] + " is offering");
                }
            } else {
                if (data[3] == "lend") {
                    setFlavorText("You have " + (data[0] == 0 ? "reject" : "accept") + "ed " + data[4] +"'s request");
                } else if (data[3] == "borrow") {
                    setFlavorText("You have " + (data[0] == 0 ? "reject" : "accept") + "ed " + data[4] +"'s offer");
                }
            }
            setTextTrigger(false);
        })
        
        
    },)

    return(
        <View style={styles.masterBox}>

        <View style={styles.buttonContainer} key={flavorText}>
            <View style={styles.requestText}>
                <Text style = {styles.requestText}>
                    {flavorText}
                </Text>
            </View>

            <TouchableOpacity onPress={() => {setUserResponse(1)}}>
            <View>
                <Text style={styles.buttonReject}>
                Accept
                </Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setUserResponse(0)}}>
            <View>
                <Text style={styles.buttonAccept}>
                Reject
                </Text>
            </View>
            </TouchableOpacity>
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

export default MailIncomingBar;

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
      margin: 5,
      width: "50vw"
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
  buttonReject: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin:5,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 5,
    backgroundColor: '#D2E7FF'
  },
   buttonAccept: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin:5,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 5,
    backgroundColor: '#FFEFD7'
  }
});