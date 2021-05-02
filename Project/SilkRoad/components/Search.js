import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Search = (props) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeQuery = (query) => {
        setSearchQuery(query);
        props.parentCallback(query);
    }

    return(
        <View style={{padding: "3px"}}>
            <Searchbar
                placeholder="Search for Item"
                onChangeText={onChangeQuery}
                value={searchQuery}
            />
        </View>

    );

};

export default Search;