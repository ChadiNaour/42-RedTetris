import reducer from "./playersSlice";
import { updatePlayers } from "./playersSlice";

describe("playersSlice", () => {
    let initialState = {
        players: [],
    };
    test("should return the initial value", () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    test("update Players", () => {
        expect(
            reducer(initialState, updatePlayers([{ item: "pikala" }]))
        ).toEqual({ players: [{ item: "pikala" }] });
    });
});
