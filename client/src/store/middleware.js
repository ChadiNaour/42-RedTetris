import { startConnecting, isConnected } from "./slices/connectionSlice";
import {
  addUser,
  setError,
  UserAdded,
  addRoomName,
} from "./slices/playerSlice";
import { addRoomRequest, updateRooms } from "./slices/roomsSlice";
import { io, Socket } from "socket.io-client";
export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("state : ", store.getState());
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
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
    }
    if (Connected) {
      if (addUser.match(action)) {
        socket.emit("new_user", {
          username: action.payload.username,
          avatar: action.payload.avatar,
        });
        socket.on("user_exists", (data) => {
          if (data.error) store.dispatch(setError("user already exist"));
          else
            store.dispatch(
              UserAdded({ username: data.username, avatar: data.avatar })
            );
          socket.off("user_exists");
        });
      }
      if (addRoomRequest.match(action)) {
        socket.emit("create_room", {
          room: action.payload.room,
          mode: action.payload.mode,
          username: user.userName,
          avatar: user.avatar,
        });
        socket.on("update_rooms", (data) => {
          store.dispatch(updateRooms(data.rooms));
          socket.off("update_rooms");
        });
      }
      /*******/

      // socket.on("room_created", (data) => {
      // setRoom(data);
      // store.dispatch(addRoomName(data));
      // socket.emit("getPlayers", data);
      // console.log("asdfgaksjdfghajsdhfgajksdfghasjkd", data);
      // socket.off("room_created");
      // });
    }
    next(action);
  };
};
