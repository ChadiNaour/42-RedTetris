import { render, screen } from "@testing-library/react";
import Rooms from "./Rooms";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";
import { RoomCard } from "./Rooms";

const mockStore = configureStore();

describe("Rooms", () => {
    let store;
    beforeEach(() => {
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
            rooms: {},
        });
        render(
            <Provider store={store}>
                <Rooms />
            </Provider>
        );
    });
    test("render component", () => {
        const header = screen.getByRole("heading");
        expect(header).toBeInTheDocument();
    });
    test("input should be initially empty", () => {
        let inputRoomName = screen.getByRole("textbox");
        expect(inputRoomName.value).toBe("");
    });
    test("should be able to type a room name", () => {
        const inputRoomName = screen.getByRole("textbox");
        userEvent.type(inputRoomName, "farwiladsds");
        expect(inputRoomName.value).toBe("farwiladsds");
    });
    test("select mode", () => {
        const mode = screen.getByRole("button", { name: "Mode" });
        userEvent.click(mode);
        expect(screen.getByText("solo")).toBeInTheDocument();
        expect(screen.getByText("battle")).toBeInTheDocument();
    });
    test("create button", () => {
        const create = screen.getByRole("button", { name: "Create" });
        expect(create).toBeInTheDocument();
    });
    test("handle create button", () => {
        const create = screen.getByRole("button", { name: "Create" });
        const inputRoomName = screen.getByRole("textbox");
        userEvent.type(inputRoomName, "farwiladsds");
        userEvent.click(create);
        store = mockStore({
            connection: {
                connected: true,
                connecting: true,
            },
            player: {
                userName: "farwila",
                roomName: "farwiladsds",
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
                <Rooms />
            </Provider>
        );

        let room = {
            name: "farwiladsds",
            mode: "solo",
            maxPlayers: 1,
            playersIn: 1,
            state: false,
        };
        const text = screen.queryByText("No rooms found");
        expect(text).not.toBeInTheDocument();
        expect(screen.getByText("farwiladsds")).toBeInTheDocument();
    });
});

describe("Room Card", () => {
    test("room card test", () => {
        let room = {
            name: "pikala",
            mode: "solo",
            maxPlayers: 1,
            playersIn: 1,
            state: false,
        };
        let joinRoom = jest.fn();
        render(<RoomCard room={room} joinRoom={joinRoom} />);
        let name = screen.getByRole("name");
        let maxPlayers = screen.getByRole("maxPlayers");
        let playersIn = screen.getByRole("playersIn");
        let svg = screen.getByRole("svg");
        let click = screen.getByRole("click");
        expect(name).toBeInTheDocument();
        expect(maxPlayers).toBeInTheDocument();
        expect(playersIn).toBeInTheDocument();
        expect(svg).toBeInTheDocument();
        userEvent.click(click);
        expect(joinRoom).toHaveBeenCalled();
    });
});
