const express = require("express");
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
  },
});

app.use(cors());
app.get("/rooms", (req, res) => {
  res.send(rooms);
});

io.on("connection", (socket) => {
  console.log("User connected =>", socket.id);

  //new user
  socket.on("new_user", (data) => {
    // console.log(data);
    const exist = players.find((player) => player.username === data.username);
    // console.log(exist);
    if (!exist) {
      players = [
        ...players,
        {
          username: data.username,
          socketId: socket.id,
          avatar: data.avatar,
          room: "",
        },
      ];
      socket.emit("user_exists", {
        username: data.username,
        avatar: data.avatar,
      });
    } else {
      socket.emit("user_exists", { error: "user existe" });
    }
  });

  //create new room
  socket.on("create_room", (data) => {
    const exist = rooms.find((room) => room.name === data.room);
    const player = players.find((player) => player.username === data.username);
    // console.log(player);
    if (!exist) {
      if (data.mode === "battle")
        rooms = [
          ...rooms,
          { name: data.room, mode: data.mode, maxPlayers: 5, playersIn: 1 },
        ];
      else
        rooms = [
          ...rooms,
          { name: data.room, mode: data.mode, maxPlayers: 1, playersIn: 1 },
        ];
      //still checking the player
      // players = [...players, { username: data.username, socketId: socket.id, room: data.room, avatar: data.avatar }];
      if (player) player.room = data?.room;
      socket.join(data.room);
      // console.log("user with id:", socket.id, "joined room:", data.room);
      // console.log("rooms are", rooms);
      // console.log("players are", players);
      // io.emit("created_room", data.room);
      socket.emit("room_created", data.room);
      io.to(data.room).emit("chat", {
        message: `Player ${data.username} created the room ${data.room}`,
        type: "join",
      });
      io.emit("update_rooms", { rooms: rooms });
    } else {
      socket.emit("room_exists");
    }
    // socket.off("create_room");
  });

  //join room
  socket.on("join_room", (data) => {
    console.log(data);
    const joinedRoom = rooms.find((room) => room.name === data.room);
    const player = players.find((player) => player.username === data.username);
    if (joinedRoom) {
      console.log(joinedRoom);
      if (joinedRoom.mode === "battle" && joinedRoom.playersIn < 5) {
        socket.join(data.room);
        player.room = data?.room;
        joinedRoom.playersIn += 1;
        socket.emit("room_joined", data.room);
        io.to(data.room).emit("chat", {
          message: `Player ${data.username} joined the room ${data.room}`,
          type: "join",
        });
        io.emit("update_rooms", { rooms: rooms });
      }
    } else if (data.hash && data.room) {
      socket.join(data.room);
      // console.log("user with id:", socket.id, "joined room:", data.room);
      // console.log("rooms are", rooms);
      // console.log("players are", players);
      // io.emit("created_room", data.room);
      socket.emit("room_created", data.room);
      io.to(data.room).emit("chat", {
        message: `Player ${data.username} created the room ${data.room}`,
        type: "join",
      });
      io.emit("update_rooms", { rooms: rooms });
    }
  });

  //join room
  socket.on("send_Message", (data) => {
    console.log(data);
    // const joinedRoom = rooms.find((room) => room.name === data.room);
    // const player = players.find((player) => player.username === data.username);
    const player = players.find((player) => player.username === data.username);
    // if (joinedRoom) {
    //   console.log(joinedRoom);
    //   if (joinedRoom.mode === "battle" && joinedRoom.playersIn < 5) {
    //     socket.join(data.room);
    //     player.room = data.room;
    //     joinedRoom.playersIn += 1;
    //     socket.emit("room_joined", data.room);
    io.to(data.room).emit("chat", {
      sender: player,
      message: data.message,
      type: "message",
    });
    //     io.emit("update_rooms", { rooms: rooms });
    //   }
    // }
  });

  //get room players
  socket.on("getPlayers", (data) => {
    var temp = [];
    var roomPlayers = [];
    // console.log("in here")
    // console.log(data);
    const clients = io.sockets.adapter.rooms.get(data);
    console.log("clients in room are ===>", clients);
    if (clients) {
      for (const clientId of clients) {
        temp.push(clientId);
      }
    }
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < temp.length; j++) {
        if (players[i].socketId === temp[j]) {
          roomPlayers.push(players[i]);
        }
      }
    }
    console.log("roomPlayers", roomPlayers);
    io.to(data).emit("update_players", roomPlayers);
    // var clients = io.sockets.clients();
    // var clients = io.sockets.clients(data.room);
    // console.log(players);
  });

  //disconnect
  socket.on("disconnect", () => {
    socket.emit("emit-disconnect");
    console.log("User disconnected =>", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server running on 3001");
});
