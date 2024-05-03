import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import {errorHandler} from "../utils/error.js"
import jwt from "jsonwebtoken"
export const signup = async (req, res, next) => {
  const {username, email, password} = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({username, email, password: hashedPassword})
  try {
    await newUser.save()
    res.status(201).json({message: "User created successfully"})
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const {email, password} = req.body
  console.log("singed user is ", email)
  try {
    const validUser = await User.findOne({email})
    if (!validUser) return next(errorHandler(404, "User not found"))
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, "wrong credentials"))
    if(!validUser.userStatus)return next(errorHandler(401, "Account blocked by admin"))
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
    const {password: hashedPassword, ...rest} = validUser._doc
    const expiryDate = new Date(Date.now() + 3600000) // 1 hour
    res
      .cookie("access_token", token, {httpOnly: true, expires: expiryDate})
      .status(200)
      .json(rest)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const admin = {
  mail: "admin@gmail.com",
  adminPassword: "$2a$10$YNisB8MzLk8MqzmZd4A5AexWagLT1LXI2iypPOdHYYqTefbHFiaPC",
  profilePicture:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
}
export const admin_signin = async (req, res, next) => {
  const {email, password} = req.body
  console.log(email, "try to login as admin")
  try {
    if (!(email===admin.mail))return next(errorHandler(404, "Admin not found"))
    const validPassword = bcryptjs.compareSync(password, admin.adminPassword)
    if (!validPassword) return next(errorHandler(401, "wrong credentials"))
    const token = jwt.sign({id:admin.mail}, process.env.JWT_SECRET)
    
    const expiryDate = new Date(Date.now() + 3600000) // 1 hour
    const data = {
      admin :admin.mail,
      time:new Date(),
      success:true,
      profilePicture:admin.profilePicture
    }
    res
      .cookie("access_token", token, {httpOnly: true, expires: expiryDate})
      .status(200)
      .json(data)
  } catch (error) {
    console.log(error)
    next(error)
  }
}
