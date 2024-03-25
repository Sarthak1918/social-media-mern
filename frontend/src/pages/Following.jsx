import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard';
import { useParams } from 'react-router-dom';

function Following() {
  const[following,setFollowing] = useState([]);
  const[loading,setLoading] = useState(true);
  const {userId} = useParams()

  useEffect(() => {
    const getFollowing = async() =>{
      try {
        const res = await fetch(`/api/user/${userId}/following`)
        const data = await res.json()
        setFollowing(data.data)
        console.log(data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }
    getFollowing()
  },[userId])

  return (
    <Box>
        <Text textAlign={"center"} fontSize={"md"} fontWeight={500} mb={5}>Following</Text>

        {
          loading && <Flex h={100} justifyContent={"center"} alignItems={"center"}><Spinner size={"lg"}/></Flex>
        }
        {
          !loading && following.length===0 && <Flex justifyContent={"center"}><Text>No followers found</Text></Flex>
        }
        <Box>
          {
            following?.map((user)=>(
              <UserCard key={user._id}  user={user}/>
            ))
          }
        </Box>
    </Box>

  )
}

export default Following