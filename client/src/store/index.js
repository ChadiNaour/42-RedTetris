import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware";
import connectionReducer from "./slices/connectionSlice";
import playerReducer from "./slices/playerSlice";
import roomsReducer from "./slices/roomsSlice";
import playersReducer from "./slices/playersSlice";

const store = configureStore({
    reducer: {
        connection: connectionReducer,
        player: playerReducer,
        rooms: roomsReducer,
        players: playersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([socketMiddleware, thunk]),
});

export default store;
