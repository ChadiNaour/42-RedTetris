import { createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
  name: "roomsReducer",
  initialState: {
    rooms: [],
  },
  reducers: {
    updateRooms: (state, action) => {
      // console.log(action)
      state.rooms = action.payload;
      // console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
