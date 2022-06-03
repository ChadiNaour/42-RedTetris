const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const Game = require("./classes/Game");

const Tetrimios = require("./classes/tetrominos");
let tetrominos = new Tetrimios();

let rooms = [];
let players = [];
var allClients = [];
let game = new Game();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(cors());

io.on("connection", (socket) => {
    allClients.push(socket);
    /*-------------ADD PLAYER-------------*/
    socket.on("addPlayerRequest", (data) => {
        const exist = players.find(
            (player) => player.username === data.username
        );
        if (!exist) {
            players = [
                ...players,
                {
                    username: data.username,
                    socketId: socket.id,
                    avatar: data.avatar,
                    room: "",
                    admin: false,
                },
            ];
            socket.emit("addPlayerSuccess", {
                username: data.username,
                avatar: data.avatar,
            });
        } else {
            socket.emit("addPlayerFail", { error: "user existe" });
        }
    });
    /*-------------GET ROOMS-------------*/
    socket.on("getRooms", () => {
        socket.emit("getRooms", rooms);
    });
    /*-------------ADD ROOM-------------*/
    socket.on("createRoomRequest", async (data) => {
        const exist = rooms.find((room) => room.name === data.room);
        const player = players.find(
            (player) =>
                player.username === data.username &&
                player.socketId === socket.id
        );
        if (!exist) {
            if (data.mode === "battle")
                rooms = [
                    ...rooms,
                    {
                        name: data.room,
                        mode: data.mode,
                        maxPlayers: 5,
                        playersIn: 1,
                        state: false,
                        stages: [],
                    },
                ];
            else
                rooms = [
                    ...rooms,
                    {
                        name: data.room,
                        mode: data.mode,
                        maxPlayers: 1,
                        playersIn: 1,
                        state: false,
                        stages: [],
                    },
                ];
            if (player) {
                player.room = data?.room;
                player.admin = true;
            }

            socket.join(data.room);
            socket.emit("createRoomSucces", data.room);
            io.to(data.room).emit("chat", {
                message: `Player ${data.username} created the room ${data.room}`,
                type: "join",
            });
            io.emit("updateRooms", { rooms: rooms });
        } else {
            socket.emit("roomExists");
        }
    });
    /*-------------JOIN ROOM-------------*/
    socket.on("joinRoom", (data) => {
        const joinedRoom = rooms.find((room) => room.name === data.room);
        const player = players.find(
            (player) => player.username === data.username
        );
        if (joinedRoom) {
            if (joinedRoom.mode === "battle" && joinedRoom.playersIn < 5) {
                socket.join(data.room);
                player.room = data?.room;
                player.admin = false;
                joinedRoom.playersIn += 1;
                socket.emit("roomJoinedSuccess", data.room);
                io.to(data.room).emit("chat", {
                    message: `Player ${data.username} joined the room ${data.room}`,
                    type: "join",
                });
                io.emit("updateRooms", { rooms: rooms });
            }
        }
    });
    /*-------------JOIN ROOM-------------*/
    socket.on("joinRoomFromLink", ({ username, room }) => {
        const exist = players.find((player) => player.username === username);
        if (!exist) {
            players = [
                ...players,
                {
                    username: username,
                    socketId: socket.id,
                    avatar: "Rhett_James.png",
                    room: "",
                    admin: false,
                },
            ];
            socket.emit("addPlayerSuccess", {
                username: username,
                avatar: "Rhett_James.png",
            });
            const joinedRoom = rooms.find((r) => r.name === room);
            if (joinedRoom) {
                if (joinedRoom.mode === "battle" && joinedRoom.playersIn < 5) {
                    socket.join(room);
                    players[players.length - 1].room = room;
                    players[players.length - 1].admin = false;
                    joinedRoom.playersIn += 1;
                    socket.emit("roomJoinedSuccess", room);
                    io.to(room).emit("chat", {
                        message: `Player ${username} joined the room ${room}`,
                        type: "join",
                    });
                    io.emit("updateRooms", { rooms: rooms });
                }
            } else {
                rooms = [
                    ...rooms,
                    {
                        name: room,
                        mode: "battle",
                        maxPlayers: 5,
                        playersIn: 1,
                        state: false,
                        stages: [],
                    },
                ];
                players[players.length - 1].room = room;
                players[players.length - 1].admin = true;
                socket.join(room);
                socket.emit("createRoomSucces", room);
                io.to(room).emit("chat", {
                    message: `Player ${username} created the room ${room}`,
                    type: "join",
                });
                io.emit("updateRooms", { rooms: rooms });
            }
        } else {
            socket.emit("addPlayerFail", { error: "user existe" });
        }
    });
    /*-------------GET PLAYERS-------------*/
    socket.on("getPlayers", (data) => {
        var temp = [];
        var roomPlayers = [];
        const clients = io.sockets.adapter.rooms.get(data);
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
        io.to(data).emit("updatePlayers", roomPlayers);
    });
    /*-------------START THE GAME-------------*/
    socket.on("startgame", (data) => {
        const room = rooms.find((room) => room.name === data);
        game.getroomUsersDetails(io, room.name, players).then((res) => {
            console.log(res);
            for (let i = 0; i < players.length; i++) {
                for (let j = 0; j < res.length; j++) {
                    if (players[i].username === res[j].username)
                        players[i].gameOver = false;
                }
            }
        });
        game.getUser(io, socket.id, room, players).then(async (user) => {
            // //console.log("the user is", user);
            if (user.admin) {
                const tetros = await tetrominos.getTetriminos();
                game.startGame(io, room, tetros);
                io.emit("updateRooms", { rooms: rooms });
            } else {
                io.to(socket.id).emit("waitForAdmin");
            }
        });
    });
    /*-------------SEND MESSAGE-------------*/
    socket.on("sendMessage", (data) => {
        const player = players.find(
            (player) => player.username === data.username
        );

        io.to(data.room).emit("chat", {
            sender: player,
            message: data.message,
            type: "message",
        });
    });
    /*-------------NEW TETROS-------------*/
    socket.on("newTetriminos", async (data) => {
        const tetriminos = await tetrominos.getTetriminos();
        // //console.log(data, tetriminos)
        game.newTetriminos(io, data, tetriminos);
    });

    /*-------------ADD STAGE-------------*/
    socket.on("sendStage", async (data) => {
        // //console.log(data);
        const player = players.find((p) => p.username === data.username);
        // //console.log(player);
        if (player && player.room === data.room) {
            game.sendStage(io, data.room, data.stage, data.username);
        }
    });

    /*-------------ADD WALL-------------*/
    socket.on("addWall", async (data) => {
        // //console.log("some data to wall", data);
        game.addWall(socket, data.room);
    });
    /*-------------GAME OVER-------------*/
    socket.on("GameOver", async (data) => {
        //console.log("gameOver", data);
        game.GameOver(io, data, rooms, players);
    });
    /*-------------LEAVE ROOM-------------*/
    socket.on("leaveRoom", (data) => {
        const room = rooms.find((room) => room.name === data.roomName);
        let indexOfRoom = rooms.indexOf(room);
        if (room) {
            if (
                room.mode === "solo" ||
                (room.mode === "battle" && room.playersIn <= 1)
            )
                rooms.splice(indexOfRoom, 1);
            else {
                var temp = [];
                var roomPlayers = [];
                const clients = io.sockets.adapter.rooms.get(data.roomName);
                if (clients) {
                    for (const clientId of clients) {
                        temp.push(clientId);
                    }
                }
                for (let i = 0; i < temp.length; i++) {
                    for (let j = 0; j < players.length; j++) {
                        if (players[j].socketId === temp[i]) {
                            roomPlayers.push(players[j]);
                        }
                    }
                }

                socket.leave(data.roomName);
                let playerLeft = roomPlayers.find(
                    (s) => s.username === data.userName
                );
                let playerLeftIndex = roomPlayers.indexOf(playerLeft);
                roomPlayers.splice(playerLeftIndex, 1);
                let jet = players.indexOf(
                    players.find((p) => p?.username === playerLeft.username)
                );
                players[jet].room = "";
                console.log("jet", players[jet]);
                if (data.admin) {
                    let pIndex = players.indexOf(
                        players.find(
                            (p) => p?.username === roomPlayers[0].username
                        )
                    );
                    players[pIndex].admin = true;
                    pIndex = players.indexOf(
                        players.find((p) => p?.username === playerLeft.username)
                    );
                    players[pIndex].admin = false;
                    players[pIndex].room = "";
                }
                if (roomPlayers.length < 1) {
                    rooms.splice(indexOfRoom, 1);
                } else {
                    rooms[indexOfRoom].playersIn -= 1;
                    io.to(data.roomName).emit("playerLeftRoom", {
                        roomPlayers,
                        playerLeft: { ...playerLeft, admin: data.admin },
                    });
                    if (
                        roomPlayers.length == 1 &&
                        rooms[indexOfRoom].state == true
                    ) {
                        rooms[indexOfRoom].state = false;
                        io.to(roomPlayers[0].socketId).emit("GameFinished", {
                            winer: roomPlayers[0],
                        });
                    } else if (
                        rooms[indexOfRoom].playersIn == 2 &&
                        rooms[indexOfRoom].state == true
                    ) {
                        let s = roomPlayers.find((p) => p?.gameOver == true);
                        if (s) {
                            let i = roomPlayers.indexOf(s);
                            let v = i == 0 ? 1 : 0;
                            rooms[indexOfRoom].state = false;
                            io.to(roomPlayers[v].socketId).emit(
                                "GameFinished",
                                {
                                    winer: roomPlayers[v],
                                }
                            );
                        }
                    }
                }
            }
            io.to(data.roomName).emit("updatePlayers", roomPlayers);
            socket.emit("leaveRoomSuccess");
            io.emit("updateRooms", { rooms });
        }
    });
    /*-------------DISCONNECT SOCKET-------------*/
    socket.on("disconnect", () => {
        let varPlayer = players?.find((player) => player.socketId == socket.id);
        if (varPlayer?.username && varPlayer.room.length > 0) {
            let isAdmin = varPlayer?.admin;
            const varRoom = rooms.find((room) => room.name === varPlayer.room);
            let indexOfRoom = rooms.indexOf(varRoom);
            if (varRoom) {
                if (
                    varRoom.mode === "solo" ||
                    (varRoom.mode === "battle" && varRoom.playersIn <= 1)
                )
                    rooms.splice(indexOfRoom, 1);
                else {
                    var temp = [];
                    var roomPlayers = [];
                    const clients = io.sockets.adapter.rooms.get(varRoom.name);
                    if (clients) {
                        for (const clientId of clients) {
                            temp.push(clientId);
                        }
                    }
                    console.log(clients);
                    for (let i = 0; i < temp.length; i++) {
                        for (let j = 0; j < players.length; j++) {
                            if (players[j].socketId === temp[i]) {
                                roomPlayers.push(players[j]);
                            }
                        }
                    }
                    socket.leave(varRoom.name);
                    let jet = players.indexOf(
                        players.find((p) => p?.username === varPlayer.username)
                    );
                    players[jet].room = "";
                    if (varPlayer.admin) {
                        console.log(roomPlayers);
                        let pIndex = players.indexOf(
                            players.find(
                                (p) => p?.username === roomPlayers[0].username
                            )
                        );
                        players[pIndex].admin = true;
                        pIndex = players.indexOf(
                            players.find(
                                (p) => p?.username === varPlayer.username
                            )
                        );
                        players[pIndex].admin = false;
                        players[pIndex].room = "";
                    }
                    if (roomPlayers.length < 1) {
                        rooms.splice(indexOfRoom, 1);
                    } else {
                        console.log(varRoom.name);
                        rooms[indexOfRoom].playersIn -= 1;
                        io.to(varRoom.name).emit("playerLeftRoom", {
                            roomPlayers,
                            playerLeft: {
                                ...varPlayer,
                                admin: isAdmin,
                            },
                        });
                        if (
                            roomPlayers.length == 1 &&
                            rooms[indexOfRoom].state == true
                        ) {
                            rooms[indexOfRoom].state = false;
                            io.to(roomPlayers[0].socketId).emit(
                                "GameFinished",
                                {
                                    winer: roomPlayers[0],
                                }
                            );
                        } else if (
                            rooms[indexOfRoom].playersIn == 2 &&
                            rooms[indexOfRoom].state == true
                        ) {
                            let s = roomPlayers.find(
                                (p) => p?.gameOver == true
                            );
                            if (s) {
                                let i = roomPlayers.indexOf(s);
                                let v = i == 0 ? 1 : 0;
                                rooms[indexOfRoom].state = false;
                                io.to(roomPlayers[v].socketId).emit(
                                    "GameFinished",
                                    {
                                        winer: roomPlayers[v],
                                    }
                                );
                            }
                        }
                    }
                }
                io.to(varRoom.name).emit("updatePlayers", roomPlayers);
                socket.emit("leaveRoomSuccess");
                io.emit("updateRooms", { rooms });
            }
        }
        players = players.filter((i) => i !== varPlayer);
    });
});

server.listen(3001, () => {});
