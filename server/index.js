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
            // console.log("players are", players);
            socket.emit("update_rooms", rooms);
        }
        else {
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