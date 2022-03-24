import { createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
  name: "roomsReducer",
  initialState: {
    rooms: [],
  },
  reducers: {
    addRoomRequest: () => {},
    updateRooms: (state, action) => {
      // console.log(action)
      state.rooms = action.payload;
      // console.log(action.payload);
    },
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
export const { updateRooms, addRoomRequest } = roomsSlice.actions;

export default roomsSlice.reducer;
