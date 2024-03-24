import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useCustomToast from '../hooks/useCustomToast';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';
import SuggestedUsers from '../components/SuggestedUsers';

function HomePage() {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const[suggestedUsers,setSuggestedUsers] = useState([])


  const showToast = useCustomToast()
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/post/feed')
        const data = await res.json();
        if (data.success === false) {
          showToast("Error", data.message, "error")
        } else {
          setPosts(data.data)
        }
      } catch (error) {
        showToast("Error", error, "error")
      } finally {
        setLoading(false)
      }
    }
    getFeedPosts()
  }, [setPosts, showToast])


  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/user/suggestedUsers')
        const data = await res.json()
        if (data.success === false) {
          showToast("Error", data.message, "error");
        } else {
          setSuggestedUsers(data.data)
        }
      } catch (error) {
        showToast("Error", error, "error")
      } finally {
        setLoading(false)
      }
    }
    getSuggestedUsers()
  }, [])

  return (
    <Flex gap={{base:10,md:16}} flexDirection={{ base: "column-reverse", md: "row" }} alignItems={"flex-start"}>
      <Box flex={70}>
        {!loading && posts.length === 0 && <h1 style={{ textAlign: "center", fontSize: "larger", fontWeight: "500" }}>No posts to show.Follow some users</h1>}

        {loading && <Box w={"full"} alignItems={"center"} justifyContent={"center"} p={5}>
          <Spinner size={"xl"} />
        </Box>}

        {!loading && posts.map((post) => {
          return <Post key={post._id} post={post} postedBy={post.postedBy} />
        })}
      </Box>

      
        {
          suggestedUsers?.length > 0 && <Box flex={30} w={"full"}>
          <SuggestedUsers  suggestedUsers={suggestedUsers} setSuggestedUsers={setSuggestedUsers} loading={loading}/>
        </Box>
        }



       
      
    </Flex>

  )
}

export default HomePage