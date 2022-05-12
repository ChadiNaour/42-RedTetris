import { startConnecting, isConnected } from "./slices/connectionSlice";
import {
  addUser,
  setError,
  UserAdded,
  addRoomName,
  setRoomError,
  addRoomRequest,
  joinRoomRequest,
  addToChat,
  sendMessage,
  setAdmin,
  startTheGameRequest,
  startTheGame,
  setAdminError,
  newTetrosRequest,
  concatTetros,
  sendStage,
  setStage,
  getStages
} from "./slices/playerSlice";
import { updatePlayers } from "./slices/playersSlice";
import { updateRooms } from "./slices/roomsSlice";
import { io, Socket } from "socket.io-client";
import { getRoomsRequest } from "../actions/roomsActions";
import { toast } from "react-toastify";

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
    const Connected = store.getState().connection.connected;
    const user = store.getState().playerReducer;
    if (startConnecting.match(action)) {
      socket = io("http://localhost:3001");
      socket.on("connect", () => {
        store.dispatch(isConnected());
        // store.dispatch(getRoomsRequest());
      });
      socket.on("user_exists", (data) => {
        if (data.error) store.dispatch(setError("user already exist"));
        else
          store.dispatch(
            UserAdded(data)
          );
        // socket.off("user_exists");
      });
      socket.on("room_exists", () => {
        //console.log("room_already_exist");
        store.dispatch(setRoomError("Room already exist"));
        // socket.off("room_exists");
      });
      //listner if the room is created
      socket.on("room_created", (data) => {
        console.log("room created", data);
        store.dispatch(addRoomName(data));
        store.dispatch(setAdmin(1));
        socket.emit("getPlayers", data);
      });
      socket.on("room_joined", (data) => {
        //console.log("room joined", data);
        store.dispatch(addRoomName(data));
        store.dispatch(setAdmin(0));
        socket.emit("getPlayers", data);
      });
      socket.on("update_rooms", (data) => {
        store.dispatch(updateRooms(data.rooms));
        // socket.off("update_rooms");
      });
      //listner on updated players
      socket.on("update_players", (data) => {
        store.dispatch(updatePlayers(data));
      });

      //adding message
      socket.on("chat", (data) => {
        //console.log("emited from back data",data);
        store.dispatch(addToChat(data));
      });

      //starting the game
      socket.on("startGame", (data) => {
        store.dispatch(startTheGame(data));
      });
      socket.on("wait_for_admin", () => {
        store.dispatch(setAdminError());
        //console.log("emited from back data",data);
        // store.dispatch(addToChat(data));
      });
      socket.on("newTetriminos", (data) => {
        console.log("new tetros", data);
        store.dispatch(concatTetros(data));
        //console.log("emited from back data",data);
        // store.dispatch(addToChat(data));
      });
      //get stages
      socket.on("getstages", (data) => {

        // console.log("new stages", data);
        store.dispatch(setStage(data))

        // store.dispatch(concatTetros(data));
        //console.log("emited from back data",data);
        // store.dispatch(addToChat(data));
      });
      socket.on("emit-disconnect", () => {
        socket.off("user_exists");
        socket.off("room_exists");
        socket.off("room_created");
        socket.off("room_joined");
        socket.off("update_rooms");
        socket.off("update_players");
        socket.off("startGame");
        socket.off("wait_for_admin");
        socket.off("newTetriminos");
        socket.off("getstages");
      });
      if (action.payload.hash) {
        //console.log(action.payload.hash);
        let room;
        let firstIndex = action.payload.hash.indexOf("[");
        room = action.payload.hash.substring(1, firstIndex);
        let username = action.payload.hash.substring(
          firstIndex + 1,
          action.payload.hash.indexOf("]", firstIndex)
        );
        socket.emit("new_user", {
          username: username,
          avatar: "Agoumi.png",
        });
        socket.emit("join_room", {
          room: room,
          username: username,
          hash: true,
        });
      }
    }
    if (Connected) {
      if (addUser.match(action)) {
        //user request
        socket.emit("new_user", {
          username: action.payload.username,
          avatar: action.payload.avatar,
        });
      }

      //adding the room with check if its duplicated
      if (addRoomRequest.match(action)) {
        socket.emit("create_room", {
          room: action.payload.room,
          mode: action.payload.mode,
          username: user.userName,
          avatar: user.avatar,
        });
      }

      //joinning to a room request
      if (joinRoomRequest.match(action)) {
        socket.emit("join_room", {
          room: action.payload,
          username: user.userName,
        });
      }

      //sending message to room
      if (sendMessage.match(action)) {
        socket.emit("send_Message", {
          message: action.payload,
          username: user.userName,
          room: user.roomName,
        });
      }

      //adding the room with check if its duplicated
      if (startTheGameRequest.match(action)) {
        socket.emit("startgame", action.payload);
      }

      //request for new tetros
      if (newTetrosRequest.match(action)) {
        console.log(action.payload);
        socket.emit("newTetriminos", action.payload);
      }
      //send stage
      if (sendStage.match(action)) {
        socket.emit("send_stage", {stage : action.payload ,username: user.userName, room: user.roomName} )

      }
      // if (getStages.match(action)){

      // }
    }
    next(action);
  };
};
