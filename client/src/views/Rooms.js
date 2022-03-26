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
          {/* <div className="players">
                    <AiOutlineUser style={{ marginRight: "30px" }} /> 1 / 4
                </div> */}
          <div className="cover"></div>
          {/* <BoxesLoader
                boxColor={"#6366F1"}
                style={{ marginBottom: "20px" }}
                desktopSize={"128px"}
                mobileSize={"80px"}
            /> */}
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
  // const avatar = useSelector((state) => state.playerReducer.avatar);
  // const rooms = useSelector((state) => state.roomsReducer.rooms);
  const user = useSelector((state) => state.playerReducer);
  const rooms = useSelector((state) => state.roomsReducer.rooms);
  const dispatch = useDispatch();
  // const { state } = useLocation();
  function handleChange(value) {
    console.log(`selected ${value}`);
    setMode(value);
  }

  const createRoom = () => {
    if (user.userName && room !== "") {
      // console.log(mode, room, user.userName);
      // socket.emit("create_room", {
      //   room,
      //   mode,
      // username: user.userName,
      // avatar: avatar,
      // });
      dispatch(addRoomRequest({ room, mode }));
      console.log(rooms);
    }
  };

  const joinRoom = (data) => {
    console.log("the joined room", data);
    console.log(rooms);
    const exist = rooms.find((room) => room.name === data);
    console.log(exist);
    if (exist) {
      dispatch(joinRoomRequest(data));
      // socket.emit("join_room", { room: data, username: user.userName });
    }
  };

  useEffect(() => {
    dispatch(getRoomsRequest());
    console.log(user);
    if (user.roomError) {
      console.log("jkdbgdjgbshjdbgfhjsbgdhjsbgdhsbgdsjgbdhjsgdjksngsgjbdsgkn");
      toast(user.roomError);
    }
    // socket.on("room_joined", (data) => {
    //   setRoom(data);
    //   try {
    //     dispatch(addRoomName(data));
    //   } catch {}
    //   socket.emit("getPlayers", data);
    // });
    // socket.on("room_created", (data) => {
    //   setRoom(data);
    //   try {
    //     dispatch(addRoomName(data));
    //   } catch {}
    //   socket.emit("getPlayers", data);
    // });
    // socket.on("update_rooms", async (data) => {
    //   dispatch(updateRooms(data.rooms));
    // });
    // socket.on("room_exists", () => {
    //   console.log("room_already_exist");
    //   toast("Room already exist");
    // });
    // return () => {
    //   socket.off("update_rooms");
    //   socket.off("room_exists");
    // };
  }, [user]);
  // useEffect(() => {
  //   console.log(state);
  // }, [state]);
  return (
    <StyledContainer>
      <ToastContainer />
      {/* <h1 className="title">Rooms</h1> */}
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
            {/* <TextField
              className="create--input"
              id="standard-basic"
              label="room name"
              variant="outlined"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            /> */}
            <Select
              className="create--select"
              defaultValue="mode"
              onChange={handleChange}
            >
              <Option value="solo">solo</Option>
              <Option value="battle">battle</Option>
            </Select>
            {/* <div> */}
            <StartButton createRoom={createRoom} />
            {/* <input type="submit" value="create" onClick={createRoom} /> */}
          </div>
          {/* <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" style={{ width: '60%', height: '' }}></div> */}
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
                {/* <div style={{backgroundColor: ''}}> */}

                <Loader />
                {/* </div> */}
                {/* <Empty description="" image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{ width: "100%", backgroundColor: "",height: "100%" }} /> */}
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
