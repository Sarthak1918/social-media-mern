import  { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { useParams } from 'react-router-dom'
import useCustomToast from '../hooks/useCustomToast'
import { Flex, Spinner } from '@chakra-ui/react'
import Post from '../components/Post'
import useGetUserProfile from '../hooks/useGetUserProfile'
import { useRecoilValue,useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import CreatePost from '../components/CreatePost'
import postsAtom from '../atoms/postsAtom'

function UserPage() {

  const{user,loading} = useGetUserProfile()
  const{username} = useParams()
  const[posts,setPosts] = useRecoilState(postsAtom)  //posts of the user we are viewing/searching
  const[fetchingPosts,setFetchingPosts] = useState(true) //fetching posts of the user we are viewing/searching
  const currentUser = useRecoilValue(userAtom);

  const showToast = useCustomToast()
  useEffect(()=>{

    const getUserPosts = async()=>{
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/post/userposts/${username}`)
        const data = await res.json()
        if(data.success===false){
          showToast("Error",data.message,"error")
          return;
        }else{
          // showToast("Success",data.message,"success")
          setPosts(data.data) //the first data is the response object and the second data is the actual data object that contains user info
        }
      } catch (error) {
        showToast("Error",error,"error")
        setPosts([])
        return;
      }finally{
        setFetchingPosts(false);
      }
    }

    getUserPosts()
  },[setPosts, showToast, username])

  if(loading){
    return <Flex justifyContent={"center"}>
      <Spinner size={"xl"}/>
    </Flex>
  }
  if(!user && !loading) return <Flex justifyContent={"center"}>User not Found</Flex>;
  return (
    <div>
      <UserHeader  user={user}/>
      {!fetchingPosts && posts.length === 0 && <h1 style={{textAlign:"center",fontSize:"larger",fontWeight:"500",paddingBlock:"30px"}}>No posts to show</h1>}
      {fetchingPosts &&<Flex justifyContent={"center"}>
      <Spinner size={"xl"}/>
    </Flex>}
      {posts.map((post) => {
        return <Post key={post._id} post={post} postedBy={post.postedBy}/>
      })}
      {currentUser.username === user.username && <CreatePost/>}
    </div>
  )

  
}

export default UserPage