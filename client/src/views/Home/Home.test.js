import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { socketMiddleware } from "../../store/middleware";
import userEvent from "@testing-library/user-event";

const middlewares = [socketMiddleware, thunk];
const mockStore = configureStore(middlewares);

describe("Home", () => {
    let store;
    beforeEach(() => {
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
                <Home />
            </Provider>
        );
    });

    test("input should be initially empty", () => {
        const userNameInput = screen.getByRole("textbox");
        expect(userNameInput.value).toBe("");
    });
    test("should be able to type a username", () => {
        const userNameInput = screen.getByRole("textbox");
        userEvent.type(userNameInput, "farwiladsds");
        expect(userNameInput.value).toBe("farwiladsds");
    });
    test("should show userName error", () => {
        const userNameInput = screen.getByRole("textbox");
        const button = screen.getByRole("button", { name: "play" });
        let errorMessage = screen.queryByTitle("errorMessage");
        expect(errorMessage).not.toBeInTheDocument();
        userEvent.type(userNameInput, "123");
        userEvent.click(button);
        errorMessage = screen.queryByTitle("errorMessage");
        expect(errorMessage).toBeInTheDocument();
    });
    test("avatar sould be initially not empty", () => {
        const avatarExist = screen.getByRole("img", { name: "Avatar" });
        expect(avatarExist).toBeInTheDocument();
    });
    test("change avatar", () => {
        const avatar = screen.getByRole("img", { name: "Avatar" });
        const changeAvatar = screen.getByTitle("changeAvatar");
        userEvent.click(changeAvatar);
        const newAvatar = screen.getByTitle("changeAvatar");
        expect(newAvatar === avatar).toBeFalsy();
    });
});
