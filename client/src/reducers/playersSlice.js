import { createSlice } from '@reduxjs/toolkit'

export const playersSlice = createSlice({
  name: 'playersReducer',
  initialState: {
    players : [],
  },
  reducers: {
    // updateRooms: (state, action) => {
    //   state.rooms = action.payload;

    // },
  },
})

// Action creators are generated for each case reducer function
export const { updateRooms } = playersSlice.actions

export default playersSlice.reducer