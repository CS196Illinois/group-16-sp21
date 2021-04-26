import React from 'react';
import { Searchbar } from 'react-native-paper';
import { useEffect } from 'react/cjs/react.development';

const Search = (props) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeQuery = (query) => {
        setSearchQuery(query);
        props.parentCallback(query);
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