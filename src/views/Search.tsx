import React from 'react';
import { Input } from '@geist-ui/react'
import { Search as SearchIcon } from '@geist-ui/react-icons'


function Search() {
    return (
        <Input clearable icon={<SearchIcon />} placeholder="Ara" />
    );
}

export default Search