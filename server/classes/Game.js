class GamesRoom {
	constructor() { }

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
					if (player[i] === socketId) Admin = players.find((player) => player.socketId === socketId);
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


}

module.exports = GamesRoom;