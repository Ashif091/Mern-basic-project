import User from "../models/user.model.js"
import {errorHandler} from "../utils/error.js"
import bcryptjs from "bcryptjs"

export const getUsers = async (req, res, next) => {
  try {
    const queryData = req.query.Qdata
    let filter = {}
    if (queryData) {
      filter = {
        $or: [
          {email: {$regex: queryData, $options: "i"}},
          {username: {$regex: queryData, $options: "i"}},
        ],
      }
    }
    const userData = await User.find(filter)
    if (!userData) {
      return next(errorHandler(404, "No users found!"))
    }
    console.log(`data in server ${userData}`)
    res.status(200).json(userData)
  } catch (error) {
    next(error)
  }
}

export const addUser = async (req, res, next) => {
  const {username, email} = req.body
  if (!username) return res.status(201).json({error: "User name mandatory"})
  if (!email) return res.status(201).json({error: "User Email mandatory"})
  if (!username) return res.status(201).json({error: "User name mandatory"})
  console.log("add user _______")
  let userData = await User.find({email: email})
  if (userData.length)
    return res.status(201).json({error: "User already exist"})
  userData = await User.find({username: username})
  if (userData.length)
    return res.status(201).json({error: "User name already taken"})
  const hashedPassword = bcryptjs.hashSync("abc", 10)
  const newUser = new User({username, email, password: hashedPassword})
  try {
    await newUser.save()
    userData = await User.find()
    res.status(201).json(userData)
  } catch (error) {
    next(error)
  }
}
export const editUser = async (req, res, next) => {
  try {
    const {username, email, id} = req.body
    if (!username) return res.status(400).json({error: "Username is mandatory"})
    if (!email) return res.status(400).json({error: "Email is mandatory"})
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({error: "User not found"})
    }
    const existingUsername = await User.findOne({
      username: username,
      _id: {$ne: id},
    })
    if (existingUsername) {
      return res.status(400).json({error: "Username already taken"})
    }
    const existingEmail = await User.findOne({email: email, _id: {$ne: id}})
    if (existingEmail) {
      return res.status(400).json({error: "Email already taken"})
    }
    user.username = username
    user.email = email
    await user.save()
    const userData = await User.find()
    res
      .status(200)
      .json(userData)
  } catch (error) {
    next(error)
  }
}

export const removeUser = async (req, res, next) => {
  try {
    let userData = await User.findByIdAndDelete(req.params.id)
    if (!userData)
      return next(errorHandler(401, "can't find the data from db!"))
    userData = await User.find()
    res.status(200).json(userData)
  } catch (error) {
    next(error)
  }
}

export const blockUser = async (req, res, next) => {
  try {
    let userData = await User.findById(req.params.id)
    if (!userData)
      return next(
        errorHandler(401, "Can't find the user data in the database!")
      )

    userData.userStatus = !userData.userStatus
    await userData.save()
    const allUsers = await User.find()
    res.status(200).json(allUsers)
  } catch (error) {
    next(error)
  }
}
