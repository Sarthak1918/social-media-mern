import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Comment = ({comment}) => {
	return (
		<>
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Avatar name={comment?.username} src={comment?.userProfilePic}  size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Link to={`/${comment?.username}`}>
							<Text  fontSize='sm' fontWeight='bold' _hover={{textDecoration:"underline"}}>{comment.username}</Text>
							
						</Link>
					</Flex>
					<Text>{comment.text}</Text>
                    <Flex>
                </Flex>
				</Flex>
			</Flex>
			<Divider />
		</>
	);
};

export default Comment;