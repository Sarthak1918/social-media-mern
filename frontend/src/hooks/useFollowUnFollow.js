import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useCustomToast from "./useCustomToast";

const useFollowUnFollow = (user) => {

    const currentUser = useRecoilValue(userAtom) //logged in user
    const [following, setFollowing] = useState(user?.followers.includes(currentUser?._id)); //if the logged in user is following the user or not
    const[updating,setUpdating] = useState(false)
    const showToast = useCustomToast();
    
    const handleFollowUnFollow = async () => {
        if (!currentUser) {
            showToast("Error", "You need to login first", "error")
            return;
        }
        if (updating) { //if the user clicks on the follow/unfollow button while loading it will do
            return;
        }
        setUpdating(true);
        try {
            const res = await fetch(`/api/user/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json();
            if (data.success === false) {
                showToast("Error", data.message, "error")
                return;
            }
            if (following) {
                showToast("Unfollowed", "", "success")
                user?.followers.pop(); //its just a visual update, the actual data is updated in the backend.when we refresh the page followers will be updated to the actual data
            }
            else {
                showToast("Followed", "", "success")
                user?.followers.push(currentUser?._id); //its just a visual update, the actual data is updated in the backend.when we refresh the page followers will be updated to the actual data
            }
            setFollowing(!following);
        } catch (error) {
            showToast("Error", error, "error")
        } finally {
            setUpdating(false)
        }
    }

    return{handleFollowUnFollow,following,updating}
}

export default useFollowUnFollow