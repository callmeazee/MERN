import { Request, Response } from "express"
import FriendModel from "../model/friend.model"
import { SessionInterface } from "../middleware/auth.middleware"
import { CatchError, TryError } from "../utils/error"
import AuthModel from "../model/auth.model"
import mongoose from "mongoose"


export const addFriend = async(req: SessionInterface, res: Response) => {
     try {

          req.body.user = req.session?.id
          const friend = await FriendModel.create(req.body)
          res.json(friend)
          
     } catch (err) {
          CatchError(err, res, "Failed to send fruiend request")
          
     }
}


export const fetchFriend = async(req: SessionInterface, res: Response) => {
     try {
       const user = req.session?.id
          const friends = await FriendModel.find({ user: user }).populate('friend')
          res.json(friends)
          
     } catch (err) {
         CatchError(err, res, "Failed to fetch friends")
          
     }
}

export const deleteFriend = async(req: Request, res: Response) => {
     try {
          const { id } = req.params
          await FriendModel.deleteOne({ _id : id })
          // or
          //   await FriendModel.deleteOne({ req.params.id })
          res.json({message: "Friend deleted successfully"})

          
     } catch (err) {
         CatchError(err, res, "Failed to fetch friends")
          
     }
}

export const friendRequest = async(req: SessionInterface, res: Response) => {
     try {

          if (!req.session)
               throw TryError('Failed to fetch friend request')
          
          //when we want to implement projection in populate function so we can use this  populate("user", "fullname image")  it display only fullname and image from user suppose i want everything except passoword and email so i will write like this populate("user", "-password -email")
          const friends = await FriendModel.find({ friend: req.session.id, status: "requested" }).populate("user", "fullname image")
          
          res.json(friends)
       

          
     } catch (err) {
         CatchError(err, res, "Failed to fetch friends")
          
     }
}

export const updateFriendStatus = async(req: SessionInterface, res: Response) => {
     try {
          if (!req.session)
               throw TryError('Failed to update friend request')

          await FriendModel.updateOne(
          {
             _id : req.params.id
          },
          {
             $set: {status: req.body.status}
          }
     )
        res.json({message: "Friend status updated"})

          
     } catch (err) {
          CatchError(err, res, "Failed to update friends")
          
     }
}

export const suggestedFriends = async(req: SessionInterface, res: Response) => {
     try {
          const friends = await AuthModel.aggregate([
               {
                    $match: { 
                         _id: { $ne: new mongoose.Types.ObjectId(req.session?.id) }
                     }
               },
               { $sample: { size: 5 } },
               {$project: {fullname:1, image: 1, createdAt: 1}}
          ])
         
          const modified = await Promise.all(
               friends.map(async (item) => {
                    const count = await FriendModel.countDocuments({ friend: item._id })
                    return count === 0 ? item : null


             })
        )

       const filtered =     modified.filter((item)=> item !== null)

          res.json(filtered)
          
     } catch (err) {
        CatchError(err, res, "Failed")
          
     }
}