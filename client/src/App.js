import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import styled, { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import Rooms from "./views/Rooms";
import { Theme } from "./utils/theme";
import NavBar from "./components/NavBar/NavBar";
import NoMatch from "./components/NoMatch";
import Game from "./views/Game";
import Home from "./views/Home";
import { startConnecting, isConnected } from "./store/slices/connectionSlice";
import {
  Outlet,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router";
import {
  addRoomRequest,
  addUser,
  joinRoomRequest,
} from "./store/slices/playerSlice";
import { getRoomsRequest } from "./actions/roomsActions";

const StyledApp = styled.div`
  width: 100vw;
  height: auto;
  height: 100vh;
  background-color: ${(props) => props.theme.background.primary};
`;

const Layout = () => {
  return (
    <StyledApp>
      <Outlet />
    </StyledApp>
  );
};

const ProtectedRoute = ({ children }) => {
  const player = useSelector((state) => state.playerReducer);

  if (player.userName)
    return (
      <>
        <NavBar user={player} />
        <Outlet />
      </>
    );
  return <Navigate to="/home" />;
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const rooms = useSelector((state) => state.roomsReducer.rooms);
  // const [url, setUrl] = useState({});
  useEffect(() => {
    dispatch(startConnecting());
  }, [dispatch]);

  // useEffect(() => {
  // if (state.playerReducer.roomName) navigate("/game");
  // if (state.connection.connected) {
  // if (!state.playerReducer.userName && !state.playerReducer.roomName)
  // if (location.hash && location.hash.includes("[")) {
  // let room;
  // let firstIndex = location.hash.indexOf("[");
  // room = location.hash.substring(1, firstIndex);
  // let username = location.hash.substring(
  // firstIndex + 1,
  // location.hash.indexOf("]", firstIndex)
  // );
  // if ((username, room)) {
  // dispatch(
  // addUser({
  // username,
  // avatar: "Agoumi.png",
  // })
  // );
  // const exist = rooms.find((r) => r.name === room);
  // console.log("valise", exist);
  // if (exist) {
  // dispatch(joinRoomRequest({ room }));
  // } else {
  // dispatch(addRoomRequest({ room, mode: "battle" }));
  // }
  // }
  // }
  // else navigate("game");
  // }
  // }, [state, dispatch, navigate]);
  return (
    <ThemeProvider theme={Theme}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route index path="home" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="rooms" element={<Rooms />} />
            <Route path="game" element={<Game />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
