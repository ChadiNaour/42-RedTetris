import { createSlice } from '@reduxjs/toolkit'

export const playersSlice = createSlice({
  name: 'playersReducer',
  initialState: {
    players : [],
  },
  reducers: {
    updatePlayers: (state, action) => {
      state.players = action.payload;

    },
  },
})

// Action creators are generated for each case reducer function
export const { updatePlayers } = playersSlice.actions

export default playersSlice.reducer