import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
import styled, { ThemeProvider } from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import Rooms from "./views/Rooms";
import { Theme } from "./utils/theme";
import NavBar from "./components/NavBar/NavBar";
import Game from "./views/Game";
import Home from "./views/Home";

const socket = io.connect("http://localhost:3001");


const StyledApp = styled.div`
  width: 100vw;
  height: auto;
  /* height: auto; */
  height: 100vh;
  min-height: 100vh;
  /* padding: 2rem; */
  background-color: ${(props) => props.theme.background.primary};
`;

function App() {

        let user = useSelector((state) => state.playerReducer);
        const [avatar, setAvatar] = useState("");
        const rooms = useSelector((state) => state.roomsReducer.rooms)
        const [userRoom, setUserRoom] = useState(null);
        console.log("the user is", user);

        useEffect(() => {
                if (user.roomName && rooms.length > 0)
                {
                        setUserRoom(rooms.find(room => room.name === user.roomName))

                }
                console.log("the user name is",userRoom);
        },[rooms])

        return (
                // <BrowserRouter>
                <div className="App">
                        <ThemeProvider theme={Theme}>
                                <StyledApp className="App">
                                        {(user.userName && !user.roomName) ?<NavBar user={user} avatar={avatar} /> : ""}
                                        {/* {(user.userName && user.roomName) ? <div className='bg-green-300'>{userRoom?.name}</div> : ""} */}
                                        {!user.userName ? <Home socket={socket} avatar={avatar} setAvatar={setAvatar} /> : ""}
                                        {(user.userName && user.roomName) ? <Game userRoom={userRoom} /> : ""}
                                        {(user.userName && !user.roomName) ? <Rooms socket={socket} /> : ""}

                                </StyledApp>
                        </ThemeProvider>
                </div>
        );
}

export default App;
