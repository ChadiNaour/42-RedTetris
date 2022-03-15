import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import roomsReducer from './reducers/roomsSlice'
import playersReducer from './reducers/playersSlice'
import playerReducer from './reducers/playerSlice'


export default configureStore({
  reducer: {
    playerReducer:playerReducer,
      roomsReducer: roomsReducer,
      playersReducer: playersReducer
  },
}, composeWithDevTools(applyMiddleware(thunk)))