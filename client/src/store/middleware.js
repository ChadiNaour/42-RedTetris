import { startConnecting, isConnected } from "./slices/connectionSlice";
import {
  addUser,
  setError,
  UserAdded,
  addRoomName,
  setRoomError,
  addRoomRequest,
  joinRoomRequest,
} from "./slices/playerSlice";
import { updatePlayers } from "./slices/playersSlice";
import { updateRooms } from "./slices/roomsSlice";
import { io, Socket } from "socket.io-client";
export const logger = (store) => (next) => (action) => {
  // console.group(action.type);
  // console.log("state : ", store.getState());
  // console.info("dispatching", action);
  let result = next(action);
  // console.log("next state", store.getState());
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
      });
      socket.on("user_exists", (data) => {
        if (data.error) store.dispatch(setError("user already exist"));
        else
          store.dispatch(
            UserAdded({ username: data.username, avatar: data.avatar })
          );
        // socket.off("user_exists");
      });
      socket.on("room_exists", () => {
        console.log("room_already_exist");
        store.dispatch(setRoomError("Room already exist"));
        // socket.off("room_exists");
      });
      //listner if the room is created
      socket.on("room_created", (data) => {
        console.log("room created", data);
        store.dispatch(addRoomName(data));
        socket.emit("getPlayers", data);
      });
      socket.on("room_joined", (data) => {
        console.log("room joined", data);
        store.dispatch(addRoomName(data));
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
    }
    next(action);
  };
};
