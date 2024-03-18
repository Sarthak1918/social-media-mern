import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Avatar, Button, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";

const UserHeader = () => {
    const toast = useToast();
    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({
                title: 'Profile Link Copied.',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
        })
    };

    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} mb={1} fontWeight={700}>Mark Zuckerberg</Text>
                    <Flex alignItems={"center"} gap={2}>
                        <Text fontSize={"sm"}>zuck</Text>
                        <Text fontSize={"x-small"} px={2} py={1} bg={"#dbdbdb"} color={"#a6a6a6"} borderRadius={"xl"} >thread.net</Text>
                    </Flex>
                </Box>

                <Box>
                    <Avatar name="Mark" src="zuck-avatar.png" size={"xl"} />
                </Box>
            </Flex>

            <Text>Co Founder and CEO of Meta Platforms</Text>

            <Flex justifyContent={"space-between"} w={"full"}>
                <Text>3.2k Following</Text>
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