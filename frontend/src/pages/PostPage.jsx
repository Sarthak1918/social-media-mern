import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'
import useGetUserProfile from '../hooks/useGetUserProfile'
import useCustomToast from '../hooks/useCustomToast'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { formatDistanceToNow } from "date-fns"
import userAtom from '../atoms/userAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { DeleteIcon } from '@chakra-ui/icons'
import postsAtom from '../atoms/postsAtom'


function PostPage() {
  const [liked, setLiked] = useState(false)
  const { user, loading } = useGetUserProfile()
  const { postId } = useParams();
  const[isDeleting,setIsDeleting] = useState(false);
  const currentUser = useRecoilValue(userAtom)
  const[posts,setPosts] = useRecoilState(postsAtom)
  const showToast = useCustomToast()

  useEffect(() => {
    const getPost = async () => {
      setPosts([])
      try {
        const res = await fetch(`/api/post/${postId}`)
        const data = await res.json();
        if (data.success === false) {
          showToast("Error", data.message, "error")
        } else {
          setPosts([data.data])
        }
      } catch (error) {
        showToast("Error", error, "error")
      }
    }
    getPost();
  }, [postId, setPosts, showToast]);

  const currentPost = posts[0];

  const postDeleteHandler = async(e)=>{
    if(isDeleting) return;
    setIsDeleting(true)
    try {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete this post?")) return;
        const res = await fetch(`/api/post/delete/${currentPost?._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        if (data.success === false) {
            showToast("Error", data.message, "error")
        } else {
            showToast("Success", data.message, "success")
        }
    } catch (error) {
        showToast("Error", error.message, "error")
    }finally{
        setIsDeleting(false);
    }
}


  if (loading && !user) {
    return <Flex justifyContent={"center"}>
      <Spinner size={"xl"} />
    </Flex>
  }

  if (!currentPost) return null;

  return (
    <div>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Avatar size='md' name={user?.name} src={user?.profilePic} />
          <Flex alignItems={"center"}>
            <Text fontWeight={700}>{user?.username}</Text>
            <Image src='/verified.png' w={4} h={4} ml={1} />
          </Flex>

        </Flex>

        <Flex gap={5} alignItems={"center"}>
          <Text fontSize={"xs"} textAlign={"right"} w={36} color={"gray.light"}>
            {(formatDistanceToNow(new Date(currentPost?.createdAt)))} ago
          </Text>

          {user?._id === currentUser?._id && <DeleteIcon cursor={"pointer"} onClick={postDeleteHandler} />}
        </Flex>
      </Flex>

      <Text my={3}>{currentPost?.text}</Text>

      {currentPost?.image && <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={currentPost?.image} w={"full"} />
      </Box>}

      <Flex my={2}>
        <Actions post={currentPost} />
      </Flex>


      

      
    </div>
  )
}

export default PostPage