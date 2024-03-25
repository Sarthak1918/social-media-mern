import { Router } from "express";
import { followUnFollowUser, getCurrentUser, getFollowers, getFollowing, getSuggestedUsers, getUserProfile, loginUser, logoutUser, searchUser, signupUser, updateUser } from "../controllers/user.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser)
router.get("/current-user",verifyUserJWT,getCurrentUser)
router.post("/follow/:id",verifyUserJWT,followUnFollowUser)
router.post("/update",verifyUserJWT,updateUser)
router.get("/profile/:query",getUserProfile) //not a protected route
router.get("/search",verifyUserJWT,searchUser)
router.get("/suggestedUsers",verifyUserJWT,getSuggestedUsers)
router.get("/:userId/followers",verifyUserJWT,getFollowers)
router.get("/:userId/following",verifyUserJWT,getFollowing)

export default router;

