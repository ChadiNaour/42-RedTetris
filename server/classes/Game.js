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


}

module.exports = GamesRoom;