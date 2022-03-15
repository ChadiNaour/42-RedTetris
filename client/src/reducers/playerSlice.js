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
    clearUser: (state) => {
      state.userName = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser, clearUser } = playerSlice.actions

export default playerSlice.reducer