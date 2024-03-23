import { Router } from "express";
import { createPost, deletePost, getFeedPosts, getPost, getUserPosts, likeUnlikePost, replyToPost } from "../controllers/post.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/feed",verifyUserJWT,getFeedPosts)
router.post("/create",verifyUserJWT,createPost)
router.get("/:id",verifyUserJWT,getPost)
router.get("/userposts/:username",verifyUserJWT,getUserPosts)
router.delete("/delete/:id",verifyUserJWT,deletePost)
router.put("/like/:id",verifyUserJWT,likeUnlikePost)
router.put("/reply/:id",verifyUserJWT,replyToPost)

export default router;

