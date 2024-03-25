import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useFollowUnFollow from '../hooks/useFollowUnFollow'

function UserCard({ user }) {
    const { handleFollowUnFollow, updating, following } = useFollowUnFollow(user)

    return (
        <Flex as={Link}  w={"full"} justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={4} py={3} my={2} w={"full"} borderRadius={"xl"}>
                <Avatar name={user?.username} src={user?.profilePic} size={"xl"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Link to={`/${user?.username}`}>
                        <Text w={"fit-content"} fontSize='md' fontWeight='bold' _hover={{ textDecoration: "underline" }}>{user?.name}</Text>
                    </Link>
                    <Flex alignItems={"center"}>
                        <Text fontWeight={500}>{user?.username}</Text>
                        <Image src='/verified.png' ml={1} w={4} h={4} />
                    </Flex>
                    <Text>{user?.followers?.length} followers</Text>
                    <Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Button
                size={"sm"}
                color={following ? "black" : "white"}
                bg={following ? "gray.200" : "blue.400"}
                onClick={handleFollowUnFollow}
                isLoading={updating}
                _hover={{
                    color: following ? "black" : "white",
                    opacity: ".8",
                }}
            >
                {following ? "Unfollow" : "Follow"}
            </Button>
        </Flex>
    )
}

export default UserCard