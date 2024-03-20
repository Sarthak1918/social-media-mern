import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Avatar, Button, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom";
import useCustomToast from "../hooks/useCustomToast";
import { useState } from "react";

const UserHeader = ({user}) => {
    const showToast = useCustomToast();

    const currentUser = useRecoilValue(userAtom) //logged in user
    
    const[following,setFollowing] = useState(user?.followers.includes(currentUser?._id));
    const[updating,setUpdating] = useState(false); //whether the user is clicking on follow/unfollow btn there should be a loading state (loader)

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(()=>{
           showToast("Success","Link copied to clipboard","success")
        })
    };

    const handleFollowUnFollow = async()=>{
        if(!currentUser){
            showToast("Error","You need to login first","error")
            return;
        }
        if(updating){ //if the user clicks on the follow/unfollow button while loading it will do
            return;
        }
        setUpdating(true);
        try {
            const res = await fetch(`/api/user/follow/${user._id}`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
            })

            const data = await res.json();
            if(data.success===false){
                showToast("Error",data.message,"error")
                return;
            }
            if(following){
                showToast("Unfollowed","","success")
                user.followers.pop(); //its just a visual update, the actual data is updated in the backend.when we refresh the page followers will be updated to the actual data
            }
            else{
                showToast("Followed","","success")
                user.followers.push(currentUser?._id); //its just a visual update, the actual data is updated in the backend.when we refresh the page followers will be updated to the actual data
            }
            setFollowing(!following);
        } catch (error) {
            showToast("Error",error,"error")
        } finally{
            setUpdating(false)
        }
    }

    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} mb={1} fontWeight={700}>{user?.name}</Text>
                    <Flex alignItems={"center"} gap={2}>
                        <Text fontSize={"sm"}>{user?.username}</Text>
                        <Text fontSize={"x-small"} px={2} py={1} bg={"#dbdbdb"} color={"#a6a6a6"} borderRadius={"xl"} >thread.net</Text>
                    </Flex>
                </Box>

                <Box>
                {
                    user?.profilePic?
                    <Avatar name={user?.name} src={user?.profilePic} size={"xl"} />
                    :<Avatar name={user?.name} src="https://bit.ly/broken-link" size={"xl"} />
                }
                    
                </Box>
            </Flex>

            <Text>{user?.bio}</Text>

            {currentUser?._id===user?._id && 
            <Link to="/update"><Button>Edit Profile</Button></Link>
            }
            {currentUser?._id!==user?._id && 
            <Button onClick={handleFollowUnFollow} isLoading={updating}>
                {following?"Unfollow":"Follow"}
            </Button>
            }

            <Flex justifyContent={"space-between"} w={"full"}>
                <Text>{user?.followers.length} Followers</Text>
                <Flex gap={2}>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
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
            </Flex>

            <Flex w={"full"}>
				<Flex flex={1} borderBottom={"1.5px solid gray"} justifyContent={"center"} pb='3' cursor={"pointer"}>
					<Text fontWeight={"bold"}> Threads</Text>
				</Flex>
				<Flex
					flex={1}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}
				>
					<Text fontWeight={"bold"}> Replies</Text>
				</Flex>
			</Flex>
        </VStack>
    );
};

export default UserHeader;