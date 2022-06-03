import { useEffect, useState } from "react";
import { StyledContainer, JoinRoom, StyledRoomCard } from "./Rooms.style";
import { useSelector, useDispatch } from "react-redux";
import {
    addRoomRequest,
    joinRoomRequest,
} from "../../store/slices/playerSlice";
import { getRoomsRequest } from "../../store/slices/roomsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StartButton from "../../components/StartButton/StartButton";
import { AiOutlineUser } from "react-icons/ai";
import Loader from "../../components/Loader";

import { Badge } from "antd";

export const RoomCard = ({ room, joinRoom }) => {
    return (
        <div style={{ margin: "20px" }}>
            <Badge.Ribbon text={room.mode} color="red">
                <StyledRoomCard
                    role="click"
                    onClick={() => joinRoom(room.name)}
                >
                    <div className="name">
                        <p role="name">{room.name} </p>
                        <AiOutlineUser
                            role="svg"
                            style={{ width: "20px" }}
                        />{" "}
                        <p role="playersIn">{room.playersIn}</p>/
                        <p role="maxPlayers">{room.maxPlayers}</p>
                    </div>
                    <div className="cover"></div>
                </StyledRoomCard>
            </Badge.Ribbon>
        </div>
    );
};

const Rooms = () => {
    const [mode, setMode] = useState("Mode");
    const [active, setActive] = useState(false);
    const [room, setRoom] = useState("");
    const [roomError, setRoomError] = useState("");
    const { player } = useSelector((state) => state);
    const { rooms } = useSelector((state) => state.rooms);
    const error = useSelector((state) => state.player.roomError);
    const dispatch = useDispatch();

    function handleModeChange(value) {
        setMode(value);
        setActive(!active);
    }

    const createRoom = () => {
        if (player.userName && room !== "" && mode !== "Mode") {
            dispatch(addRoomRequest({ room, mode }));
        } else {
            setRoomError("Please Enter room name and choose mode");
        }
    };

    const joinRoom = (data) => {
        const exist = rooms.find((room) => room.name === data);
        if (exist) {
            if (exist.mode === "solo")
                toast("You can't join a solo game", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            if (exist.playersIn >= 5)
                toast("This room is full", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            if (exist.state && exist.mode === "battle")
                toast("The game has already started", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            else dispatch(joinRoomRequest(data));
        }
    };

    useEffect(() => {
        dispatch(getRoomsRequest());
    }, []);

    useEffect(() => {
        if (error) {
            toast(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [error]);
    return (
        <StyledContainer>
            <ToastContainer />
            <div
                className="rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 xl:w-2/3 w-11/12 lg:w-3/4"
                style={{ backgroundColor: "#333333" }}
            >
                <div className="create">
                    <div className="title">create room</div>
                    <div className="w-full mt-4 flex flex-col sm:flex-row justify-center align-center md:h-12 md:w-4/12">
                        <input
                            className={"input h-12 md:h-auto rounded px-4 focus:outline-none"}
                            type="text"
                            placeholder="Room name"
                            style={{
                                fontFamily: "Pixel",
                                border: "1px solid #f9253c",
                                color: "whitesmoke",
                                backgroundColor: "#212121",
                            }}
                            onChange={(e) => {
                                setRoom(e.target.value);
                            }}
                        />
                        <div className="h-12 my-2 md:my-0 mx-auto w-full mx-0 md:mx-6 xl:my-0">
                            <button
                                style={{
                                    fontFamily: "Pixel",
                                    border: "1px solid #f9253c",
                                    color: "whitesmoke",
                                    backgroundColor: "#212121",
                                }}
                                type="button"
                                className="flex h-full w-full text-left items-center justify-between rounded-md"
                                onClick={() => setActive(!active)}
                            >
                                <span className="flex items-center px-4 ">
                                    <span
                                        style={{
                                            color:
                                                mode === "Mode"
                                                    ? "#9BA3AF"
                                                    : "whitesmoke",
                                        }}
                                        className="w-12"
                                    >
                                        {mode}
                                    </span>
                                </span>
                                <svg
                                    className="h-6 w-6 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ color: "#f9253c" }}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <ul
                                className={
                                    active
                                        ? "relative z-10 mt-1 w-full shadow-lg rounded-md overflow-hidden"
                                        : "hidden"
                                }
                                style={{
                                    fontFamily: "Pixel",
                                    backgroundColor: "#212121",
                                    border: "1px solid #f9253c",
                                }}
                            >
                                <li
                                    className="lista text-white relative  py-2 pl-1 pr-2 border-b border-gray-600"
                                    onClick={() => handleModeChange("solo")}
                                >
                                    <span className="font-normal ml-3">
                                        solo
                                    </span>
                                </li>
                                <li
                                    className="lista text-white relative  py-2 pl-1 pr-2"
                                    onClick={() => handleModeChange("battle")}
                                >
                                    <span className="font-normal ml-3">
                                        battle
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="h-12 w-full  xl:m-0">
                            <StartButton mode={mode} createRoom={createRoom} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center align-center pb-4">
                    <span
                        style={{
                            fontSize: "20px",
                            color: "#f9253c",
                            fontFamily: "'Saira', sans-serif",
                        }}
                    >
                        {roomError}
                    </span>
                </div>
            </div>
            {/* join room */}
            <div
                className="rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 mt-8 xl:w-2/3 w-11/12 lg:w-3/4"
                style={{ backgroundColor: "#333333" }}
            >
                <JoinRoom>
                    <h2 className="title">join room</h2>
                    <div className="rooms-container">
                        {rooms?.length === 0 && (
                            <div
                                style={{
                                    marginTop: "30px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Loader />
                                <div style={{ marginTop: "180px" }}>
                                    <span
                                        style={{
                                            fontSize: "25px",
                                            color: "whitesmoke",
                                            fontFamily: "'Saira', sans-serif",
                                        }}
                                    >
                                        No rooms found
                                    </span>
                                </div>
                            </div>
                        )}
                        {rooms?.length
                            ? rooms.map((room, key) => (
                                  <RoomCard
                                      room={room}
                                      key={key}
                                      joinRoom={joinRoom}
                                  />
                              ))
                            : ""}
                    </div>
                </JoinRoom>
            </div>
        </StyledContainer>
    );
};

export default Rooms;
