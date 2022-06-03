import configureStore from "redux-mock-store";
import Tetris from "./Tetris";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { createStage } from "../../utils/gameHelpers";

describe("Tetris", () => {
    test("tetris display", () => {
        let store;
        let stage = createStage();
        const mockStore = configureStore();
        store = mockStore({
            connection: {
                connected: true,
                connecting: true,
            },
            player: {
                userName: "farwila",
                roomName: null,
                avatar: null,
                error: null,
                roomError: null,
                loading: false,
                chat: [],
            },
        });
        let move = jest.fn();
        let setStart = jest.fn();
        let keyUp = jest.fn();
        let gameOver = false;
        let start = true;
        let UserPlayer = "farwila";
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Tetris
                        move={move}
                        setStart={setStart}
                        keyUp={keyUp}
                        stage={stage}
                        gameOver={gameOver}
                        start={start}
                        UserPlayer={UserPlayer}
                    />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    test("tetris !display", () => {
        let store;
        let stage = createStage();
        const mockStore = configureStore();
        store = mockStore({
            connection: {
                connected: true,
                connecting: true,
            },
            player: {
                userName: "farwila",
                roomName: null,
                avatar: null,
                error: null,
                roomError: null,
                loading: false,
                chat: [],
            },
        });
        let move = jest.fn();
        let setStart = jest.fn();
        let keyUp = jest.fn();
        let gameOver = false;
        let start = false;
        let UserPlayer = "farwila";
        const tree = renderer
            .create(
                <Provider store={store}>
                    <Tetris
                        move={move}
                        setStart={setStart}
                        keyUp={keyUp}
                        stage={stage}
                        gameOver={gameOver}
                        start={start}
                        UserPlayer={UserPlayer}
                    />
                </Provider>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
