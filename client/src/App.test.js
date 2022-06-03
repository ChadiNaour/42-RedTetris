import { render, screen } from "@testing-library/react";
import App from "./App";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { socketMiddleware } from "./store/middleware";
import { Provider } from "react-redux";

const mockStore = configureStore();

describe("renders learn react link", () => {
    let store;
    test("render home component", () => {
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
                <App />
            </Provider>
        );
        const userNameInput = screen.getByRole("textbox");
        expect(userNameInput.value).toBe("");
        const avatar = screen.getByRole("img", { name: "Avatar" });
        expect(avatar).toBeInTheDocument();
    });
    test("render rooms component", () => {
        store = mockStore({
            connection: {
                connected: true,
                connecting: true,
            },
            player: {
                userName: "farwila",
                roomName: null,
                avatar: "Agoumi.png",
                error: null,
                roomError: null,
                loading: false,
                chat: [],
            },
            rooms: {
                loading: false,
                error: false,
                rooms: [
                    {
                        name: "farwiladsds",
                        mode: "solo",
                        maxPlayers: 1,
                        playersIn: 1,
                        state: false,
                    },
                ],
            },
        });
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        const userNameInput = screen.getByRole("textbox");
        expect(userNameInput.value).toBe("");
        const avatar = screen.getByRole("img", { name: "Avatar" });
        expect(avatar).toBeInTheDocument();
        const header = screen.getByRole("heading");
        expect(header).toBeInTheDocument();
        expect(screen.getByText("farwiladsds")).toBeInTheDocument();
    });
});
