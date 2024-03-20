import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { Link, useParams } from 'react-router-dom'
import UserPost from '../components/UserPost'
import useCustomToast from '../hooks/useCustomToast'
import { Flex, Spinner } from '@chakra-ui/react'

function UserPage() {
  const [user,setUser] = useState(null) //user we are viewing/searching
  const{username} = useParams()
  const showToast = useCustomToast()
  const[loading,setLoading] = useState(true); //since its a page,when the page loads there should be a loading state(loader) and after fetching(either success or failure) the loader should be removed


  useEffect(()=>{
    const getUser = async()=>{
      try{
        const res = await fetch(`/api/user/profile/${username}`)
        const data = await res.json()
        if(data.success===false){
        showToast("Error",data.message,"error")
        return;
        }
        else{
          // showToast("Success",data.message,"success")
          console.log(data.data);
          setUser(data.data) //the first data is the response object and the second data is the actual data object that contains user info
        }
      }catch(error){
        showToast("Error",error,"error")
        return;
      }finally{
        setLoading(false)
      }
    }
    getUser();
  },[username])

  if(loading){
    return <Flex justifyContent={"center"}>
      <Spinner size={"xl"}/>
    </Flex>
  }
  if(!user && !loading) return <Flex justifyContent={"center"}>User not Found</Flex>;
  return (
    <div>
      <UserHeader  user={user}/>
      <UserPost likes ={1889} replies={122} postImg = "post1.png" postTitle="Lets talk about Threds"/>
      <UserPost likes ={267} replies={12} postImg = "post2.png" postTitle="This is my first thread"/>
      <UserPost likes ={143} replies={45} postImg = "post3.png" postTitle="Hello People"/>
      <UserPost likes ={143} replies={45}  postTitle="Hello People"/>
    </div>
  )
}

export default UserPage