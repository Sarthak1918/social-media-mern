import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, CloseButton, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { LuImagePlus } from "react-icons/lu";
import usePreviewImage from '../hooks/usePreviewImage';
import { IoCloseCircle, IoCloseCircleSharp } from "react-icons/io5";
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useCustomToast from '../hooks/useCustomToast';



function CreatePost() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleImageChange, imageUrl, setImageUrl } = usePreviewImage()
    const[postText,setPostText] = useState('')
    const imgRef = useRef()
    const user = useRecoilValue(userAtom)
    const showToast = useCustomToast()
    const[loading,setLoading] = useState(false);


    const handleCreatePost = async () => {
        if(loading){
            return;
        }
        setLoading(true)
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({postedBy : user._id,text:postText ,image: imageUrl}),
            })

            const data = await res.json();
            if(data.success === false){
                showToast("Error",data.message,"error")
            }else{
                showToast("Success",data.message,"success")
                setPostText('')
                setImageUrl(null)
                onClose()
            }
        } catch (error) {
            showToast("Error",error,"error")
        }finally{
            setLoading(false)
        }
    }





    return (
        <>
            <Button
                position={"fixed"}
                bottom={10}
                right={10}
                leftIcon={<AddIcon />}
                onClick={onOpen}
            >
                Post
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            
                            <Textarea placeholder="What's on your mind?" value={postText} onChange={(e)=>setPostText(e.target.value)}/>
                            <Box my={4}>
                                <LuImagePlus size={20} cursor={"pointer"} onClick={() => imgRef.current.click()} />
                            </Box>
                            <Input type='file' hidden ref={imgRef} onChange={handleImageChange} />
                        </FormControl>
                    </ModalBody>
                    {
                        imageUrl && <Flex justifyContent={"center"}  w={"full"}  position={"relative"}>
                                <Image src={imageUrl} maxW={"70%"}/>
                                <CloseButton style={{position:'absolute',top:"0px",right:"20px"}} size={20} onClick={()=>setImageUrl(null)} />
                        </Flex>
                    }
                    <ModalFooter>
                        <Button loadingText="Posting" colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
                            Post
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>



        </>

    )
}

export default CreatePost