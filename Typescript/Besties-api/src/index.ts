import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
mongoose.connect(process.env.DB as string)

/* second way to write 
mongoose.connect(process.env.DB!) */

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRouter from './routes/auth.routes'
import StorageRouter from './routes/storage.route'
import AuthMiddleware from './middleware/auth.middleware'
import FriendRouter from './routes/friend.routes'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import SwaggerConfig from './utils/swagger'
import { serve, setup } from 'swagger-ui-express'


const app = express()
const server = createServer(app)
const io = new Server(server, {
     cors: {
          origin: process.env.CLIENT ,
          credentials: true
     }
})

io.on("connection", (client) => {
     console.log('user connected')
     client.on('message', (msg) => {
            console.log(msg)
            client.broadcast.emit('message', "hello from user 2")
       })

})
 
server.listen(process.env.PORT || 8080, () => {
     console.log(`Db connected server is running on ${process.env.PORT}` )
})


app.use(cors(
     {
          origin: process.env.CLIENT,
          credentials: true
     }

))




app.use("/api-docs", serve, setup(SwaggerConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


app.use('/auth', AuthRouter)
app.use("/storage", AuthMiddleware,  StorageRouter)
app.use("/friend", AuthMiddleware,  FriendRouter)



