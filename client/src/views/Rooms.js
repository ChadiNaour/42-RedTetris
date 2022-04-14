import TextField from "@mui/material/TextField";
// import { Select } from "antd";
import { useEffect, useState } from "react";
import { StyledContainer, JoinRoom, StyledRoomCard } from "./Rooms.Style";
import { useSelector, useDispatch } from "react-redux";
import { updateRooms } from "../store/slices/roomsSlice";
import {
  addRoomName,
  addRoomRequest,
  joinRoomRequest,
} from "../store/slices/playerSlice";
import { getRoomsRequest } from "../actions/roomsActions";
import { ToastContainer, toast } from "react-toastify";
import StartButton from "../components/StartButton/StartButton";
import { AiOutlineUser } from "react-icons/ai";
import { updatePlayers } from "../store/slices/playersSlice";
import { Empty } from "antd";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import Select from 'react-select';
// import { BoxesLoader } from "react-awesome-loaders";

import { Badge } from "antd";

const RoomCard = ({ room, joinRoom }) => {
  return (
    <div style={{ margin: "20px" }}>
      <Badge.Ribbon text={room.mode} color="red">
        <StyledRoomCard onClick={() => joinRoom(room.name)}>
          <div className="name">
            {room.name} <AiOutlineUser style={{ width: "20px" }} />{" "}
            {room.playersIn}/{room.maxPlayers}
          </div>
          <div className="cover"></div>
          <div className="status">status</div>
        </StyledRoomCard>
      </Badge.Ribbon>
    </div>
  );
};

const { Option } = Select;

const Rooms = () => {
  const [mode, setMode] = useState("Mode");
  const [active, setActive] = useState(false);
  const [room, setRoom] = useState("");
  const [roomError, setRoomError] = useState("");
  const user = useSelector((state) => state.playerReducer);
  const rooms = useSelector((state) => state.roomsReducer.rooms);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  function handleModeChange(value) {
    //console.log(`selected ${value}`);
    setMode(value);
    setActive(!active);
  }

  const createRoom = () => {
    //console.log("room and mode are: ===>", mode, room);
    if (user.userName && room !== "" && mode !== "Mode") {
      dispatch(addRoomRequest({ room, mode }));
    }
    else {
      setRoomError("Please Enter room name and choose mode");
    }
  };

  const joinRoom = (data) => {
    const exist = rooms.find((room) => room.name === data);
    if (exist) {
      if (exist.mode === "solo")
        toast("You can't join a solo game");
      if (exist.playersIn >= 5)
        toast("This room is full")
      else
        dispatch(joinRoomRequest(data));
    }
  };

  useEffect(() => {
    dispatch(getRoomsRequest());
  }, [dispatch]);

  useEffect(() => {
    //console.log(user);
    if (user.roomError) {
      toast(user.roomError);
    } else if (user.roomName) {
      navigate("/game");
    }
  }, [user, navigate]);
  return (
    <StyledContainer>
      <ToastContainer />
      <div
        className="rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 xl:w-2/3 w-11/12 lg:w-3/4"
        style={{ backgroundColor: "#333333" }}
      >
        <div className="create">
          <div className="title">create room</div>
          <div className="w-full mt-4 flex flex-col sm:flex-row justify-center align-center h-aut md:h-12 md:w-4/12">
            <input
              className={
                "text-left rounded-md h-12 pl-4 my-2 xl:m-0 focus:outline-none"
              }
              type="text"
              placeholder="Room name"
              style={{ fontFamily: "Pixel", border: "1px solid #f9253c", color: "whitesmoke", backgroundColor: "#212121" }}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <div className="h-12 w-full my-2 mx-0 md:mx-6 xl:my-0">
              <button
                style={{ fontFamily: "Pixel", border: "1px solid #f9253c", color: "whitesmoke", backgroundColor: "#212121" }}
                type="button"
                className="flex h-full w-full text-left items-center justify-between rounded-md"
                onClick={() => setActive(!active)}
              >
                <span className="flex items-center px-4 ">
                  <span style={{ color: mode === "Mode" ? "#9BA3AF" : "whitesmoke" }} className="w-12">{mode}</span>
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
                className={active ? 'relative z-10 mt-1 w-full shadow-lg rounded-md overflow-hidden' : 'hidden'}
                style={{ fontFamily: "Pixel", backgroundColor: "#212121", border: "1px solid #f9253c" }}
              >
                <li className="lista text-white relative  py-2 pl-1 pr-2 border-b border-gray-600" onClick={() => handleModeChange("solo")} >
                  <span className="font-normal ml-3">solo</span>
                </li>
                <li className="lista text-white relative  py-2 pl-1 pr-2" onClick={() => handleModeChange("battle")}>
                  <span className="font-normal ml-3">battle</span>
                </li>
              </ul>
            </div>
            <div className="h-12 my-2 w-full  xl:m-0">

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
            {rooms.length === 0 ? (
              <div
                style={{
                  // backgroundColor: "green",
                  marginTop: "30px",
                  // width: "100%",
                  // display: "flex",
                  // flexDirection: "column",
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
            ) : (
              ""
            )}
            {rooms.length
              ? rooms.map((room, key) => (
                <RoomCard room={room} key={key} joinRoom={joinRoom} />
                // <div className="room hover:bg-gray-700" key={key}>
                //   <div className="item name">{room.name}</div>
                //   <div className="item mode">{room.mode}</div>
                //   <div className="item players">{room.playersIn}/{room.maxPlayers}</div>
                //   <div className="item status">status</div>
                // </div>
              ))
              : ""}
          </div>
        </JoinRoom>
      </div>
    </StyledContainer>
  );
};

export default Rooms;
