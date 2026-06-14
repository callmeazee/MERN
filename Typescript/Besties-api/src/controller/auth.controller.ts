import {Request, Response} from 'express'
import AuthModel from '../model/auth.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v4 as uuid} from 'uuid'
import { CatchError, TryError} from '../utils/error'
import { PayloadInterface, SessionInterface } from '../middleware/auth.middleware'

import moment from 'moment'




type refreshTokenType = 'at' | 'rt'


const accessTokenExpiry = '10m'

const tenMinInMilliseconds = (60 * 15) * 1000

const sevenDaysInMillisecond = (7 * 24 * 60 * 60) * 1000





const generateToken = (payload: PayloadInterface) => {
     const accessToken = jwt.sign(payload, process.env.AUTH_SECRET!, { expiresIn: accessTokenExpiry })

     const refreshToken = uuid()
     
     return {
          accessToken, refreshToken
     }

}

const getOptions = (tokenType : refreshTokenType) => {
     return {
             httpOnly: true,
               maxAge: tokenType === "at" ? tenMinInMilliseconds : sevenDaysInMillisecond,
               secure: false,
          domain: 'localhost',
               
     }
}

/* 
for future refrence we can do this because in refresh and login function so manyt things are repeathing and to work on DRY principle (dont repeat yourself) we can make helper funtion 
// 🔥 NEW REUSABLE HELPER FUNCTION
const sendTokens = async (res: Response, userId: mongoose.Types.ObjectId, payload: PayloadInterface) => {
     // 1. Generate the tokens
     const { accessToken, refreshToken } = generateToken(payload)

     // 2. Update the database with the new refresh token & expiry
     await AuthModel.updateOne(
          { _id: userId },
          {
               $set: {
                    refreshToken,
                    expiry: moment().add(7, 'days').toDate()
               }
          }
     )

     // 3. Set cookies on the response object
     res.cookie("accessToken", accessToken, getOptions('at'))
     res.cookie("refreshToken", refreshToken, getOptions('rt'))
}


*/


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
          

          const payload : PayloadInterface = {
               id: user._id,
               fullname: user.fullname,
               mobile: user.mobile,
               email: user.email,
               image: user.image 
          }

          // const options = {
          //      httpOnly: true,
          //      maxAge: (60 * 15) * 1000,
          //      secure: false,
          //      domain: 'localhost'
          // }
          
          const { accessToken, refreshToken } = generateToken(payload)


          //set refresh token while login to match from database in thge refreshToken middleware
          await AuthModel.updateOne({ _id: user._id }, {
               $set: {
               refreshToken: refreshToken,
               expiry: moment().add(7, 'days').toDate()
          }})
          
          res.cookie("accessToken", accessToken, getOptions('at'))
          res.cookie("refreshToken", refreshToken , getOptions('rt'))
          res.json({ message: "Login success" })
          
     } catch (err: unknown) {
          CatchError(err, res, "Login failed, please try after sometime")
     }
     

}


export const refreshToken = async(req: SessionInterface, res:Response) => {
     try {
          if (!req.session)
               throw TryError('failed to refresh token', 401)

          //  req.session.image = (req.session.image ? await downloadObject(req.session.image) : null)

          const { accessToken, refreshToken } = generateToken(req.session)
          await AuthModel.updateOne({ _id: req.session.id }, {
               $set: {
                   // refreshToken: refreshToken,   //or we can write 
                    refreshToken,
                    expiry: moment().add(7, 'days').toDate()

               }
          })
            res.cookie("accessToken", accessToken, getOptions('at'))
          res.cookie("refreshToken", refreshToken , getOptions('rt'))
          res.json({ message: "token refreshed" })
          
     } catch (err) {
          CatchError(err, res, "Failed to refresh token " )
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


export const updateProfilePicture = async(req:SessionInterface, res: Response) => {
     try {
          const path = `${process.env.S3_URL}/${req.body.path}`
          if(!path || !req.session)
               throw TryError("Failed to update", 400)
          await AuthModel.updateOne({ _id: req.session.id }, { $set: { image: path } })
        
          res.json({image:path})
     } catch (err) {
          CatchError(err,res, "failed to update profile picture")
     }
}


export const logout = async(req: Request, res:Response) => {
     try {

          const options = {
               httpOnly: true,
               maxAge: 0,
               secure: false,
               domain: 'localhost',
               
         }


          res.clearCookie('accessToken', options)
          res.clearCookie('refreshToken', options)
          res.json({message: 'Logout successfull'})
          
     } catch (err) {
          CatchError(err, res, "Logout error failed to logout")
     }
}