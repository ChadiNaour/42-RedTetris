import './App.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import updateRooms from './reducers/roomsSlice'
import io from 'socket.io-client';
import styled from "styled-components";

const socket = io.connect("http://localhost:3001");

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
                }
                &__submit {
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
        // height: 600px;
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
        ul {
                list-style: none;
                width: 100%;
        }
        .item {
                padding: 0.5em;
                width: 100%;
                height: 50px;
        }
        .button {
                cursor: pointer;
                width: 100%;
                height: 100%;
                background-color: #e9dac1;
                background-color: #21d4fd;
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
        const [rooms, setRooms] = useState([]);
        // const rooms = useSelector((state) => state.roomsReducer.rooms);
        const dispatch = useDispatch();
        
        // console.log(rooms);

        const joinRoom = () => {
                if (username !== "" && room !== "") {
                        socket.emit("create_room", room)
                }
        }

        useEffect(() => {
                socket.on("update_rooms", (data) => {
                        // console.log(data);
                        setRooms(data);
                        // dispatch(updateRooms())
                });

        }, [socket])

        return (
                <div className="App">
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
                                        <button
                                                className="form__submit"
                                                onClick={joinRoom}
                                        >
                                                Create
                                        </button>
                                </div>
                        </StyledCreateRoom>
                        <StyledListRooms>
                                <h1 className="title">Rooms</h1>
                                <ul className="list">
                                        {rooms.map((room, key) => (
                                                <li className="item" key={key}>
                                                        <button
                                                                className="button"
                                                                // onClick={() => {
                                                                //         setRoom(room);
                                                                // }}
                                                        >
                                                                {room.name}
                                                        </button>
                                                </li>
                                        ))}
                                </ul>
                        </StyledListRooms>
                </div>
        );
}

export default App;
