import { createSlice } from "@reduxjs/toolkit";

export const roomsSlice = createSlice({
    name: "roomsReducer",
    initialState: {
        loading: false,
        rooms: null,
        error: null,
    },
    reducers: {
        getRoomsRequest: (state, action) => {
            state.loading = true;
        },
        getRoomsSuccess: (state, action) => {
            state.rooms = action.payload;
        },
        getRoomsFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateRooms: (state, action) => {
            state.rooms = action.payload;
            state.loading = false;
        },
    },
});

export const { updateRooms, getRoomsRequest, getRoomsSuccess, getRoomsFailed } =
    roomsSlice.actions;

export default roomsSlice.reducer;
