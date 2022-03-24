import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
  name: 'playersReducer',
  initialState: {
    userName : null,
    roomName : null,
    avatar: null
  },
  reducers: {
    addUser: (state, action) => {
      state.userName = action.payload;
    },
    addRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    setUserAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser, addRoomName, setUserAvatar } = playerSlice.actions

export default playerSlice.reducer