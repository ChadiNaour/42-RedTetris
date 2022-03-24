import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "playersReducer",
  initialState: {
    userName: null,
    roomName: null,
    avatar: null,
    error: null,
  },
  reducers: {
    addUser: (action) => {
      return action;
    },
    UserAdded: (state, action) => {
      // console.log("in here!");
      state.userName = action.payload.username;
      state.avatar = action.payload.avatar;
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
  },
});

// Action creators are generated for each case reducer function
export const { addUser, addRoomName, setUserAvatar, setError, UserAdded } =
  playerSlice.actions;

export default playerSlice.reducer;
