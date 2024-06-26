import UserModel from "../models/UserModel.js";
import {comparePassword, hashPassword} from "../helper/AuthHelper.js";
import  jwt  from 'jsonwebtoken';

export const registerController = async(req, res) => {
   try {
      const {username, useremail, password, phone} = req.body;
      if(!username){
         return res.send({
            message: "Name is Required"
         })
      }
      if(!useremail){
         return res.send({
            message: "Email is Required"
         })
      }
      if(!phone){
         return res.send({
            message: "Phone is Required"
         })
      }
      if(!password){
         return res.send({
            message: "Password is Required"
         })
      }

      // check user
      const existingUser = await UserModel.findOne({useremail});
      if(existingUser){
         return res.status(200).send({
            success: false,
            message: "Already Regiester please Login"
         })
      }

      // register user
      const hashedPassword = await hashPassword(password);
      // save
      const user = await new UserModel({
         username,
         useremail,
         phone,
         password: hashedPassword,
      }).save();

      res.status(201).send({
         success: true,
         message: "User Registered Succesfully",
         user
      })
   } catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         message: "Error in Registration",
         error
      })
   }
};

// Login POST
export const loginController = async(req, res) => {
   try {
      const {useremail, password} = req.body;
      // validation
      if(!useremail || !password){
         return res.status(404).send({
            success: false,
            message: "Invalid Email or Password"
         })
      } 
      // Check user
      const user = await UserModel.findOne({useremail});
      if(!user){
         return res.status(404).send({
            success: false,
            message: "Email is not Register"
         })
      }
      const match = await comparePassword(password, user.password)
      if(!match){
         return res.status(404).send({
            success: false,
            message: "Invalid Password"
         })
      }
      // Token
      const token = await jwt.sign(
         {
            _id: user._id
         }, 
         process.env.JWT_SECRET,
         {
            expiresIn: "2d",
         });
         res.status(200).send({
            success: true,
            message: "Login Successfully",
            user:{
               user: user.username,
               email: user.useremail,
               phone: user.phone,
            },
            token,
         })
   } catch (error) {
      console.log(error);
      res.status(404).send({
         success: false,
         message: "Error in Login",
         error
      })
   }
};

export const forgetPasswordcontroller = async(req, res) => {
   try {
      const {useremail, password, newPassword} = req.body;
      if(!useremail){
         res.status(400).send({
            message: "Email is Required"
         })
      }
      if(!password){
         res.status(400).send({
            message: "Old Password is Required"
         })
      }
      if(!newPassword){
         res.status(400).send({
            message: "New Password is Required"
         })
      }
      // check
      const user = await UserModel.findOne({useremail});
      if(!user){
         return res.status(404).send({
            success: false,
            message: "Wrong Email"
         })
      }
      const hashed = await hashPassword(newPassword)
      await UserModel.findByIdAndUpdate(user._id, {password: hashed})
      res.status(200).send({
         success: true,
         message: "Password Update Successfully",
      })
   } catch (error) {
      console.log(error)
      res.status(404).send({
         success: false,
         message: "Something went wrong",
         error
      })
   }
}

// get all user list

export const allUserController = async(req, res) => {
   try {
      const user = await UserModel.find({});
      res.status(200).send({
         success: true,
         message: "All User List",
         user,
      })
   } catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         error,
         message: "Error whilw getting all user list"
      })
   }
}