const { Server } = require("socket.io");

const io = new Server(3000, { cors: true });
const emaiToSocketIdMap = new Map();
const socketToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);

  socket.on("room:join", (data) => {
    // console.log(data);
    const { email, room } = data;
    emaiToSocketIdMap.set(email, socket.id);
    socketToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });
});
