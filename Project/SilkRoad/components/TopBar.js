import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image} from "react-native";
import { withNavigation } from '@react-navigation/compat';

const TopBar = (props) => {
    return (
        <View style={[styles.topBar, props.type == "lend" ? styles.lendingColor : styles.borrowingColor]}>
            <View style={styles.barContent}>
                <TouchableOpacity
                    onPress={()=>{props.navigation.toggleDrawer()}}
                >
                    <Image
                    source={require("./../assets/drawer.png")}
                    style={{width: 50, height: 50}}
                    />
                </TouchableOpacity>

                <Image
                    source={require("./../assets/logo.png")}
                    style={styles.barLogo}
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
    width:'74%',
    paddingLeft:10
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

});