import React from 'react';
import { Searchbar } from 'react-native-paper';

const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    return(
        <div>
            {/* <p>You are searching for: {searchQuery} </p> */}
            <Searchbar
                placeholder="Search for Item"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
        </div>

    );

};

export default Search;