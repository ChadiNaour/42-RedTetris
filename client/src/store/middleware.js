import { io, Socket } from "socket.io-client";
import { isConnected, startConnecting } from "./slices/connectionSlice";
import {
    addPlayerRequest,
    addPlayerSuccess,
    addPlayerFail,
    addRoomName,
    setAdmin,
    addRoomRequest,
    joinRoomRequest,
    addToChat,
    startTheGameRequest,
    setAdminError,
    sendMessage,
    newTetrosRequest,
    sendStage,
    addWallRequest,
    startTheGame,
    concatTetros,
    setStage,
    AddWall,
    gameOverAction,
    GameFinishedPlayer,
    seRoomError,
    leaveRoomRequest,
    leaveRoomSuccess,
    joinRoomFromLink,
} from "./slices/playerSlice";
import { GameFinishedPlayers } from "./slices/playersSlice";
import { updatePlayers } from "./slices/playersSlice";
import {
    updateRooms,
    getRoomsRequest,
    getRoomsSuccess,
    getRoomsFailed,
} from "./slices/roomsSlice";

export const logger = (store) => (next) => (action) => {
    // console.group(action.type);
    // //console.log("state : ", store.getState());
    // console.info("dispatching", action);
    let result = next(action);
    // //console.log("next state", store.getState());
    // console.groupEnd();
    return result;
};

export const socketMiddleware = (store) => {
    let socket = Socket;
    return (next) => (action) => {
        const Connected = store.getState()?.connection?.connected;
        const user = store.getState().player;
        if (startConnecting.match(action)) {
            socket = io("http://localhost:3001");
            socket.on("connect", () => {
                store.dispatch(isConnected());
            });
            socket.on("addPlayerSuccess", (data) => {
                store.dispatch(addPlayerSuccess(data));
            });
            socket.on("addPlayerFail", (data) => {
                store.dispatch(addPlayerFail(data));
            });
            socket.on("getRooms", (data) => {
                store.dispatch(getRoomsSuccess(data));
            });
            socket.on("updateRooms", (data) => {
                console.log(data);
                store.dispatch(updateRooms(data.rooms));
            });
            socket.on("createRoomSucces", (data) => {
                store.dispatch(addRoomName(data));
                store.dispatch(setAdmin(1));
                socket.emit("getPlayers", data);
            });
            socket.on("roomJoinedSuccess", (data) => {
                store.dispatch(addRoomName(data));
                store.dispatch(setAdmin(0));
                socket.emit("getPlayers", data);
            });
            socket.on("updatePlayers", (data) => {
                store.dispatch(updatePlayers(data));
            });
            socket.on("chat", (data) => {
                // console.log("chat", data);
                store.dispatch(addToChat(data));
            });
            socket.on("waitForAdmin", () => {
                store.dispatch(setAdminError());
            });
            socket.on("startGame", (data) => {
                // console.log("starting", data);
                store.dispatch(startTheGame(data));
            });
            socket.on("newTetriminos", (data) => {
                // console.log("new tetros", data);
                store.dispatch(concatTetros(data));
            });
            socket.on("getstages", (data) => {
                store.dispatch(setStage(data));
            });
            socket.on("addWall", (data) => {
                // console.log("recieve emit to add wall", data);
                store.dispatch(AddWall({ wall: true }));
            });
            // GameFinished
            socket.on("GameFinished", (data) => {
                store.dispatch(GameFinishedPlayer());
                store.dispatch(GameFinishedPlayers());
            });
            socket.on("roomExists", () => {
                store.dispatch(seRoomError("room exists"));
            });
            socket.on("playerLeftRoom", (data) => {
                let cuurentPlayer = store.getState().player;
                if (
                    data?.playerLeft?.admin &&
                    data?.roomPlayers[0]?.username === cuurentPlayer.userName
                ) {
                    store.dispatch(setAdmin(1));
                }
            });
            socket.on("leaveRoomSuccess", () => {
                store.dispatch(leaveRoomSuccess());
            });
            socket.on("emit-disconnect", () => {
                socket.off("addPlayerSuccess");
                socket.off("addPlayerFail");
                socket.off("getRooms");
                socket.off("updateRooms");
                socket.off("createRoomSucces");
                socket.off("roomJoinedSuccess");
                socket.off("updatePlayers");
                socket.off("chat");
                socket.off("waitForAdmin");
                socket.off("startGame");
                socket.off("newTetriminos");
                socket.off("getstages");
                socket.off("addWall");
            });
        }
        if (Connected) {
            if (addPlayerRequest.match(action))
                socket?.emit("addPlayerRequest", action.payload);
            else if (getRoomsRequest.match(action)) socket?.emit("getRooms");
            else if (addRoomRequest.match(action))
                socket?.emit("createRoomRequest", {
                    ...action.payload,
                    username: user.userName,
                });
            //joinning to a room request
            if (joinRoomRequest.match(action)) {
                socket?.emit("joinRoom", {
                    room: action.payload,
                    username: user.userName,
                });
            }
            //adding the room with check if its duplicated
            if (startTheGameRequest.match(action)) {
                socket.emit("startgame", action.payload);
            }

            //sending message to room
            if (sendMessage.match(action)) {
                socket.emit("sendMessage", {
                    message: action.payload,
                    username: user.userName,
                    room: user.roomName,
                });
            }
            if (newTetrosRequest.match(action)) {
                // console.log(action.payload);
                socket.emit("newTetriminos", action.payload);
            }
            //send stage
            if (sendStage.match(action)) {
                socket.emit("sendStage", {
                    stage: action.payload,
                    username: user.userName,
                    room: user.roomName,
                });
            }
            //send stage
            if (addWallRequest.match(action)) {
                // console.log("jksnjsbvjksv");
                socket.emit("addWall", {
                    username: user.userName,
                    room: user.roomName,
                });
            }
            // gameOverAction
            if (gameOverAction.match(action)) {
                // console.log("jksnjsbvjksv");
                socket.emit("GameOver", {
                    userName: user.userName,
                    room: user.roomName,
                });
            }
            if (leaveRoomRequest.match(action)) {
                socket.emit("leaveRoom", action.payload);
            }
            // join room from link
            if (joinRoomFromLink.match(action)) {
                socket.emit("joinRoomFromLink", action.payload);
            }
        }
        next(action);
    };
};
