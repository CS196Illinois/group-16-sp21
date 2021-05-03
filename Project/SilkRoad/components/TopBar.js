import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image} from "react-native";
import { withNavigation } from '@react-navigation/compat';

const TopBar = (props) => {
    const [bgColor, setBgColor] = useState(null);
    useEffect(() => {
        switch (props.type) {
            case "lend":
                setBgColor(styles.lendingColor);
                break;
            case "borrow":
                setBgColor(styles.borrowingColor);
                break;
            default:
                setBgColor(styles.defaultColor);
    }

    }, []);

    return (
        <View style={[styles.topBar, bgColor]}>
            <View style={styles.barContent}>
                <TouchableOpacity
                    onPress={()=>{props.navigation.toggleDrawer()}}
                >
                    <Image
                    source={require("./../assets/drawer.png")}
                    style={{width: 35, height: 35}}
                    />
                </TouchableOpacity>

                <Image
                    source={require("./../assets/logo.png")}
                    style={styles.barLogo}
                />

                <Image
                    source={require("./../assets/shh.png")}
                    style={{width: 35, height: 35}}
                />

            </View>
        </View>
        
    );
}

export default withNavigation(TopBar);

const styles = StyleSheet.create({
    topBar: {
      display: 'flex',
      height: 100,
      width: '100%',
      backgroundColor: '#9AC9FF',
      flexDirection: 'row',
  },

  barContent: {
    display:'flex',
    flexDirection:"row",
    alignItems: 'center',
    justifyContent:'space-between',
    paddingLeft:10,
    width: "100%"
  },

  barLogo: {
    height: 100,
    width: 200
  },

  borrowingColor: {
    backgroundColor: '#D2E7FF'
  },

  lendingColor: {
    backgroundColor: '#FFEFD7'
  },

  defaultColor: {
    backgroundColor: '#9AC9FF'
  }

});