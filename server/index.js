const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

let rooms = [];

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log("User connected =>", socket.id);
    //create room
    socket.on("create_room", (data) => {
        rooms = [...rooms, {name: data}]
        socket.join(data);
        console.log("user with id:", socket.id, "joined room:", data);
        console.log("rooms are", rooms);
        socket.emit("update_rooms", rooms);
    })
    socket.on("disconnect", () => {
        console.log("User disconnected =>", socket.id);
    });
});


server.listen(3001, () => {
    console.log("server running on 3001");
});