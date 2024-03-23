import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	Icon,
	Input,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom";
import useCustomToast from "../hooks/useCustomToast";
import { BsReply } from "react-icons/bs";
import Comment from "./Comment";
import "../App.css";
import postsAtom from "../atoms/postsAtom";

const Actions = ({ post }) => {
	const user = useRecoilValue(userAtom)
	const showToast = useCustomToast();

	const [posts, setPosts] = useRecoilState(postsAtom); // This is a dummy state
	const [liked, setLiked] = useState(post?.likes.includes(user?._id));
	const [isLiking, setIsLiking] = useState(false);
	const [reply, setReply] = useState("");
	const [commentBoxVisible, setCommentBoxVisible] = useState(false);


	const handleLikeUnlike = async () => {
		if (isLiking) return;  // Prevent multiple clicks while processing request
		setIsLiking(true)
		if (!user) {
			showToast("Error", "Please login to like posts", "error")
			return;
		}
		try {
			const res = await fetch(`/api/post/like/${post._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				}
			})

			const data = await res.json();
			console.log(data);
			if (data.success === false) {
				showToast("Error", data.message, "error")
				return;
			}

			if (!liked) {
				const updatedPosts = posts.map((p) => p._id === post._id ? { ...p, likes: [...p.likes, user._id] } : p)
				setPosts(updatedPosts)
			} else {
				const updatedPosts = posts.map((p) => p._id === post._id ? { ...p, likes: p.likes.filter((id) => id !== user._id) } : p)
				setPosts(updatedPosts)
			}
			setLiked(!liked)
			// showToast("Success", data.message, "success")
		} catch (error) {
			showToast("Error", data.message, "error")
		} finally {
			setIsLiking(false)
		}
	}


	const handleComment = async () => {
		if (!user) {
			showToast("Error", "Please login to comment on posts", "error")
			return;
		}
		try {
			const res = await fetch(`/api/post/reply/${post._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: reply })
			})

			const data = await res.json();
			if (data.success === false) {
				showToast("Error", data.message, "error")
				return;
			}
			setPosts(posts.map((p) => p._id === post._id ? { ...p, replies: [...p.replies, data.data] } : p))
			setReply("")
			showToast("Success", data.message, "success")
		} catch (error) {
			showToast("Error", data.message, "error")
		}

	}

	return (
		<Flex direction={"column"} w={"full"}>
			<Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
				<svg
					aria-label='Like'
					color={liked ? "rgb(237, 73, 86)" : ""}
					fill={liked ? "rgb(237, 73, 86)" : "transparent"}
					height='19'
					role='img'
					viewBox='0 0 24 22'
					width='20'
					onClick={handleLikeUnlike}
					cursor={"pointer"}
				>
					<title>Like</title>
					<path
						d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
						stroke='currentColor'
						strokeWidth='2'
					></path>
				</svg>

				<svg
					aria-label='Comment'
					color=''
					fill=''
					height='20'
					role='img'
					viewBox='0 0 24 24'
					width='20'
					cursor={"pointer"}
					onClick={()=>setCommentBoxVisible((prev)=>!prev)}
				>
					<title>Comment</title>
					<path
						d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
						fill='none'
						stroke='currentColor'
						strokeLinejoin='round'
						strokeWidth='2'
					></path>
				</svg>


				<ShareSVG />



			</Flex>

			<Flex gap={2} alignItems={"center"}>
				<Text color={"gray.light"} fontSize='sm'>
					{post?.replies.length} replies
				</Text>
				<Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
				<Text color={"gray.light"} fontSize='sm'>
					{post?.likes.length} likes
				</Text>
			</Flex>

			{/* comment box */}

			<Box hidden={commentBoxVisible}>
			<Divider my={4} />
			<Box maxH="200px" overflowY="auto">
				{
					post?.replies.map((comment) => {
						return <Comment key={comment._id} comment={comment} />
					})
				}
			</Box>

			<FormControl display={"flex"} py={4} gap={2} alignItems={"center"} justifyContent={"space-between"}>
				<Avatar w={8} h={8} name={user?.name} src={user?.profilePic} />
				<Input placeholder="Add a comment..." value={reply} onChange={(e)=>setReply(e.target.value)}/>
				<Button colorScheme="blue" w={5} onClick={handleComment}>
					<Icon as={BsReply} />
				</Button>
			</FormControl>
			</Box>
			


		</Flex>
	);
};

export default Actions;



const ShareSVG = () => {
	return (
		<svg
			aria-label='Share'
			color=''
			fill='rgb(243, 245, 247)'
			height='20'
			role='img'
			viewBox='0 0 24 24'
			width='20'
		>
			<title>Share</title>
			<line
				fill='none'
				stroke='currentColor'
				strokeLinejoin='round'
				strokeWidth='2'
				x1='22'
				x2='9.218'
				y1='3'
				y2='10.083'
			></line>
			<polygon
				fill='none'
				points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
				stroke='currentColor'
				strokeLinejoin='round'
				strokeWidth='2'
			></polygon>
		</svg>
	);
};