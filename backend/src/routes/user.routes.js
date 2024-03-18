import { Router } from "express";
import { followUnFollowUser, getCurrentUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from "../controllers/user.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.get("/logout",verifyUserJWT,logoutUser)
router.get("/current-user",verifyUserJWT,getCurrentUser)
router.get("/follow/:id",verifyUserJWT,followUnFollowUser)
router.post("/update",verifyUserJWT,updateUser)
router.get("/profile/:query",getUserProfile) //not a protected route

export default router;

