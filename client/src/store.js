import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import roomsReducer from './reducers/roomsSlice'
import playersReducer from './reducers/playersSlice'


export default configureStore({
  reducer: {
      roomsReducer: roomsReducer,
      playersReducer: playersReducer
  },
}, composeWithDevTools(applyMiddleware(thunk)))