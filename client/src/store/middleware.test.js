import { addPlayerRequest } from "./slices/playerSlice";
const { socketMiddleware } = require("./middleware");
// const create = () => {
//     const store = {
//         getState: jest.fn(() => ({})),
//         dispatch: jest.fn(),
//     };
//     const next = jest.fn();

//     const invoke = (action) => thunk(store)(next)(action);

//     return { store, next, invoke };
// };

// test("passes through non-function action", () => {
//     const { next, invoke } = create();
//     const action = { type: "TEST" };
//     invoke(action);
//     expect(next).toHaveBeenCalledWith(action);
// });

// test("calls the function", () => {
//     const { invoke } = create();
//     const fn = jest.fn();
//     invoke(fn);
//     expect(fn).toHaveBeenCalled();
// });

// test("passes dispatch and getState", () => {
//     const { store, invoke } = create();
//     invoke((dispatch, getState) => {
//         dispatch("TEST DISPATCH");
//         getState();
//     });
//     expect(store.dispatch).toHaveBeenCalledWith("TEST DISPATCH");
//     expect(store.getState).toHaveBeenCalled();
// });

const create = () => {
    const store = { getState: jest.fn(() => ({})), dispatch: jest.fn() };
    const next = jest.fn();
    const invoke = (action) => socketMiddleware(store)(next)(action);
    return { store, next, invoke };
};

describe("test socket middleware", () => {
    test("passes through non-function action", () => {
        const { next, invoke } = create();
        const action = { type: "TEST" };
        invoke(action);
        expect(next).toHaveBeenCalledWith(action);
    });
    // test("calls the function", () => {
    //     const { invoke } = create();
    //     const fn = jest.fn();
    //     invoke(fn);
    //     expect(fn).toHaveBeenCalled();
    // });
    // test("passes dispatch and getState", () => {
    //     const { store, invoke } = create();
    //     invoke((dispatch, getState) => {
    //         dispatch("connectionReducer/startConnecting");
    //         getState();
    //     });
    //     expect(store.dispatch).toHaveBeenCalledWith(
    //         "connectionReducer/startConnecting"
    //     );
    //     expect(store.getState).toHaveBeenCalled();
    // });
});
