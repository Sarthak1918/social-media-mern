import { Avatar, Box, Button, Divider, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'

function PostPage() {
  const [liked, setLiked] = useState(false)
  return (
    <div>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Avatar size='md' name='Mark Zuckerberg' src='/zuck-avatar.png' />
          <Flex alignItems={"center"}>
            <Text fontWeight={700}>Mark Zuckerberg</Text>
            <Image src='/verified.png' w={4} h={4} ml={1} />
          </Flex>

        </Flex>

        <Flex alignItems={"center"} gap={2}>
          <Text>1d ago</Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>Let's Talk about Threads</Text>

      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={"/post1.png"} w={"full"} />
      </Box>

      <Flex my={2}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex my={2} gap={2} alignItems={"center"}>
        <Text>238 replies</Text>
        <Text>{200 + (liked?1:0)}likes</Text>
      </Flex>

      <Divider my={4} />

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />
      <Comment
        comment="Looks Funny!!"
        createdAt="1d"
        likes="100"
        userName="john doe"
        avatar="https://bit.ly/kent-c-dodds"
      />
      <Comment
        comment="Meet You soom!!"
        createdAt="1d"
        likes="14"
        userName="Harry Lamo"
        avatar="https://bit.ly/ryan-florence"
       />
    </div>
  )
}

export default PostPage