import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Avatar, Button, Image } from "@chakra-ui/react";
import { CgMoreO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom";
import useCustomToast from "../hooks/useCustomToast";
import { useState } from "react";
import useFollowUnFollow from "../hooks/useFollowUnFollow";

const UserHeader = ({ user }) => {
    const showToast = useCustomToast();
    const currentUser = useRecoilValue(userAtom) //logged in user
    const{handleFollowUnFollow,following,updating} = useFollowUnFollow(user)

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            showToast("Success", "Link copied to clipboard", "success")
        })
    };

    // const handleFollowUnFollow = async () => {
    //     if (!currentUser) {
    //         showToast("Error", "You need to login first", "error")
    //         return;
    //     }
    //     if (updating) { //if the user clicks on the follow/unfollow button while loading it will do
    //         return;
    //     }
    //     setUpdating(true);
    //     try {
    //         const res = await fetch(`/api/user/follow/${user._id}`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         })

    //         const data = await res.json();
    //         if (data.success === false) {
    //             showToast("Error", data.message, "error")
    //             return;
    //         }
    //         if (following) {
    //             showToast("Unfollowed", "", "success")
    //             user.followers.pop(); //its just a visual update, the actual data is updated in the backend.when we refresh the page followers will be updated to the actual data
    //         }
    //         else {
    //             showToast("Followed", "", "success")
    //             user.followers.push(currentUser?._id); //its just a visual update, the actual data is updated in the backend.when we refresh the page followers will be updated to the actual data
    //         }
    //         setFollowing(!following);
    //     } catch (error) {
    //         showToast("Error", error, "error")
    //     } finally {
    //         setUpdating(false)
    //     }
    // }


    return (
        <VStack gap={4} alignItems={"start"} mb={5}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={{base:"xl",md:"3xl"}} mb={1} fontWeight={700}>{user?.name}</Text>
                    <Flex alignItems={"center"} gap={1}>
                        <Text fontWeight={500} fontSize={{base:"sm",md:"md"}}>{user?.username}</Text>
                        <Image src='/verified.png' ml={1} w={4} h={4} />
                    </Flex>
                    <Text mt={7} w={"80%"} fontSize={{base:"sm",md:"md"}} fontWeight={500}>{user?.bio}</Text>

                </Box>

                <Box>
                    {
                        user?.profilePic ?
                            <Avatar name={user?.name} src={user?.profilePic} size={"2xl"} />
                            : <Avatar name={user?.name} src="https://bit.ly/broken-link" size={"2xl"} />
                    }

                </Box>
            </Flex>


            {currentUser?._id === user?._id &&
                <Link to="/update"><Button size={"xs"} fontSize={"sm"} px={3} py={4}>Edit Profile</Button></Link>
            }
            {currentUser?._id !== user?._id &&
                <Button onClick={handleFollowUnFollow} isLoading={updating}>
                    {following ? "Unfollow" : "Follow"}
                </Button>
            }

            <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                <Flex gap={5}>
                    <Flex as={Link} to={`/${user?._id}/following`} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                        <Text fontSize={"md"} fontWeight={500}>{user?.following.length}</Text>
                        <Text fontWeight={500} color={"gray"} fontSize={"sm"}>Following</Text>
                    </Flex>
                    <Flex as={Link} to={`/${user?._id}/followers`} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                        <Text fontSize={"md"} fontWeight={500}>{user?.followers.length}</Text>
                        <Text fontWeight={500} color={"gray"} fontSize={"sm"}>Followers</Text>
                    </Flex>
                </Flex>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList>
                                    <MenuItem onClick={copyURL}>
                                        Copy link
                                    </MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
            </Flex>

            <Box textAlign={"center"} w={"full"} borderBottom={"1.5px solid gray"} pb='3'>
                <Text fontWeight={"bold"}>Posts</Text>
            </Box>
        </VStack>
    );
};

export default UserHeader;