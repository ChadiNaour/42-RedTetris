import reducer, {
    addRoomName,
    addRoomRequest,
    addToChat,
    addWallRequest,
    concatTetros,
    GameFinishedPlayer,
    gameOverAction,
    joinRoomFromLink,
    joinRoomRequest,
    leaveRoomRequest,
    leaveRoomSuccess,
    newTetrosRequest,
    sendMessage,
    sendStage,
    setAdmin,
    setStage,
    ShiftTetros,
    startTheGame,
    startTheGameRequest,
} from "./playerSlice";
import {
    addPlayerRequest,
    addPlayerSuccess,
    addPlayerFail,
} from "./playerSlice";

describe("test connection slice", () => {
    let initialValue = {
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
    };
    let player = { id: 0, name: "Agoumi", ImagePng: "Agoumi.png" };
    let playerLogged = {
        ...initialValue,
        loading: false,
        userName: "farwila",
        avatar: player,
    };
    test("should return the initial value", () => {
        expect(reducer(undefined, {})).toEqual(initialValue);
    });
    test("add player request", () => {
        expect(reducer(initialValue, addPlayerRequest())).toEqual({
            ...initialValue,
            loading: true,
        });
    });
    test("add player success", () => {
        expect(
            reducer(
                { ...initialValue, loading: true },
                addPlayerSuccess({ username: "farwila", avatar: player })
            )
        ).toEqual({
            ...initialValue,
            loading: false,
            userName: "farwila",
            avatar: player,
        });
    });
    test("add player failed", () => {
        expect(
            reducer(
                { ...initialValue, loading: true },
                addPlayerFail({ ...initialValue, error: "user existe" })
            )
        ).toEqual({
            ...initialValue,
            loading: false,
            error: "user existe",
        });
    });
    test("add room request", () => {
        expect(reducer({ ...playerLogged }, addRoomRequest())).toEqual({
            ...playerLogged,
            loading: true,
        });
    });
    test("add room name", () => {
        expect(reducer({ ...playerLogged }, addRoomName("pikala"))).toEqual({
            ...playerLogged,
            loading: false,
            roomName: "pikala",
        });
    });
    test("set player as admin", () => {
        expect(
            reducer({ ...playerLogged, roomName: "pikala" }, setAdmin(1))
        ).toEqual({
            ...playerLogged,
            loading: false,
            roomName: "pikala",
            admin: true,
        });
    });
    test("set player", () => {
        expect(
            reducer({ ...playerLogged, roomName: "pikala" }, setAdmin(0))
        ).toEqual({
            ...playerLogged,
            loading: false,
            roomName: "pikala",
            admin: false,
        });
    });
    test("join room", () => {
        expect(reducer({ ...playerLogged }, joinRoomRequest(1))).toEqual({
            ...playerLogged,
            loading: true,
        });
    });
    test("chat", () => {
        expect(reducer({ ...playerLogged }, sendMessage())).toEqual({
            ...playerLogged,
        });
    });
    test("shift tetros", () => {
        expect(reducer({ ...playerLogged }, ShiftTetros())).toEqual({
            ...playerLogged,
        });
    });
    test("add chat", () => {
        expect(reducer(playerLogged, addToChat("farwila"))).toEqual({
            ...playerLogged,
            chat: [...playerLogged.chat, "farwila"],
        });
    });
    test("add wall", () => {
        expect(reducer({ ...playerLogged }, addWallRequest())).toEqual({
            ...playerLogged,
        });
    });
    test("start the game request", () => {
        expect(reducer({ ...playerLogged }, startTheGameRequest())).toEqual({
            ...playerLogged,
            gameEnd: false,
            gameOver: false,
            adminError: null,
            tetros: [],
        });
    });
    test("start the game", () => {
        expect(
            reducer(
                { ...playerLogged, gameEnd: false, gameOver: false },
                startTheGame([{ item: "pikala" }])
            )
        ).toEqual({
            ...playerLogged,
            adminError: null,
            gameEnd: false,
            gameOver: false,
            tetros: [{ item: "pikala" }],
        });
    });
    test("new tetros", () => {
        expect(reducer({ ...playerLogged }, newTetrosRequest())).toEqual({
            ...playerLogged,
        });
    });
    test("concat tetros", () => {
        expect(
            reducer(
                { ...playerLogged, tetros: [{ item: "pikala" }] },
                concatTetros([{ item: "farwila" }])
            )
        ).toEqual({
            ...playerLogged,
            tetros: [{ item: "pikala" }, { item: "farwila" }],
        });
    });
    test("send stage", () => {
        expect(reducer({ ...playerLogged }, sendStage())).toEqual({
            ...playerLogged,
        });
    });
    test("addWallRequest", () => {
        expect(reducer({ ...playerLogged }, addWallRequest())).toEqual({
            ...playerLogged,
        });
    });
    test("setStage", () => {
        expect(
            reducer({ ...playerLogged }, setStage({ item: "fech" }))
        ).toEqual({
            ...playerLogged,
            stages: [{ item: "fech" }],
        });
    });
    test("gameOver", () => {
        expect(reducer({ ...playerLogged }, gameOverAction())).toEqual({
            ...playerLogged,
            gameOver: true,
        });
    });
    test("GameFinishedPlayer", () => {
        expect(reducer({ ...playerLogged }, GameFinishedPlayer())).toEqual({
            ...playerLogged,
            gameEnd: true,
            wall: false,
            tetros: [],
        });
    });
    test("leaveRoomRequest", () => {
        expect(reducer({ ...playerLogged }, leaveRoomRequest())).toEqual({
            ...playerLogged,
        });
    });
    test("joinRoomFromLink", () => {
        expect(reducer({ ...playerLogged }, joinRoomFromLink())).toEqual({
            ...playerLogged,
        });
    });
    test("leaveRoomSuccess", () => {
        expect(reducer({ ...playerLogged }, leaveRoomSuccess())).toEqual({
            ...playerLogged,
            roomName: null,
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
        });
    });
});
