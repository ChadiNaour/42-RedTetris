import { createSlice } from "@reduxjs/toolkit";

export const playersSlice = createSlice({
    name: "playersReducer",
    initialState: {
        players: [],
    },
    reducers: {
        updatePlayers: (state, action) => {
            state.players = action.payload;
        },
        GameFinishedPlayers: (state, action) => {
            state.players = [];
        }
    },
});

// Action creators are generated for each case reducer function
export const { updatePlayers, GameFinishedPlayers } = playersSlice.actions;

export default playersSlice.reducer;
