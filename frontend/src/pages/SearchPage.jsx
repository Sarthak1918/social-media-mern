// UserSearchComponent.js
import { Avatar, Box, Flex, Image, Input, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from '../components/UserCard';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (searchQuery) => {
        if(searchQuery=="") return;
        setLoading(true);
        try {
            const response = await fetch(`/api/user/search?query=${searchQuery}`);
            const data = await response.json();
            setSearchResults(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);
        handleSearch(searchQuery);
    };



    return (
        <Box w={"full"}>
            <Input type='text' fontSize={"xl"} py={6} px={4} placeholder='Search by name or username...' onChange={handleChange} value={query} />
            <Box mt={4}>

                {!query && null}

                {query && !loading && searchResults?.length === 0 && <Flex justifyContent={"center"}>
                    <Text fontSize={"md"}>No users found</Text>
                </Flex>}

                {loading && <Flex justifyContent={"center"}>
                    <Spinner size={"lg"} />
                </Flex>}

                {!loading &&
                    searchResults?.map(user => (
                        <UserCard user={user} key={user._id} />
                    ))}

            </Box>
        </Box>
        // <div>
        //   <input type="text" style={{ background: "#ff04" }} value={query} onChange={handleChange} />
        //   <ul>
        //     {searchResults.map(user => (
        //       <li key={user._id}>{user.username} - {user.name}</li>
        //     ))}
        //   </ul>
        // </div>
    );
};


export default SearchPage;



