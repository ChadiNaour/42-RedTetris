import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "playerReducer",
  initialState: {
    userName: null,
    error: null,
    roomName: null,
    roomError: null,
    avatar: null,
    chat: [],
    admin: null,
    adminError : null,
    gameEnd: null,
    gameOver: null,
    tetros: [],
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
    startTheGameRequest: (state) => {
      state.gameEnd = null;
      state.gameOver = null;
      state.adminError = null;
      state.tetros = [];

    },
    startTheGame: (state, action) => {
      state.gameEnd = false;
      state.gameOver = false;
      state.tetros = action.payload;
      state.adminError = null;
    },
    setAdminError: (state, action) => {
      state.adminError = true;
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
  setAdmin,
  startTheGameRequest,
  startTheGame,
  setAdminError
} = playerSlice.actions;

export default playerSlice.reducer;
