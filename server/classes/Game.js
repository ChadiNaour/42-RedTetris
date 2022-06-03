class GamesRoom {
    constructor() {}

    //get users
    getUser = (io, socketId, room, players) => {
        return new Promise((resolve, reject) => {
            const player = [];
            let Admin;
            const clientsList = io.sockets.adapter.rooms.get(room?.name);
            if (clientsList) {
                for (const clientId of clientsList) {
                    player.push(clientId);
                }
                for (let i = 0; i < player.length; i++) {
                    if (player[i] === socketId)
                        Admin = players.find(
                            (player) => player.socketId === socketId
                        );
                }
                resolve(Admin);
            }
        });
    };
    //start game
    startGame = (io, room, Tetrimios) => {
        return new Promise((resolve, reject) => {
            if (!room.state) {
                room.state = true;
                io.to(room.name).emit("startGame", Tetrimios);
            }
        });
    };

    //send new tetros to concat
    newTetriminos = (io, room, Tetrimios) => {
        return new Promise((resolve, reject) => {
            io.to(room).emit("newTetriminos", Tetrimios);
        });
    };

    //send stage to user
    sendStage = (io, room, stage, username) => {
        return new Promise((resolve, reject) => {
            io.to(room).emit("getstages", { stage, username });
        });
    };

    //adding wall
    addWall = (socket, room) => {
        return new Promise((resolve, reject) => {
            socket.broadcast.to(room).emit("addWall");
        });
    };

    /*
     ** Get room users name list
     */
    getroomUsersDetails = (io, room, players) => {
        return new Promise((resolve, reject) => {
            const player = [];
            const roomList = [];
            const clientsList = io.sockets.adapter.rooms.get(room);
            console.log("lista", clientsList);
            if (clientsList) {
                for (const clientId of clientsList) {
                    player.push(clientId);
                }
                for (let i = 0; i < players.length; i++) {
                    for (let j = 0; j < player.length; j++) {
                        if (players[i].socketId === player[j]) {
                            roomList.push(players[i]);
                        }
                    }
                }
            }
            console.log("roomlist", roomList);
            resolve(roomList);
        });
    };

    /*
     ** Handle Game over state
     */
    GameOver = (io, data, rooms, players) => {
        // console.log(data, rooms, players);
        return new Promise((resolve, reject) => {
            const room = rooms.find((room) => room?.name === data?.room);
            const player = players.find(
                (player) => player?.username === data?.userName
            );
            console.log("player is", player);
            console.log("room is", room);
            // console.log("in send game over", room, player, player.gameOver);
            if (room?.playersIn === 1) {
                // console.log("in 1")
                room.state = false;
                console.log("1", rooms);
                io.emit("update_rooms", { rooms: rooms });
            }
            // console.log("battle", room?.mode, player?.room, room?.name, !player.gameOver)
            if (
                room?.mode === "battle" &&
                player?.room === room?.name &&
                !player.gameOver
            ) {
                console.log("in mode battle");
                player.gameOver = true;
                io.to(room.name).emit("chat", {
                    message: `Player ${player?.username} loses`,
                    type: "join",
                });
                this.getroomUsersDetails(io, room.name, players).then((res) => {
                    console.log("res", res);
                    const playersLose = players.filter(
                        (p) => p.room === room.name && p.gameOver
                    );
                    if (res.length === playersLose.length) {
                        room.state = false;
                        playersLose.forEach((element) => {
                            element.gameOver = false;
                        });
                        console.log("2", rooms);
                        io.emit("updateRooms", { rooms: rooms });
                    }
                    if (
                        res.length <= 5 &&
                        res.length >= 2 &&
                        res.length - 1 === playersLose.length
                    ) {
                        const playerWin = players.find(
                            (p) => p.room === room.name && !p.gameOver
                        );
                        io.to(playerWin.socketId).emit("GameFinished", {
                            winer: playerWin,
                        });
                        io.to(room.name).emit("chat", {
                            message: `${playerWin?.username} WIN the game `,
                            type: "join",
                        });
                        room.state = false;
                        console.log("3", rooms);
                        io.emit("updateRooms", { rooms: rooms });
                        playersLose.forEach((element) => {
                            element.gameOver = false;
                        });
                    }
                });
            }
        });
    };
}

module.exports = GamesRoom;
