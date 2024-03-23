import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = AsyncHandler(async (req, res) => {
    const { postedBy, text } = req.body;
    let{image} = req.body

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

    if (image) {
    	const uploadedResponse = await cloudinary.uploader.upload(image,{
            resource_type : "auto"
        });
    	image = uploadedResponse.secure_url;
    }

    const newPost = await Post.create({
        postedBy,
        text,
        image
    });

    res.status(201).json(
        new ApiResponse(201, newPost, "Post Created Successfully")
    );
})

export const getPost = AsyncHandler(async(req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(id);
    if(!post){
        throw new ApiError(404, "Post not found");
    }
    res.status(200).json(
        new ApiResponse(200, post, "Post Retrieved Successfully")
    );
})

export const deletePost = AsyncHandler(async(req,res)=>{
    const post = await Post.findById(req.params.id);
		if (!post) {
			throw new ApiError(404, "Post not found");
		}

		if (post.postedBy.toString() !== req.user._id.toString()) {
			throw new ApiError(401, "Unauthorized to delete post");
		}

		if (post.image) {
			const imgId = post.image.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json(
            new ApiResponse(200, null, "Post Deleted Successfully")
        );
})

export const likeUnlikePost = AsyncHandler(async(req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(id);
    if(!post){
        throw new ApiError(404, "Post not found");
    }

    const isLiked = post.likes.includes(req.user._id);
    if(isLiked){
        await Post.updateOne({_id: id}, {$pull: {likes: req.user._id}});
        res.status(201).json(
            new ApiResponse(201, null, "Post Disliked")
        );
    }else{
        post.likes.push(req.user._id);
        await post.save();
        res.status(201).json(
            new ApiResponse(201, null, "Post Liked")
        );
    }
})

export const replyToPost = AsyncHandler(async(req,res)=>{
    const{text} = req.body
    const postId = req.params.id
    const userId = req.user._id
    const userProfilePic = req.user.profilePic
    const username = req.user.username

    if(!text){
        throw new ApiError(400, "Text is required");
    }
    const post = await Post.findById(postId);
    if(!post){
        throw new ApiError(404, "Post not found");
    }

    const reply = {userId, text, userProfilePic, username};
    post.replies.push(reply);
    await post.save();

    res.status(201).json(
        new ApiResponse(201, reply, "Reply Added Successfully")
    );
})

export const getFeedPosts = AsyncHandler(async(req,res)=>{
    const userId =  req.user._id
    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const following = user.following; //array of user the loggedin user is following

    if(following.length<1){
        return res.status(200).json(
            new ApiResponse(200, [], "You are not following anyone")
        );
    }
    const feedPosts = await Post.find({postedBy: {$in: following}}).sort({createdAt: -1});
    res.status(200).json(
        new ApiResponse(200, feedPosts, "Feed Posts Retrieved Successfully")
    );
})

export const getUserPosts = AsyncHandler(async(req,res)=>{
    const {username} = req.params;
    const user = await User.findOne({username});
    
    if(!user){
        throw new ApiError(404, "User not found");
    }

    const userPosts = await Post.find({postedBy: user._id}).sort({createdAt: -1});
    res.status(200).json(
        new ApiResponse(200, userPosts, "User Posts Retrieved Successfully")
    );
})