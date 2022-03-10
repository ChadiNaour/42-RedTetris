import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import roomsReducer from './reducers/roomsSlice'


export default configureStore({
  reducer: {
      roomsReducer: roomsReducer,
  },
}, composeWithDevTools(applyMiddleware(thunk)))