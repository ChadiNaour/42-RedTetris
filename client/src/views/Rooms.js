import TextField from "@mui/material/TextField";
import { Select } from "antd";
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
  const [mode, setMode] = useState("solo");
  const [room, setRoom] = useState("");
  const user = useSelector((state) => state.playerReducer);
  const rooms = useSelector((state) => state.roomsReducer.rooms);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleChange(value) {
    console.log(`selected ${value}`);
    setMode(value);
  }

  const createRoom = () => {
    if (user.userName && room !== "") {
      dispatch(addRoomRequest({ room, mode }));
    }
  };

  const joinRoom = (data) => {
    const exist = rooms.find((room) => room.name === data);
    if (exist) {
      dispatch(joinRoomRequest(data));
    }
  };

  useEffect(() => {
    dispatch(getRoomsRequest());
    console.log(user);
    if (user.roomError) {
      toast(user.roomError);
    } else if (user.roomName) {
      navigate("/game");
    }
  }, [user]);
  return (
    <StyledContainer>
      <ToastContainer />
      <div
        className="rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700"
        style={{ width: "60%", backgroundColor: "#333333" }}
      >
        <div className="create">
          <div className="title">create room</div>
          <div className="container">
            <input
              className={
                "create--input animate-fade appearance-none block bg-transparent text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-900 focus:border-gray-500"
              }
              type="text"
              placeholder="Room name"
              style={{ fontFamily: "Pixel" }}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <Select
              className="create--select"
              defaultValue="mode"
              onChange={handleChange}
            >
              <Option value="solo">solo</Option>
              <Option value="battle">battle</Option>
            </Select>
            <StartButton createRoom={createRoom} />
          </div>
        </div>
      </div>
      <div
        className="rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 mt-8"
        style={{ width: "60%", backgroundColor: "#333333" }}
      >
        <JoinRoom>
          <h2 className="title">join room</h2>
          <div className="rooms-container">
            {rooms.length === 0 ? (
              <div
                style={{
                  marginTop: "30px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loader />
                <div style={{ backgroundColor: "", marginTop: "160px" }}>
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
