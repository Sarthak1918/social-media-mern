import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import authScreenAtom from '../atoms/authAtom';
import { useSetRecoilState } from 'recoil';
import useCustomToast from '../hooks/useCustomToast';
import userAtom from '../atoms/userAtom';


export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)

  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const setUserState = useSetRecoilState(userAtom)
  const showToast = useCustomToast()
  const [loading,setLoading] = useState(false);
  
  const[inputs,setInputs] = useState({
    name:"",
    username:"",
    email:"",
    password: "",
  })

 
  
  const handleSignup = async()=>{
    if(loading){
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user/signup",{
        method : "POST",
        headers :{
          "Content-Type":"application/json"
        },
        body : JSON.stringify(inputs)
      })

      const data = await res.json()
      console.log(data);
      if(data.success === false){
       showToast("Error",data.message,"error")
        return;
      }else{
        localStorage.setItem("user-cb",JSON.stringify(data.data))
        setUserState(data.data)
        showToast("Success",data.message,"success")
      }
    } catch (error) {
      showToast("Error",error,"error")
    }
  }


  return (
    <Flex  justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired >
                  <FormLabel>Name</FormLabel>
                  <Input type="text" value={inputs.name}
                  onChange={(e)=>setInputs((inputs)=>({...inputs, name: e.target.value}))}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text"  value={inputs.username}
                  onChange={(e)=>setInputs((inputs)=>({...inputs, username: e.target.value}))}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl  isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email"  value={inputs.email} 
              onChange={(e)=>setInputs((inputs)=>({...inputs, email: e.target.value}))}/>
            </FormControl>
            <FormControl  isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}   value={inputs.password} 
                onChange={(e)=>setInputs((inputs)=>({...inputs, password: e.target.value}))}/>
                <InputRightElement h={'full'}>
                  <button
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <FaEye/> :<FaEyeSlash/>}
                  </button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button loadingText="Signing in" size="lg" bg={'blue.400'} color={'white'} _hover={{bg: 'blue.500'}}
                onClick={handleSignup}
                isLoading={loading}
                >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}
                onClick={()=>setAuthScreenState("login")}
                >Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}