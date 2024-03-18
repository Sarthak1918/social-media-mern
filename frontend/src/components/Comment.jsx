import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Actions from "./Actions";

const Comment = ({comment,createdAt,likes,userName,avatar}) => {
    const[liked,setLiked] = useState(false)
	return (
		<>
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Avatar src={avatar} size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{userName}
						</Text>
                        <Text>{createdAt} ago</Text>
					</Flex>
					<Text>{comment}</Text>
                    <Flex>
                    <Actions liked={liked} setLiked={setLiked}/>
                </Flex>
                <Text>{likes + (liked?1:0)} likes</Text>
				</Flex>
                
			</Flex>
			<Divider />
		</>
	);
};

export default Comment;