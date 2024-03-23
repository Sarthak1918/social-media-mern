import { Flex, Spinner } from '@chakra-ui/react'
import  { useEffect, useState } from 'react'
import useCustomToast from '../hooks/useCustomToast';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';

function HomePage() {
  const[posts,setPosts] = useRecoilState(postsAtom);
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
          setPosts(data.data)
        }
      } catch (error) {
        showToast("Error",error,"error")
      } finally{
        setLoading(false)
      }
    }
    getFeedPosts()
  },[setPosts, showToast])

  return (
    <>
      {!loading && posts.length === 0 && <h1 style={{textAlign:"center",fontSize:"larger",fontWeight:"500"}}>No posts to show.Follow some users</h1>}

      {loading && <Flex justifyContent={"center"} p={5}>
        <Spinner size={"xl"}/>
      </Flex> }

      {!loading && posts.map((post) => {
       return <Post key={post._id} post={post} postedBy={post.postedBy}/>
      })}
    </>
    
  )
}

export default HomePage