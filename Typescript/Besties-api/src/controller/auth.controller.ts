import {Request, Response} from 'express'
import AuthModel from '../model/auth.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { CatchError, TryError} from '../utils/error'


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
          await AuthModel.create(req.body)
          res.json("signup success")
          
     } catch (err: unknown) {
          //we have centralized this code and put it under error.ts
          //      if (err instanceof Error)
          //      {
          //           const status = (err as ErrorMessage).status || 500
          //           res.status(status).json({message:err.message})
          //      }
          // }
          

          CatchError(err, res)
     }
     
  
     
}



export const login = async(req: Request, res: Response) => {
     try {
          const { email, password } = req.body
          
       const user =  await AuthModel.findOne({ email: email })
          //also we can write this as
          // AuthModel.findOne({ email })

          if (!user)
          
           throw     TryError("User not found, please Sign up first" , 404)
          
               
          const isLogin = await bcrypt.compare(password, user.password)
          
          if (!isLogin)
        throw TryError("invalid credential, email or password is inscorrect", 401)
          

          const payload = {
               id: user._id,
               fullname: user.fullname,
               mobile: user.mobile,
               email: user.email
          }

          const options = {
               httpOnly: true,
               maxAge: (60 * 15) * 1000,
               secure: false,
               domain: 'localhost'
          }
          
          const accessToken = generateToken(payload)
          
          res.cookie("accessToken", accessToken, options)
          res.json({ message: "Login success" })
          
     } catch (err: unknown) {
          CatchError(err, res, "Login failed, please try after sometime")
     }
     

}


export const getSession = async(req: Request, res:Response) => {
     try {
          const accessToken = req.cookies.accessToken
          if (!accessToken)
               throw TryError("Invalid session", 401)
          const session = await jwt.verify(accessToken, process.env.AUTH_SECRET!)
          res.json(session)
          
     } catch (err) {
          CatchError(err, res, "Invalid session")
     }
}