import { Server } from "socket.io";
import { createChat } from "../controller/chat.controller";
import { downloadObject } from "../utils/s3";

const ChatSocket = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("message", (payload) => {
      createChat({
        ...payload,
        from: payload.from.id
      })
      io.to(payload.to).emit("message", {
        from: payload.from,
        message: payload.message,
      })
    })

    socket.on('attachment', async(payload) => {
          createChat({
            ...payload,
            from: payload.from.id,
          });
          io.to(payload.to).emit("attachment", {
            from: payload.from,
            message: payload.message,
            file: {
              path: await downloadObject(payload.file.path),
              type: payload.file.type
            }
          });

    })

  })
};
export default ChatSocket;


// import { Server, Socket } from "socket.io";

// const ChatSocket = (io: Server) => {
//   io.on("connection", (socket: Socket) => {
//     const userId = socket.handshake.auth.userId;

//     if (userId) {
//       socket.join(userId);
//     }

//     socket.on("private-message", (payload) => {
//       const messagePayload = {
//         from: payload.from,
//         to: payload.to,
//         message: payload.message,
//         time: new Date().toISOString(),
//       };

//       io.to(payload.to).emit("message", messagePayload);

//       socket.emit("message", messagePayload);
//     });

//     socket.on("disconnect", () => {
//       console.log(`${userId} disconnected`);
//     });
//   });
// };

// export default ChatSocket;
