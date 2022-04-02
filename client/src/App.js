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
import { addRoomRequest } from "./store/slices/playerSlice";

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
  const [url, setUrl] = useState({});
  useEffect(() => {
    dispatch(startConnecting());
    if (location.hash && location.hash.includes("[")) {
      let room;
      let firstIndex = location.hash.indexOf("[");
      room = location.hash.substring(1, firstIndex);
      let username = location.hash.substring(
        firstIndex + 1,
        location.hash.indexOf("]", firstIndex)
      );
      if ((username, room)) {
        setUrl({ room, username });
        console.log(room, username);
      }
      // if (player && room) {
      // }
      // console.log(location.hash);
    }
  }, [dispatch, location]);

  useEffect(() => {
    if (state.playerReducer.roomNamae) navigate("/game");
    // if (state.connection.connected && url.room && url.username)
    // dispatch(addRoomRequest({ ...url }));
  }, [state, url, dispatch]);
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
