import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useCustomToast from "../hooks/useCustomToast";
import {formatDistanceToNow} from "date-fns"

const Post = ({ post, postedBy }) => {
    const [liked, setLiked] = useState(false);
    const [user, setUser] = useState(null);
    const showToast = useCustomToast()
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/profile/${postedBy}`);
                const data = await res.json();
                if (data.success === false) {
                    showToast("Error", data.message, "error")
                    return;
                } else {
                    setUser(data.data);
                }
            } catch (error) {
                showToast("Error", error.message, "error")
                setUser(null);
            }
        }

        getUser();
    }, [postedBy, showToast])


    if (!user) return null;
    return (
        <Box>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size='md' name={user?.name} src={user?.profilePic} onClick={(e) => {
                        e.preventDefault()
                        navigate(`/${user?.username}`)
                    }
                    } />
                    <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        {post?.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
                        {post?.replies[0] &&
                            <Avatar
                                size='xs'
                                name={post?.replies[0].username}
                                src={post?.replies[0].profilePic}
                                position={"absolute"}
                                top={"0px"}
                                left='15px'
                                padding={"2px"}
                            />
                        }
                        {post?.replies[1] &&
                            <Avatar
                                size='xs'
                                name={post?.replies[1].username}
                                src={post?.replies[1].profilePic}
                                position={"absolute"}
                                top={"0px"}
                                left='15px'
                                padding={"2px"}
                            />
                        }
                        {post?.replies[2] &&
                            <Avatar
                                size='xs'
                                name={post?.replies[2].username}
                                src={post?.replies[2].profilePic}
                                position={"absolute"}
                                top={"0px"}
                                left='15px'
                                padding={"2px"}
                            />
                        }
                    </Box>
                </Flex>

                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"md"} _hover={{textDecoration:"underline"}} cursor={"pointer"} fontWeight={"bold"}
                                onClick={(e) => {
                                    e.preventDefault()
                                    navigate(`/${user?.username}`)
                                }
                                }
                            >
                                {user?.username}
                            </Text>
                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>
                            <Text fontSize={"xs"} textAlign={"right"} w={36} color={"gray.light"}>
                                {(formatDistanceToNow(new Date(post?.createdAt)))} ago
                            </Text>
                    </Flex>

                    <Box  cursor={"pointer"} onClick={(e)=>{
                        e.preventDefault();
                        navigate(`/${user?.username}/post/${post._id}`)
                    }}>
                    <Text fontSize={"sm"} mb={2}>{post?.text}</Text>
                    {post?.image && <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                        <Image src={post?.image} w={"full"} />
                    </Box>}
                    </Box>


                    <Flex gap={3} my={1}>
                        <Actions post={post} />
                    </Flex>


                    
                </Flex>
            </Flex>
        </Box>
    );
};

export default Post;