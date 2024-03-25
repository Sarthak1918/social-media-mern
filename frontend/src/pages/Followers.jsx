import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard';

function Followers() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const res = await fetch("/api/user/followers")
        const data = await res.json()
        setFollowers(data.data)
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    getFollowers()
  }, [])

  return (
    <Box>
      <Text textAlign={"center"} fontSize={"md"} fontWeight={500} mb={5}>Followers</Text>

      {
        loading && <Flex h={100} justifyContent={"center"} alignItems={"center"}><Spinner size={"lg"} /></Flex>
      }
      {
        !loading && followers.length === 0 && <Flex justifyContent={"center"}><Text>No followers found</Text></Flex>
      }
      <Box>
        {
          followers?.map((follower) => (
            <UserCard key={follower._id} user={follower} />
          ))
        }
      </Box>
    </Box>

  )
}

export default Followers


