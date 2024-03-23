import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCustomToast from "./useCustomToast";



const useGetUserProfile = () => {

    const [user, setUser] = useState(null) //user we are viewing/searching
    const [loading, setLoading] = useState(true);
    const { username } = useParams();
    const showToast = useCustomToast()

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/profile/${username}`)
                const data = await res.json()
                if (data.success === false) {
                    showToast("Error", data.message, "error")
                    return;
                }
                else {
                    // showToast("Success",data.message,"success")
                    setUser(data.data) //the first data is the response object and the second data is the actual data object that contains user info
                }
            } catch (error) {
                showToast("Error", error, "error")
                return;
            } finally {
                setLoading(false)
            }
        }
        getUser();
    }, [username,showToast])

    return { user, loading }

}

export default useGetUserProfile;