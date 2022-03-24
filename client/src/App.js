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
import { Outlet, Route, Routes, Navigate } from "react-router";

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

  if (player.userName && !player.roomName)
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
  useEffect(() => {
    dispatch(startConnecting());
  }, [dispatch]);

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
