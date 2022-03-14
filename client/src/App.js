import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateRooms } from './reducers/roomsSlice'
import { getRoomsRequest } from './actions/roomsActions';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';
import styled, { ThemeProvider } from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import Rooms from "./views/Rooms";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { Theme } from "./utils/theme";
// import Game from "./views/Game";
import Home from "./views/Home";

const socket = io.connect("http://localhost:3001");

toast.configure()

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
        const [username, setUsername] = useState("");
        const [room, setRoom] = useState("");
        const [mode, setMode] = useState("solo");
        // const [rooms, setRooms] = useState([]);

        const rooms = useSelector((state) => state.roomsReducer.rooms);
        const dispatch = useDispatch();

        // console.log(rooms);

        const createRoom = () => {
                if (username !== "" && room !== "") {
                        socket.emit("create_room", { room, mode, username })
                }
        }

        useEffect(() => {
                // console.log("the mode is", mode);
                // dispatch(getRoomsRequest());
                dispatch(getRoomsRequest());
                // socket.emit("get_rooms");
                socket.on("update_rooms", (data) => {
                        // console.log("the data is ana");
                        dispatch(updateRooms(data));
                });
                socket.on("room_exists", () => {
                        console.log("room_already_exist");
                        toast("Room already exist")
                });
                return () => {
                        socket.off("update_rooms");
                        socket.off("room_exists");
                };


        }, [])

        return (
                <BrowserRouter>
                        <ThemeProvider theme={Theme}>
                                <StyledApp className="App">
                                        {/* <NavBar /> */}
                                        <Routes>
                                                {/* <Route path="/" element={<Home />} /> */}
                                                {/* <Route path="/game" element={<Game />} /> */}
                                                <Route path="/rooms" element={<Rooms />} />
                                        </Routes>
                                </StyledApp>
                        </ThemeProvider>
                </BrowserRouter>
                // <div className="App">
                //         {/* <ToastContainer /> */}
                //         <StyledCreateRoom>
                //                 <h1 className="title">Create Room</h1>
                //                 <div className="form">
                //                         <input
                //                                 className="form__input"
                //                                 type="text"
                //                                 placeholder="Username"
                //                                 // value={username}
                //                                 onChange={(e) => { setUsername(e.target.value); }}
                //                         />
                //                         <input
                //                                 className="form__input"
                //                                 type="text"
                //                                 placeholder="Room Name"
                //                                 // value={room}
                //                                 onChange={(e) => { setRoom(e.target.value); }}
                //                         />
                //                         <div>
                //                                 <select value={mode} onChange={(e) => {console.log(e.target.value);setMode(e.target.value); }} className="form__input" style={{ height: "45px" }}>
                //                                         <option value={mode}>{mode}</option>
                //                                         <option value={mode === "solo" ? "battle" : "solo"}>{mode === "solo" ? "battle" : "solo"}</option>
                //                                 </select>
                //                         </div>
                //                         <button
                //                                 className="form__submit"
                //                                 onClick={createRoom}
                //                         >
                //                                 Create
                //                         </button>
                //                 </div>
                //         </StyledCreateRoom>
                //         <StyledListRooms>
                //                 <h1 className="title">Rooms</h1>
                //                 {/* <ul className="list" style={{ backgroundColor: "red" }}> */}
                //                 <div className="list">
                //                         {rooms.map((room, key) => (
                //                                 <div className="item" key={key}>
                //                                         <button
                //                                                 className="button"
                //                                         >
                //                                                 {room.name} {room.mode} {room.playersIn}/{room.maxPlayers}
                //                                         </button>
                //                                 </div>
                //                         ))}
                //                 </div>
                //                 {/* </ul> */}
                //         </StyledListRooms>
                // </div>
        );
}

export default App;
