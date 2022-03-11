import './App.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateRooms } from './reducers/roomsSlice'
import { getRoomsRequest } from './actions/roomsActions';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';

const socket = io.connect("http://localhost:3001");

toast.configure()

const StyledCreateRoom = styled.div`
        width: 100vw;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title {
                letter-spacing: 2px;
                font-size: 3rem;
                padding: 2rem;
                color: #5e454b;
        }
        .form {
                /* width: 100%; */
                /* background-color: white; */
                /* display: flex; */
                /* padding: 2rem; */
                height: auto;
                display: flex;
                align-items: center;
                &__input {
                        // width: 400px;
                        border: 1px solid gray;
                        border-radius: 10px;
                        outline: none;
                        padding: 0.5rem 0.5rem;
                        height: 30px;
                        margin: 0.5rem 1rem;
                        font-size: 1rem;
                        color: gray;
                }
                &__submit {
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 150px;
                        height: 30px;
                        padding: 1.5rem 1rem;
                        border: 1px solid white;
                        border-radius: 10px;
                        background-color: #f4d03f;
                        background-color: #e9dac1;
                        background-color: #21d4fd;
                        background-image: linear-gradient(
                                19deg,
                                #21d4fd 0%,
                                #b721ff 100%
                        );
                        color: white;
                }
        }`;

const StyledListRooms = styled.div`
        height: 600px;
        width: 600px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 20px;
        margin-top: 30px;
        overflow: hidden;
        .title {
                width: 100%;
                text-align: center;
                padding: 0.5em;
                color: #5e454b;
                background-color: rgba(255, 255, 255, 0.5);
        }
        .list {
                // padding: 10px;
                width: 100%;
                // background-color: red;
        }
        .item {
                margin: 10px;
                // width: 100%;
                height: 50px;
        }
        .button {
                cursor: pointer;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(
                        19deg,
                        #21d4fd 0%,
                        #b721ff 100%
                );

                color: white;
                border: 1px solid white;
        }
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
                        socket.emit("create_room", {room, mode, username})
                }
        }

        useEffect(() => {
                // console.log("the mode is", mode);
                // dispatch(getRoomsRequest());
                setInterval(() => {dispatch(getRoomsRequest())}, 3000);
                // socket.emit("get_rooms");
                socket.on("update_rooms", (data) => {
                        // console.log("the data is ana");
                        dispatch(updateRooms(data));                     
                });
                socket.on("room_exists", () => {
                        console.log("room_already_exist");
                        toast("Room already exist")
                });


        }, [])

        return (
                <div className="App">
                        {/* <ToastContainer /> */}
                        <StyledCreateRoom>
                                <h1 className="title">Create Room</h1>
                                <div className="form">
                                        <input
                                                className="form__input"
                                                type="text"
                                                placeholder="Username"
                                                // value={username}
                                                onChange={(e) => { setUsername(e.target.value); }}
                                        />
                                        <input
                                                className="form__input"
                                                type="text"
                                                placeholder="Room Name"
                                                // value={room}
                                                onChange={(e) => { setRoom(e.target.value); }}
                                        />
                                        <div>
                                                <select value={mode} onChange={(e) => {console.log(e.target.value);setMode(e.target.value); }} className="form__input" style={{ height: "45px" }}>
                                                        <option value={mode}>{mode}</option>
                                                        <option value={mode === "solo" ? "battle" : "solo"}>{mode === "solo" ? "battle" : "solo"}</option>
                                                </select>
                                        </div>
                                        <button
                                                className="form__submit"
                                                onClick={createRoom}
                                        >
                                                Create
                                        </button>
                                </div>
                        </StyledCreateRoom>
                        <StyledListRooms>
                                <h1 className="title">Rooms</h1>
                                {/* <ul className="list" style={{ backgroundColor: "red" }}> */}
                                <div className="list">
                                        {rooms.map((room, key) => (
                                                <div className="item" key={key}>
                                                        <button
                                                                className="button"
                                                        >
                                                                {room.name} {room.mode} {room.playersIn}/{room.maxPlayers}
                                                        </button>
                                                </div>
                                        ))}
                                </div>
                                {/* </ul> */}
                        </StyledListRooms>
                </div>
        );
}

export default App;
