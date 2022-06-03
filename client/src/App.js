import "./App.css";
import Home from "./views/Home/Home";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./utils/theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/NavBar/NavBar";
import Rooms from "./views/Rooms/Rooms";
import {
    addPlayerRequest,
    addRoomRequest,
    joinRoomFromLink,
} from "./store/slices/playerSlice";
import { startConnecting } from "./store/slices/connectionSlice";
import Game from "./views/Game/Game";

const StyledApp = styled.div`
    width: 100vw;
    height: auto;
    height: 100vh;
    background-color: ${(props) => props.theme.background.primary};
`;

function App() {
    const { player } = useSelector((state) => state);
    const {
        connection: { connected: connected },
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startConnecting());
    }, []);
    useEffect(() => {
        if (connected) {
            let hash = window.location.hash;
            let room;
            let firstIndex = hash.indexOf("[");
            room = hash.substring(1, firstIndex);
            let username = hash.substring(
                firstIndex + 1,
                hash.indexOf("]", firstIndex)
            );
            if (username && room)
                dispatch(joinRoomFromLink({ username, room }));
            else if (username && !room) {
                dispatch(
                    addPlayerRequest({
                        username: username,
                        avatar: "Rhett_James.png",
                    })
                );
            }
        }
    }, [connected]);
    return (
        <ThemeProvider theme={Theme}>
            <StyledApp>
                {!player.userName ? (
                    <Home />
                ) : (
                    <>
                        <Navbar user={player} />
                        {!player.roomName ? <Rooms /> : <Game />}
                    </>
                )}
            </StyledApp>
        </ThemeProvider>
    );
}

export default App;
