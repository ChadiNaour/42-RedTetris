const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const server = http.createServer(app);

let rooms = [];
let players = [];

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

app.use(cors());
app.get("/rooms", (req, res) => {
    res.send(rooms);
});



io.on("connection", (socket) => {
    console.log("User connected =>", socket.id);

    //new user
    socket.on("new_user", (data) => {
        console.log(data);
        const exist = players.find(player => player.username === data.username);
        console.log(exist);
        if (!exist) {
            players = [...players, { username: data.username, socketId: socket.id, room: "" }];
            socket.emit("user_exists", { username: data.username });

        } else {
            socket.emit("user_exists", { error: "user existe" });
        }
    })

    //create new room
    socket.on("create_room", (data) => {
        const exist = rooms.find(room => room.name === data.room)
        if (!exist) {
            if (data.mode === "battle")
                rooms = [...rooms, { name: data.room, mode: data.mode, maxPlayers: 5, playersIn: 1 }];
            else
                rooms = [...rooms, { name: data.room, mode: data.mode, maxPlayers: 1, playersIn: 1 }];
            //still checking the player
            players = [...players, { username: data.username, socketId: socket.id, room: data.room }];
            socket.join(data.room);
            // console.log("user with id:", socket.id, "joined room:", data.room);
            console.log("rooms are", rooms);
            console.log("players are", players);
            // io.emit("created_room", data.room);
            io.emit("update_rooms", {rooms: rooms, created: true, roomname: data.room});
        } else {
            socket.emit("room_exists");
        }
    })

    //join room
    socket.on("join_room", (data) => {
        console.log(data);

    });

    //disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected =>", socket.id);
    });
});


server.listen(3001, () => {
    console.log("server running on 3001");
});