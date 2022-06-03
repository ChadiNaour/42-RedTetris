import { render, screen } from "@testing-library/react";
import { socketMiddleware } from "../../store/middleware";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import StartButoon from "./StartButton";

const middlewares = [socketMiddleware, thunk];
const mockStore = configureStore(middlewares);
describe("start button", () => {
    let store;
    test("create should be Displayed", () => {
        store = mockStore({
            connection: {
                connected: true,
                connecting: true,
            },
            player: {
                userName: null,
                roomName: null,
                avatar: null,
                error: null,
                roomError: null,
                loading: false,
                chat: [],
            },
        });
        render(
            <Provider store={store}>
                <StartButoon />
            </Provider>
        );
        let elem = screen.getByText("Create");
        expect(elem).toBeInTheDocument();
    });
});
