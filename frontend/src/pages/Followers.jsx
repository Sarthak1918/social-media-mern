import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard';
import { useParams } from 'react-router-dom';

function Followers() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const{userId} = useParams()
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const res = await fetch(`/api/user/${userId}/followers`)
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
  }, [userId])

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


