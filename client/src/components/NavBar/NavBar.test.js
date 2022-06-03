import { render, screen } from "@testing-library/react";
import Navbar from "./NavBar";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";

const mockStore = configureStore();

describe("Navbar", () => {
    test("render avatar", () => {
        let store;
        store = mockStore({
            connection: {
                connected: true,
                connecting: true,
            },
            player: {
                userName: null,
                roomName: null,
                avatar: null,
                admin: true,
                error: null,
                roomError: null,
                loading: false,
                chat: [],
            },
        });
        let user = { avatar: "Agoumi.png", userName: "bigola" };
        render(
            <Provider store={store}>
                <Navbar user={user} />
            </Provider>
        );
        const avatar = screen.getByRole("img");
        const userName = screen.getByText("bigola");
        expect(avatar.src).toBe("http://localhost/Agoumi.png");
        expect(userName).toBeInTheDocument();
    });
    test("leaveRoom", () => {
        let store;
        store = mockStore({
            connection: {
                connected: true,
                connecting: true,
            },
            player: {
                userName: "dsfsdfg",
                roomName: "dsaf",
                avatar: "Agoumi.png",
                error: null,
                roomError: null,
                loading: false,
                chat: [
                    {
                        message: "Player dsfsdfg created the room dsaf",
                        type: "join",
                    },
                ],
                stages: [],
                admin: true,
                adminError: null,
                gameEnd: null,
                gameOver: null,
                tetros: [],
                wall: false,
            },
            rooms: {
                loading: false,
                rooms: [
                    {
                        name: "dsaf",
                        mode: "battle",
                        maxPlayers: 5,
                        playersIn: 1,
                        state: false,
                        stages: [],
                    },
                ],
                error: null,
            },
            players: {
                players: [],
            },
        });
        let user = { avatar: "Agoumi.png", userName: "bigola" };
        render(
            <Provider store={store}>
                <Navbar user={user} />
            </Provider>
        );
        let elem = screen.getByRole("leave");
        userEvent.click(elem);
    });
});
