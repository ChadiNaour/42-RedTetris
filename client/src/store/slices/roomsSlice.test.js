import reducer, {
    getRoomsRequest,
    getRoomsSuccess,
    getRoomsFailed,
    updateRooms,
} from "./roomsSlice";

describe("test rooms slice", () => {
    let initialState = {
        loading: false,
        rooms: null,
        error: null,
    };
    test("should return the initial value", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    test("get rooms request", () => {
        expect(reducer(initialState, getRoomsRequest())).toEqual({
            ...initialState,
            loading: true,
        });
    });
    test("get rooms succes", () => {
        let rooms = [
            {
                name: "padd",
                mode: "solo",
                maxPlayers: 10,
                playersIn: 1,
                state: false,
            },
        ];
        expect(reducer({ ...initialState }, getRoomsSuccess(rooms))).toEqual({
            ...initialState,
            rooms: rooms,
        });
    });
    test("getRoomsfailed", () => {
        expect(reducer(initialState, getRoomsFailed("room exist"))).toEqual({
            ...initialState,
            error: "room exist",
        });
    });
    test("update rooms", () => {
        let rooms = [
            {
                name: "padd",
                mode: "solo",
                maxPlayers: 10,
                playersIn: 1,
                state: false,
            },
        ];
        expect(reducer({ ...initialState }, updateRooms(rooms))).toEqual({
            ...initialState,
            rooms: rooms,
        });
    });
});
