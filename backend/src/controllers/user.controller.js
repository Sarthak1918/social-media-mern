import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { generateToken } from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt"

export const signupUser = AsyncHandler(async(req,res)=>{
    const{name,email,username,password,profilePic} = req.body
    //check if user exists in the database
    if ([name, email,username, password].some((field) => (field?.trim() === ""))) {
        throw new ApiError(400, "All fields are mandatory")
    }

    const userExist = await User.findOne({$or:[{email},{username}]})
    if(userExist){
        throw new ApiError(409,"User already exist");
    }

    const newUser = await User.create({
        name,
        email,
        password,
        username
        
    })

    const userCreated = await User.findById(newUser._id).select("-password -followers -following")  // checking if the new user is available on mongodb
        if (userCreated) {
            generateToken(newUser._id, res);
            res.status(201).json(
                new ApiResponse(201, userCreated, "User Created Successfully")
            )
        } else {
            throw ApiError(500, "Something error occurred while creating user.Try Again")
        }

    
})

export const loginUser = AsyncHandler(async(req,res)=>{
    const { username, password } = req.body
    if (!username) {
        throw new ApiError(400, "username is required")
    }

    const user = await User.findOne({ username })
    if (!user) {
        throw new ApiError(404, "User does not exists")
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid  user credentials")
    }

    generateToken(user._id,res)
    
    const loggedInUser = await User.findById(user._id).select("-password -followers -following")
    res.status(201).json(
        new ApiResponse(201,loggedInUser,"Logged in Successfully")
    )
})

export const logoutUser = AsyncHandler(async(req,res)=>{
    res.cookie("jwt",'',{httpOnly:true,maxAge:1})
    res.status(200).json(
        new ApiResponse(200,{},"Logged out successfully")
    )
})

export const getCurrentUser = AsyncHandler(async (req, res) => {
    const currentUser = req.user
    return res.status(200).json(
        new ApiResponse(200,currentUser
        , "Current user fetched successfully")
    )
})

export const followUnFollowUser = AsyncHandler(async(req,res)=>{
        const{id} = req.params
        const userToModify = await User.findById(id)
        const currentUser = await User.findById(req.user._id);
    
        if(req.user._id.toString() === id.toString()){
            throw new ApiError(400,"You can't follow yourself!")
        }
    
        if(!userToModify || !currentUser){
            throw new ApiError(400,"User not Found")
        }
    
        const isFollowing = currentUser.following.includes(id)
        if (isFollowing) {
            // Unfollow user
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } }); //pull(remove) the currentLoggedIn user'id from follower's list of requestedUser(the user whom the current user wanted to follow/unfollow )
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } }); //pull(remove) the requestedUser'id from following's list of current user
            res.status(200).json(
                new ApiResponse(200,{},"User unfollowed successfully")
            );
        } else {
            // Follow user
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            res.status(200).json(
                new ApiResponse(200,{},"User followed successfully")
            );
        }   

})

export const updateUser = AsyncHandler(async(req,res)=>{
        const userId = req.user._id
        const{name,username,email,password,bio} = req.body
        let {profilePic} = req.body
    
        let user = await User.findById(userId).select("-password -following -followers")
        if(!user) {
            throw new ApiError(400,"User not found")
        }
        
        if(password){
            const hashedPassword = await bcrypt.hash(password,8)
            user.password = hashedPassword
        }

        if(email){
            const isUserExist = await User.findOne({email})
            if(isUserExist){
                throw new ApiError(400,"Email already exists")
            }else{
                user.email= email
            }
        }
        if(username){
            const isUserExist = await User.findOne({username})
            if(isUserExist){
                throw new ApiError(400,"username already exists!Try Different one")
            }else{
                user.username = username
            }
        }

        if (profilePic) {
			if (user.profilePic!="") {
				await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(profilePic,{
                resource_type : "auto",
            });
			profilePic = uploadedResponse.secure_url;
		}

        user.name = name || user.name
        user.bio = bio || user.bio
        user.profilePic = profilePic || user.profilePic
    
        await Post.updateMany(
            {"replies.userId":userId},
            {
                $set:{
                    "replies.$[reply].username":user.username,
                    "replies.$[reply].userProfilePic":user.profilePic
                }
            },
            {
                arrayFilters:[{"reply.userId":userId}]
            })

        user = await user.save()
        res.status(200).json(
            new ApiResponse(200,user,"User  updated Successfully")
        )
})

export const getUserProfile = AsyncHandler( async (req, res) => {
	// We will fetch user profile either with username or userId
	// query is either username or userId
	const { query } = req.params;

		let user;

		// query is userId
		if (mongoose.Types.ObjectId.isValid(query)) {
			user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
		} else {
			// query is username
			user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
		}

		if (!user) throw new ApiError(404,"User not found!");

		res.status(200).json(
            new ApiResponse(200,user,"User Profile Fetched successfully.")
        );

	
})

export const searchUser = AsyncHandler(async(req,res)=>{
    const {query} = req.query
    if (!query) {
        throw new ApiError(400, "Query is required")
    }
    const users = await User.find({ $or: [{ name: { $regex: query, $options: "i" } }, { username: { $regex: query, $options: "i" } }] }).select("-password")
    res.status(200).json(
        new ApiResponse(200,users,"Users fetched successfully")
    )
})

export const getSuggestedUsers = AsyncHandler(async(req,res)=>{
    const userId = req.user._id; //current user 

    const alreadyFollowingUsers = await User.findById(userId).select("following")

    const users = await User.aggregate([
        {
            $match:{
                _id:{$ne:userId}  //excluded current user
            }
        },
        {
            $sample:{
                size:10
            }
        },
    ])

    const filteredUsers = users.filter((user)=>{
        return !alreadyFollowingUsers.following.includes(user._id) //excluded the users whom the current user is already following
    })
    const suggestedUsers = filteredUsers.slice(0,4);
    //null passwords of suggested users
    suggestedUsers.forEach((user)=>{
        user.password = undefined
    })
    res.status(200).json(
        new ApiResponse(200,suggestedUsers,"Suggested Users fetched successfully")
    )
})

export const getFollowing = AsyncHandler(async(req,res)=>{
    const {userId} = req.params
    if(!userId){
        throw new ApiError(400,"User not found")
    }
    const users = await User.find({followers:userId}).select("name username profilePic followers")
    res.status(200).json(
        new ApiResponse(200,users,"Following fetched successfully")
    )
})

export const getFollowers = AsyncHandler(async(req,res)=>{
    const {userId} = req.params
    if(!userId){
        throw new ApiError(400,"User not found")
    }
    const followers = await User.find({following:userId}).select("name username profilePic followers")

    res.status(200).json(
        new ApiResponse(200,followers,"Followers fetched successfully")
    )
})