import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useCustomToast from '../hooks/useCustomToast'

function LogoutBtn() {
const showToast = useCustomToast()    
const setUserState = useSetRecoilState(userAtom)
 const handleLogout = async() =>{
    try {
        const res = await fetch("/api/user/logout")
        const data = await res.json()
        if(data.success === false){
            showToast("Error",data.message,"error")
            return;
        }
        else{
            localStorage.removeItem("user-cb")
            setUserState(null)
            showToast("Success",data.message,"success")
        }
    } catch (error) {
        showToast("Error",error,"error")

    }
 }
    
  return (
    <Button
    position={"fixed"}
    top={"30px"}
    right={"30px"}
    size={"sm"}
    onClick={handleLogout}
    >Logout</Button>
  )
}

export default LogoutBtn