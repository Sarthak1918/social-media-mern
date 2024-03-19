import { Router } from "express";
import { createPost, deletePost, getFeedPosts, getPost, likeUnlikePost, replyToPost } from "../controllers/post.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/feed",verifyUserJWT,getFeedPosts)
router.post("/create",verifyUserJWT,createPost)
router.get("/:id",verifyUserJWT,getPost)
router.delete("/:id",verifyUserJWT,deletePost)
router.post("/like/:id",verifyUserJWT,likeUnlikePost)
router.post("/reply/:id",verifyUserJWT,replyToPost)

export default router;

