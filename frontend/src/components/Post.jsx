import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useCustomToast from "../hooks/useCustomToast";
import { formatDistanceToNow } from "date-fns"
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
const Post = ({ post, postedBy }) => {
    const [user, setUser] = useState(null);
    const showToast = useCustomToast()
    const navigate = useNavigate();
    const currentUser = useRecoilValue(userAtom)
    const [isDeleting, setIsDeleting] = useState(false);
    const [posts, setPosts] = useRecoilState(postsAtom)

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

    const postDeleteHandler = async (e) => {
        if (isDeleting) return;
        setIsDeleting(true)
        try {
            e.preventDefault();
            if (!window.confirm("Are you sure you want to delete this post?")) return;
            const res = await fetch(`/api/post/delete/${post._id}`, {
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
                setPosts(posts.filter(p => p._id !== post._id))
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsDeleting(false);
        }
    }


    if (!user) return null;
    return (
        <Box mb={16}>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>

                        <Flex w={"full"} alignItems={"center"}>
                            <Avatar size='md' name={user?.name} src={user?.profilePic} onClick={(e) => {
                                e.preventDefault()
                                navigate(`/${user?.username}`)
                            }
                            } />
                            <Text ml={2} fontSize={"md"} _hover={{ textDecoration: "underline" }} cursor={"pointer"} fontWeight={"bold"}
                                onClick={(e) => {
                                    e.preventDefault()
                                    navigate(`/${user?.username}`)
                                }
                                }
                            >
                                {user?.username}
                            </Text>
                            <Image src='/verified.png' ml={1} w={4} h={4}  />
                        </Flex>
                        <Flex gap={5} alignItems={"center"}>
                            <Text fontSize={"xs"} textAlign={"right"} w={36} color={"gray.light"}>
                                {formatDistanceToNow(new Date(post?.createdAt))} ago
                            </Text>

                            {user?._id === currentUser?._id && <DeleteIcon cursor={"pointer"} onClick={postDeleteHandler} />}
                        </Flex>

                    </Flex>

                    <Box cursor={"pointer"} onClick={(e) => {
                        e.preventDefault();
                        navigate(`/${user?.username}/post/${post._id}`)
                    }}>
                        <Text fontSize={"md"}  mb={3}>{post?.text}</Text>
                        {post?.image && <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                            <Image src={post?.image} w={"full"} />
                        </Box>}
                    </Box>





                    <Flex gap={3} my={1}>
                        <Actions post={post} />
                    </Flex>



                </Flex>
        </Box>
    );
};

export default Post;