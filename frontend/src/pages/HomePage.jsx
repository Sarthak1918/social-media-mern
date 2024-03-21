import { Button, Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useCustomToast from '../hooks/useCustomToast';
import Post from '../components/Post';

function HomePage() {
  const[feedPosts,setFeedPosts] = useState([]);
  const[loading,setLoading] = useState(true);

  const showToast = useCustomToast()
  useEffect(()=>{
    const getFeedPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/post/feed')
        const data = await res.json();
        console.log(data);
        if(data.success === false){
          showToast("Error",data.message,"error")
        }else{
          setFeedPosts(data.data)
        }
      } catch (error) {
        showToast("Error",error,"error")
      } finally{
        setLoading(false)
      }
    }
    getFeedPosts()
  },[])

  return (
    <>
      {!loading && feedPosts.length === 0 && <h1 style={{textAlign:"center",fontSize:"larger",fontWeight:"500"}}>No posts to show.Follow some users</h1>}

      {loading && <Flex justifyContent={"center"} p={5}>
        <Spinner size={"xl"}/>
      </Flex> }

      {!loading && feedPosts.map((post,index) => {
       return <Post key={post._id} post={post} postedBy={post.postedBy}/>
      })}
    </>
    
  )
}

export default HomePage