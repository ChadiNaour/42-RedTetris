import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "playersReducer",
  initialState: {
    userName: null,
    roomName: null,
    avatar: null,
    error: null,
    roomError: null,
    chat: [],
    admin: null
  },
  reducers: {
    addUser: (state, action) => {
      state.userName = null;
      state.roomName = null;
      state.avatar = null;
      state.error = null;
      state.roomError = null;
      // return action;
    },
    UserAdded: (state, action) => {
      // //console.log("in here!");
      state.userName = action.payload.username;
      state.avatar = action.payload.avatar;
      state.error = null;
    },
    addRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    setUserAvatar: (state, action) => {
      state.avatar = action.avatar;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setRoomError: (state, action) => {
      //console.log("piloood", action.payload);
      state.roomError = action.payload;
    },
    addRoomRequest: (state) => {
      state.roomError = null;
    },
    joinRoomRequest: (state) => {
      state.roomError = null;
    },
    addToChat: (state, action) => {
      state.chat = [...state.chat, action.payload];
    },
    sendMessage: (state) => {
      state.chat = [...state.chat];
    },
    creatRoomFromUrl: (action) => { },
    setAdmin: (state, action) => {
      if (action.payload === 1)
        state.admin = true;
      else
        state.admin = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUser,
  addRoomName,
  setUserAvatar,
  setError,
  UserAdded,
  setRoomError,
  addRoomRequest,
  joinRoomRequest,
  addToChat,
  sendMessage,
  setAdmin
} = playerSlice.actions;

export default playerSlice.reducer;
