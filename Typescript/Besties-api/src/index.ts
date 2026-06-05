import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB as string)

/* second way to write 
mongoose.connect(process.env.DB!) */

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes'
const app = express()

app.listen(process.env.PORT || 8080, () => {
     console.log(`Db connected server is running on ${process.env.PORT}` )
})


app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/auth', authRouter)