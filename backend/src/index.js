/** import custom moduels */
const socketIo = require("socket.io");
const { app } = require("./app");

let server;
(() => {
  try {
    server = app.listen(3000, () =>
      console.log("Server is listenin on port 3000")
    );
  } catch (error) {
    console.log("Error while server listening - ", error);
  }
})();

const io = socketIo(server);

let connectedUsers = 0;
io.on("connection", (socket) => {
  console.log("A user connected");

  connectedUsers++;
  /** Fire a custom event */
  socket.emit("newUserConnect", { message: "Hii, Welcom Dear" });
  /** Broadcast message to these users which are already connected */
  socket.broadcast.emit("newUserConnect", {
    message: `${connectedUsers} users connected`,
  });
  /**
   * Global Broadcasting using socket.io
   */
  io.sockets.emit("broadcast", {
    message: `${connectedUsers} users connected`,
  });
  /**
   * Built-in event : Send message from backend to frontend
   */
  //   setTimeout(() => {
  //     socket.send("Sent message from server side by prereserved events");
  //   }, 3000);

  /**
   * Create custom event - to send message on frontend side and get on backend side
   */
  //   setTimeout(() => {
  //     socket.emit("myCustomEvent", { message: "A message from custom event" });
  //   }, 3000);

  /**
   * Catch custom event from frontend side
   */
  //   socket.on("myCustomEventFromClientSide", (data) => {
  //     console.log(data.message);
  //   });

  // Handle 'disconnect' event
  socket.on("disconnect", () => {
    console.log("User disconnected");

    connectedUsers--;
    // io.sockets.emit("broadcast", {
    //   message: `${connectedUsers} users connected`,
    // });
    socket.broadcast.emit("newUserConnect", {
      message: `${connectedUsers} users connected`,
    });
  });
});
