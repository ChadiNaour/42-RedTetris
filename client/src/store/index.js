import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import roomsReducer from "./slices/roomsSlice";
import playerReducer from "./slices/playerSlice";
import playersReducer from "./slices/playersSlice";
import connectionReducer from "./slices/connectionSlice";
import { logger, socketMiddleware } from "./middleware";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
  reducer: {
    connection: connectionnnReducer,
    playerReducer: playerReducer,
    playersReducer: playersReducer,
    playersReducer: playersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, socketMiddleware, thunk]),
});

export default store;
