import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
  name: 'playersReducer',
  initialState: {
    userName : null,
    roomName : null
  },
  reducers: {
    addUser: (state, action) => {
      state.userName = action.payload;
    },
    addRoomName: (state, action) => {
      state.roomName = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser, addRoomName } = playerSlice.actions

export default playerSlice.reducer