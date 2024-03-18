import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/create",verifyUserJWT,createPost)

export default router;

