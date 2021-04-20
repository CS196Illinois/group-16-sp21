import AsyncStorage from '@react-native-async-storage/async-storage';

const getUsername = async () => {
    try {
      return await AsyncStorage.getItem('username');
    } catch(e) {
      console.log("Error reading value");
    }
}

const storeUsername = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('username', jsonValue);
      console.log('saved ' + jsonValue);
    } catch (e) {
      console.log("Error saving value");
    }
  }

const logOff = async () => {
    try {
      await AsyncStorage.clear();
      console.log('logged off');
    } catch (e) {
      // saving error
    }
  }

export { getUsername, storeUsername, logOff };