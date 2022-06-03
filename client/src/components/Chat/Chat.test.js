//{username: 'farwila', socketId: 'A1v2hWTRPgO3Zu68AAAD', avatar: 'Binx_Bond.png', room: ''}
import renderer from "react-test-renderer";
import Chat from "./Chat";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";
const mockStore = configureStore();
describe("Chat", () => {
    test("display chat", () => {
        let store = mockStore({
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
        let players = [
            {
                username: "farwila",
                socketId: "jM873O7z1xO3C6biAAAH",
                avatar: "Agoumi.png",
                room: "roomtest",
                admin: false,
            },
            {
                username: "jarwila",
                socketId: "KlYaUDrEVogzp1K5AAAF",
                avatar: "ChingChang.png",
                room: "roomtest",
                admin: true,
            },
        ];
        let player = {
            userName: "farwila",
            roomName: "roomtest",
            avatar: "Agoumi.png",
            error: null,
            roomError: null,
            loading: false,
            chat: [
                {
                    message: "Player jarwila created the room roomtest",
                    type: "join",
                },
                {
                    message: "Player farwila joined the room roomtest",
                    type: "join",
                },
                {
                    sender: {
                        username: "jarwila",
                        socketId: "KlYaUDrEVogzp1K5AAAF",
                        avatar: "ChingChang.png",
                        room: "roomtest",
                        admin: true,
                    },
                    message: "asdf",
                    type: "message",
                },
                {
                    sender: {
                        username: "farwila",
                        socketId: "jM873O7z1xO3C6biAAAH",
                        avatar: "Agoumi.png",
                        room: "roomtest",
                        admin: false,
                    },
                    message: "asdff",
                    type: "message",
                },
                {
                    message: "Player jarwila loses",
                    type: "join",
                },
                {
                    message: "farwila WIN the game ",
                    type: "join",
                },
            ],
        };
        render(
            <Provider store={store}>
                <Chat players={players} player={player} />
            </Provider>
        );
        let elem = screen.getByText("Player jarwila loses");
        expect(elem).toBeInTheDocument();
        // const tree = renderer
        //     .create(
        //         <Provider store={store}>
        //             <Chat players={players} player={player} />
        //         </Provider>
        //     )
        //     .toJSON();
        // expect(tree).toMatchSnapshot();
    });
});
