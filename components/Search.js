import React from 'react';
import { Searchbar } from 'react-native-paper';

const Search = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeQuery = (query) => {
        setSearchQuery(query);
        props.parentCallback(query);
    }

    const sendData = () => {
           
    }

    return(
        <div>
            {/* <p>You are searching for: {searchQuery} </p> */}
            <Searchbar
                placeholder="Search for Item"
                onChangeText={onChangeQuery}
                value={searchQuery}
            />
        </div>

    );

};

export default Search;