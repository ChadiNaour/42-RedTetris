import { TETROMINOS } from "./tetrominos";

test("Test Tetrominos", () => {
    expect(TETROMINOS[0]).toEqual({
        color: "0,0,0",
        shape: [[0]],
    });
    expect(TETROMINOS["J"]).toEqual({
        shape: [
            ["J", 0, 0],
            ["J", "J", "J"],
            [0, 0, 0],
        ],
        color: "36, 95, 223",
    });
    expect(TETROMINOS["L"]).toEqual({
        shape: [
            [0, 0, "L"],
            ["L", "L", "L"],
            [0, 0, 0],
        ],
        color: "223, 173, 36",
    });
    expect(TETROMINOS["S"]).toEqual({
        shape: [
            [0, "S", "S"],
            ["S", "S", 0],
            [0, 0, 0],
        ],
        color: "48, 211, 56",
    });
    expect(TETROMINOS["T"]).toEqual({
        shape: [
            ["T", "T", "T"],
            [0, "T", 0],
            [0, 0, 0],
        ],
        color: "132, 61, 198",
    });
});
