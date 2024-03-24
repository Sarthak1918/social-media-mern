import { Button, Flex } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useCustomToast from '../hooks/useCustomToast'
import { LuLogOut } from 'react-icons/lu'

function LogoutBtn({ text }) {
    const showToast = useCustomToast()
    const setUserState = useSetRecoilState(userAtom)
    const handleLogout = async () => {
        try {
            const res = await fetch("/api/user/logout")
            const data = await res.json()
            if (data.success === false) {
                showToast("Error", data.message, "error")
                return;
            }
            else {
                localStorage.removeItem("user-cb")
                setUserState(null)
                showToast("Success", data.message, "success")
            }
        } catch (error) {
            showToast("Error", error, "error")

        }
    }

    return (
        <Button onClick={handleLogout} px={2} py={1} textAlign={"center"}>
                <LuLogOut size={19}/>
                {text?text:""}
        </Button>
    )
}

export default LogoutBtn