import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "playerReducer",
    initialState: {
        userName: null,
        roomName: null,
        avatar: null,
        error: null,
        roomError: null,
        loading: false,
        chat: [],
        stages: [],
        admin: null,
        adminError: null,
        gameEnd: null,
        gameOver: null,
        tetros: [],
        wall: false,
    },
    reducers: {
        addPlayerRequest(state) {
            state.loading = true;
        },
        addPlayerSuccess(state, action) {
            state.userName = action.payload.username;
            state.avatar = action.payload.avatar;
            state.loading = false;
        },
        seRoomError: (state, action) => {
            state.roomError = action.payload;
        },
        addPlayerFail(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        addRoomRequest: (state, action) => {
            state.loading = true;
        },
        addRoomName: (state, action) => {
            state.roomName = action.payload;
            state.loading = false;
        },
        setAdmin: (state, action) => {
            if (action.payload === 1) state.admin = true;
            else state.admin = false;
        },
        joinRoomRequest: (state, action) => {
            state.loading = true;
        },
        sendMessage: (state) => {
            state.chat = [...state.chat];
        },
        addToChat: (state, action) => {
            state.chat = [...state.chat, action.payload];
        },
        startTheGameRequest: (state) => {
            state.gameEnd = false;
            state.gameOver = false;
            state.adminError = null;
            state.tetros = [];
        },
        startTheGame: (state, action) => {
            state.gameEnd = false;
            state.gameOver = false;
            state.tetros = action.payload;
            state.adminError = null;
        },
        setAdminError: (state, action) => {
            state.adminError = true;
        },
        ShiftTetros: (state, action) => {
            state.tetros.shift();
        },
        newTetrosRequest: (state) => {},
        concatTetros: (state, action) => {
            let newTetros = [];
            state.tetros = newTetros.concat(state.tetros, action.payload);
            // state.tetros.concat(state.tetros, action.payload);
        },
        sendStage: (action) => {},
        setStage: (state, action) => {
            // console.log("in adding action",action.payload)
            if (!state.stages.length) {
                state.stages.push(action.payload);
            } else {
                let Stg = state.stages.filter(
                    (stg) => stg.username === action.payload.username
                );
                if (Stg[0]?.username) Stg[0].stage = action.payload.stage;
                else {
                    state.stages.push(action.payload);
                    // socket.emit("checkStages", { Stages, stage, room: roomname });
                }
            }
        },
        addWallRequest: (action) => {},
        AddWall: (state, action) => {
            console.log("hhhhhhhhhh", action.payload);
            state.wall = action.payload.wall;
        },
        gameOverAction: (state, action) => {
            state.gameOver = true;
        },
        GameFinishedPlayer: (state, action) => {
            state.gameEnd = true;
            state.wall = false;
            state.tetros = [];
        },
        leaveRoomRequest: (state, action) => {},
        leaveRoomSuccess: (state, action) => {
            state.roomName = null;
            state.error = null;
            state.roomError = null;
            state.loading = false;
            state.chat = [];
            state.stages = [];
            state.admin = null;
            state.adminError = null;
            state.gameEnd = null;
            state.gameOver = null;
            state.tetros = [];
            state.wall = false;
        },
        joinRoomFromLink: (state, action) => {},
    },
});

// Action creators are generated for each case reducer function
export const {
    addPlayerRequest,
    addPlayerSuccess,
    addPlayerFail,
    addRoomRequest,
    addRoomName,
    setAdmin,
    joinRoomRequest,
    sendMessage,
    ShiftTetros,
    addWallRequest,
    sendStage,
    newTetrosRequest,
    startTheGameRequest,
    addToChat,
    setAdminError,
    startTheGame,
    concatTetros,
    setStage,
    AddWall,
    gameOverRequ,
    gameOverAction,
    GameFinishedPlayer,
    seRoomError,
    leaveRoomRequest,
    leaveRoomSuccess,
    joinRoomFromLink,
} = playerSlice.actions;

export default playerSlice.reducer;
