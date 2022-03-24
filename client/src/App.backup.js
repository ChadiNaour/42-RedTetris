import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import styled, { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import Rooms from "./views/Rooms";
import { Theme } from "./utils/theme";
import NavBar from "./components/NavBar/NavBar";
import Game from "./views/Game";
import Home from "./views/Home";
import { updatePlayers } from "./store/slices/playersSlice";
import { Outlet, Route, Routes, Navigate } from "react-router";

const socket = io.connect("http://localhost:3001");

const Layout = () => {
  return (
    <StyledApp>
      <Outlet />
    </StyledApp>
  );
};

const ProtectedRoute = ({ children }) => {
  const player = useSelector((state) => state.player);
  if (player.userName) return <Outlet />;
  return <Navigate to="/home" />;
};

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
  const rooms = useSelector((state) => state.roomsReducer.rooms);
  const dispatch = useDispatch();
  const [userRoom, setUserRoom] = useState(null);

  const setRoomUser = (data) => {
    var rooom = rooms.find((room) => room.name === data);
    setUserRoom(rooms.find((room) => room.name === data));
    getRoomplayers(rooom);
  };

  const getRoomplayers = (userRoom) => {
    console.log("the useroooom is", userRoom);
    if (userRoom) {
      socket.emit("getPlayers", userRoom.name);
    }
  };

  useEffect(() => {
    socket.on("update_players", (data) => {
      console.log("the palyers are", data);
      dispatch(updatePlayers(data));
    });
    if (user.roomName && rooms.length > 0) {
      // setUserRoom(rooms.find(room => room.name === user.roomName));
      setRoomUser(user.roomName);
      // console.log("the userRoom is : ", userRoom);
      // getRoomplayers(userRoom);
      // if (userRoom)
      // {
      // console.log("in the if")
      // }
    }
    // console.log("the user name is", userRoom);
  }, [rooms]);

  return (
    // <BrowserRouter>
    <div className="App">
      <ThemeProvider theme={Theme}>
        <StyledApp className="App">
          {user.userName ? <NavBar user={user} /> : ""}
          {/* {(user.userName && user.roomName) ? <div className='bg-green-300'>{userRoom?.name}</div> : ""} */}
          {!user.userName ? <Home socket={socket} /> : ""}
          {user.userName && user.roomName ? <Game userRoom={userRoom} /> : ""}
          {user.userName && !user.roomName ? <Rooms socket={socket} /> : ""}
        </StyledApp>
      </ThemeProvider>
    </div>
  );
}

export default App;
