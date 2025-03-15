import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username:{type:String, required:true, trim:true, lowercase:true},
    email:{type:String, required:true, trim:true, lowercase:true, index:true},
    password:{type:String, required:true},
    city:{type:String, required:true, trim:true, lowercase:true},
    refreshToken:{type:String, default:""}
}, {timestamps:true})

//password hashing
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//compare password
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

//generate access token - short lived
userSchema.methods.generateAccessToken = async function(){
     return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}

//generate refresh token - long lived
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", userSchema)