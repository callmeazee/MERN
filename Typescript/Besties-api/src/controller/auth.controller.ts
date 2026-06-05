import {Request, Response} from 'express'
import AuthModel from '../model/auth.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const accessTokenExpiry = '15m'

interface PayloadInterface{
     id: mongoose.Types.ObjectId
     fullname: string
     email: string 
     mobile: string 
}

const generateToken = (payload: PayloadInterface) => {
     const accessToken = jwt.sign(payload, process.env.AUTH_SECRET!, { expiresIn: accessTokenExpiry })
     
     return accessToken

}



export const signup = async(req: Request, res: Response) => {
     try {
        await  AuthModel.create(req.body) 
          res.status(200).json("signup success")
          
     } catch (err:any) {
     res.status(500).json({message:err.message})
     }
  
     
}



export const login = async(req: Request, res: Response) => {
     try {
          const { email, password } = req.body
          
       const user =  await AuthModel.findOne({ email: email })
          //also we can write this as
          // AuthModel.findOne({ email })

          if (!user)
               throw new Error("User not found, please Sign up first ")
          const isLogin = await bcrypt.compare(password, user.password)
          
          if (!isLogin)
               throw new Error("invalid credential, email or password is inscorrect")
          

          const payload = {
               id: user._id,
               fullname: user.fullname,
               mobile: user.mobile,
               email: user.email
          }

          const options = {
               httpOnly: true,
               maxAge:(60 * 15)
          }
          
          const accessToken = generateToken(payload)
          
          res.cookie("accesstoken", accessToken, options)
          res.json({ message: "Login success" })
          
     } catch (err: any ) {
        res.status(500).json({message:err.message})
     }
     
}