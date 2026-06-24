import { Server } from "socket.io"

const VideoSocket = (io: Server) => {
     io.on("connection", (socket) => {
           console.log(`User connected: ${socket.id}`);
          // socket.on("join", (userId) => {
          //   socket.join(userId);
          //   console.log(`User ${userId} joined room`);
          // });


       socket.on("offer", ({ offer, to }) => {
         io.to(to).emit("offer", { offer, from: socket.id });
       });

       socket.on("candidate", ({ candidate, to }) => {
         io.to(to).emit("candidate", { candidate, from: socket.id });
       });
          socket.on("answer", ({ answer, to }) => {
       

               io.to(to).emit("answer", {answer, from: socket.id})
               
          })
          socket.on("end", ({ to }) => {
            if (to) io.to(to).emit("end", { from: socket.id });
          });
          socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
          });
     });
}

export default VideoSocket