import reducer from "./connectionSlice";
import { startConnecting, isConnected } from "./connectionSlice";

describe("test connection slice", () => {
    test("should return the initial value", () => {
        expect(reducer(undefined, {})).toEqual({
            connected: false,
            connecting: false,
        });
    });
    test("should handle start connecting", () => {
        expect(
            reducer({ connected: false, connecting: false }, startConnecting())
        ).toEqual({
            connected: false,
            connecting: true,
        });
    });
    test("should handle connecting with socket", () => {
        expect(
            reducer({ connected: false, connecting: true }, isConnected())
        ).toEqual({
            connected: true,
            connecting: true,
        });
    });
});
