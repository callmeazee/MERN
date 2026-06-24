import { Response } from "express";
import { SessionInterface } from "../middleware/auth.middleware";
import ChatModel from "../model/chat.model";
import { CatchError, TryError } from "../utils/error";
import AuthModel from "../model/auth.model";
import { downloadObject } from "../utils/s3";

interface PayloadInterface {
  from: string;
  to: string;
  message: string;
  file?: {
    path: string;
    type: string;
  };
}

export const createChat = (payload: PayloadInterface) => {
  //when we want to send data asyncronous means without try catch then we will use .catch only like this
  ChatModel.create(payload).catch((err) => {
    console.log(err.message);
  });
};

export const fetchChats = async(req: SessionInterface, res: Response) => {
     try {
          if (!req.session)
               throw TryError("failed to fetch chats")
          const chats = await ChatModel.find({
            $or: [
              { from: req.session?.id, to: req.params.to },
              { from: req.params.to, to: req.session?.id },
            ]
          }).populate('from', "fullname image email mobile").lean().sort({createdAt: 1})
        const modifiedChats =     await Promise.all(
         chats.map(async (item) => {
           if (item.file)
           {
             return {
               ...item,
               file: {
                 path: item.file.path && await downloadObject(item.file.path) ,
                 type: item.file.type
               }
             }
           } else {
             return item
           }
             
            })
          )
          res.json(modifiedChats)
       
     } catch (err) {
          CatchError(err, res, 'Failed to fetch chats')
     }

}

// export const fetchChats = async (req: SessionInterface, res: Response) => {
//   try {


//     const allChats = await ChatModel.find({});
//     console.log("All Chats:", JSON.stringify(allChats, null, 2));

//     const chats = await ChatModel.find({
//       $or: [
//         { from: req.session?.id, to: req.params.to },
//         { from: req.params.to, to: req.session?.id },
//       ],
//     });
     

//     console.log("Matched Chats:", chats);
//     const user = await AuthModel.findById("6a2f1168a6292425901c08d1");

//     console.log(user);


       

//     res.json(chats);
//   } catch (err) {
//     CatchError(err, res, "Failed to fetch chats");
//   }
// };