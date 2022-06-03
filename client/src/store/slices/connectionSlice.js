import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connected: false,
    connecting: false,
};

const connectionSlice = createSlice({
    name: "connection",
    initialState,
    reducers: {
        startConnecting(state) {
            state.connecting = true;
        },
        isConnected(state) {
            state.connected = true;
        },
    },
});

export const { startConnecting, isConnected } = connectionSlice.actions;
export default connectionSlice.reducer;
