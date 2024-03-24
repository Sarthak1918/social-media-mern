import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useCustomToast from '../hooks/useCustomToast';
import useFollowUnFollow from '../hooks/useFollowUnFollow';
import { useRecoilState } from 'recoil';
import suggestedUsersAtom from '../atoms/suggestedUsersAtom';

function SuggestedUsers({suggestedUsers,setSuggestedUsers,loading}) {

  return (
    <Box w={"full"}>
    <Text fontSize={"md"} mb={4} fontWeight={"500"} textAlign={"center"}>Suggested Users</Text>
    <Flex flexDirection={"column"} px={3} gap={5} w={"full"} maxH={{base:"150px",md:"full"}} overflow={{base:"scroll",md:"hidden"}} overflowX={"hidden"}>
      {!loading && suggestedUsers.length === 0 && <Text fontSize={"sm"} mb={4} textAlign={"center"}>Following Everyone!!</Text>}
      {!loading && suggestedUsers.map((user) => <SuggestedUser key={user._id} user={user} />)}

      {loading && [0, 1, 2, 3, 4, 5].map((_, idx) => <Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
        {/* avatar skeleton */}
        <Box>
          <SkeletonCircle size={"10"} />
        </Box>
        {/* username and fullname skeleton */}
        <Flex w={"full"} flexDirection={"column"} gap={2}>
          <Skeleton h={"8px"} w={"80px"} />
          <Skeleton h={"8px"} w={"90px"} />
        </Flex>
        {/* follow button skeleton */}
        <Flex>
          <Skeleton h={"20px"} w={"60px"} />
        </Flex>
      </Flex>)}

    </Flex>
    </Box>
  )
}

export default SuggestedUsers

const SuggestedUser = ({ user }) => {
  const { handleFollowUnFollow, updating, following } = useFollowUnFollow(user)

  return (
    <Flex gap={2}  justifyContent={"space-between"} alignItems={"center"}>
      {/* left side */}
      <Flex gap={2} as={Link} to={`${user?.username}`}>
        <Avatar name={user?.name} src={user?.profilePic} />
        <Box>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {user?.username}
          </Text>
          <Text color={"gray.light"} fontSize={"sm"}>
            {user?.name}
          </Text>
        </Box>
      </Flex>
      {/* right side */}
      <Button
        size={"sm"}
        color={following ? "black" : "white"}
        bg={following ? "white" : "blue.400"}
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


