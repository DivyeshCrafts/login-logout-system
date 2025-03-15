import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {apiResponse} from "../utils/apiResponce.js"
import {generateAccessAndRefreshToken} from "../utils/tokenUtils.js"

const registration = asyncHandler(async (req, res)=>{
    const {username, email, password, city} = req.body

    //validation
    if([username, email, password].some((field)=>field?.trim()==="")){
        throw new ApiError(400, "All fields are required")
    }
    const existUser = await User.findOne({$or:[{username},{email}]})
    if(existUser){
        throw new ApiError(409, "User with email and username already exists")
    }
    const user = await User.create({
        username, email, password, city
    })

    const createduser = await User.findById(user._id).select("-password -refreshToken")
    if(!createduser){
        throw new ApiError(500, "Something went wrong while registering a user")
    }
    return res.status(201).json(new apiResponse(200, createduser, "User registed successfully"))
})

const login = asyncHandler(async (req, res)=>{
    const {email, password} = req.body
    //validation
    if([email, password].some((feild)=>{feild.trim === ""})){
        throw new ApiError(400, "Email and password required")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404, "User not found")
    }
    //password validate
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid credentials")
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user?._id).select("-password -refreshToken")
    if(!loggedInUser){
        throw new ApiError(404, "Logged user not found")
    }
    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production"
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new apiResponse(200, loggedInUser, "User logged successfully"))
})

const logout = asyncHandler(async (req, res)=>{
    const user = await User.findByIdAndUpdate(req.user._id, {$set:{refreshToken:""}}, {new: true})
    const option = {
        httpOnly:true,
        secure: process.env.NODE_ENV == "production"
    }
    return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new apiResponse(200, "User logged out successfully"))
})


export {registration, login, logout}