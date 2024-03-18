import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const createPost = AsyncHandler(async (req, res) => {
    const { postedBy, text, img } = req.body;

    if (!postedBy || !text) {
        throw new ApiError(400, "Postedby and text fields are required");
    }

    const user = await User.findById(postedBy);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (user._id.toString() !== req.user._id.toString()) {
        throw new ApiError(401, "Unauthorized to create post");
    }

    const maxLength = 500;
    if (text.length > maxLength) {
        throw new ApiError(401, `Text must be less than ${maxLength} characters`);
    }

    // if (img) {
    // 	const uploadedResponse = await cloudinary.uploader.upload(img);
    // 	img = uploadedResponse.secure_url;
    // }

    const newPost = await Post.create({
        postedBy,
        text,
        img
    });

    res.status(201).json(
        new ApiResponse(201, newPost, "Post Created Successfully")
    );
})