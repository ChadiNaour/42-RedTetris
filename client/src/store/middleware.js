import { startConnecting, isConnected } from "./slices/connectionSlice";
// import { addPlayer } from "./slices/playerSlice";
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
    if (startConnecting.match(action)) {
      socket = io("http://localhost:3001");
      socket.on("connect", () => {
        store.dispatch(isConnected());
      });
    }
    if (Connected) {
      //   if (addPlayer.match(action)) {
      //     socket.emit("new_user", action.payload);
      //   }
      socket.on("userAdded", (data) => {
        // store.dispatch(addPlayer(data));
        socket.off("userAdded");
      });
    }
    next(action);
  };
};
