import { Router } from "express";
import { createPost, deletePost, getFeedPosts, getPost, likeUnlikePost, replyToPost } from "../controllers/post.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/feed",verifyUserJWT,getFeedPosts)
router.post("/create",verifyUserJWT,createPost)
router.get("/:id",verifyUserJWT,getPost)
router.delete("/:id",verifyUserJWT,deletePost)
router.put("/like/:id",verifyUserJWT,likeUnlikePost)
router.put("/reply/:id",verifyUserJWT,replyToPost)

export default router;

