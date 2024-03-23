import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    InputGroup,
    InputRightElement,
    Center,
    Text,
    Textarea
} from '@chakra-ui/react'

import { SmallCloseIcon } from '@chakra-ui/icons'

import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import usePreviewImage from '../hooks/usePreviewImage'
import useCustomToast from '../hooks/useCustomToast'

export default function UpdateProfilePage() {
    const [showPassword, setShowPassword] = useState(false)
    const user = useRecoilValue(userAtom)
    const setUser = useSetRecoilState(userAtom)

    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        email:  "",
        bio:  "",
        password: "",
    })

    const[updating,setUpdating] = useState(false); //when the user is clicking on submit button there should be a loading state (loader)


    const fileRef = useRef()

    const { handleImageChange, imageUrl } = usePreviewImage()

    const showToast = useCustomToast()


    async function handleSubmit(e) {
        e.preventDefault();
        if(updating){ //if the user clicks on the submit button while loading it will do nothing
            return;
        }
        setUpdating(true)
        try {
            const res = await fetch(`/api/user/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputs, profilePic: imageUrl })
            })
            const data = await res.json();
            if (data.success === false) {
                showToast("Error", data.message, "error")
                return;
            } else {
                setUser(data.data)
                localStorage.setItem("user-cb", JSON.stringify(data.data))
                showToast("Success", data.message, "success")
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        }finally{
            setUpdating(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <Flex
                align={'center'}
                justify={'center'}
            >
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    px={8}
                    py={6}
                    my={5}>
                    <Heading lineHeight={1.1} fontSize={{ base: 'xl', sm: 'xl' }}>
                        User Profile Edit
                    </Heading>
                    <Text fontSize={"smaller"}>
                        kindly empty the fields that you dont want to change
                    </Text>
                    <FormControl >
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src={imageUrl || user.profilePic} >
                                <AvatarBadge
                                    as={IconButton}
                                    size="sm"
                                    rounded="full"
                                    top="-10px"
                                    colorScheme="red"
                                    aria-label="remove Image"
                                    icon={<SmallCloseIcon/>}
                                />
                                </Avatar>
                            </Center>
                            <Center w="full">
                                <Button w="full" onClick={() => fileRef.current.click()}>Change Avatar</Button>
                                <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl>
                        <FormLabel>full name</FormLabel>
                        <Input
                            placeholder={user ? user.name : "Full Name"}
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={inputs.name}
                            onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>User name</FormLabel>
                        <Input
                            placeholder={user?.username || "User Name"}
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={inputs.username}
                            onChange={(e) => setInputs((prev) => ({ ...prev, username: e.target.value }))}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder={user ? user.email : "Email Address"}
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            value={inputs.email}
                            onChange={(e) => setInputs((prev) => ({ ...prev, email: e.target.value }))}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Bio</FormLabel>
                        <Textarea
                            placeholder={user?.bio || "Bio"}
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={inputs.bio}
                            onChange={(e) => setInputs((prev) => ({ ...prev, bio: e.target.value }))}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'}
                                value={inputs.password}
                                onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}
                            />
                            <InputRightElement h={'full'}>
                                <button
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}>
                            Cancel
                        </Button>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'blue.500',
                            }}
                            type='submit'
                            isLoading={updating}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    )
}