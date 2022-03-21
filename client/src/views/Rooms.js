import TextField from "@mui/material/TextField";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { StyledContainer, JoinRoom , StyledRoomCard} from "./Rooms.Style";
import { useSelector, useDispatch } from 'react-redux';
import { updateRooms } from '../reducers/roomsSlice';
import { addRoomName } from '../reducers/playerSlice';
import { getRoomsRequest } from '../actions/roomsActions';
import { ToastContainer, toast } from 'react-toastify';
import StartButton from '../components/StartButton/StartButton';
import { AiOutlineUser } from "react-icons/ai";
// import { BoxesLoader } from "react-awesome-loaders";

import { Badge } from "antd";

const RoomCard = ({room}) => {
    return (
        <Badge.Ribbon text={room.mode} color="red">
            <StyledRoomCard>
                <div className="name">
                {room.name} <AiOutlineUser  /> {room.playersIn}/{room.maxPlayers}
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
    );
};

const { Option } = Select;



const Rooms = ({ socket }) => {
  const [mode, setMode] = useState("solo");
  const [room, setRoom] = useState("");
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
      socket.emit("create_room", { room, mode, username: user.userName })
      console.log(rooms);
    }
  }


  useEffect(() => {
    // console.log("the mode is", mode);
    // dispatch(getRoomsRequest());
    dispatch(getRoomsRequest());
    // socket.emit("get_rooms");
    socket.on("update_rooms", async (data) => {
      console.log(data.created);
      if (data.created)
      {
        console.log("add name", data.roomname);
        setRoom(data.roomname);
        try{

          dispatch(addRoomName(data.roomname));
        }catch{}

      }
      dispatch(updateRooms(data.rooms));
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
  // useEffect(() => {
  //   console.log(state);
  // }, [state]);
  return (
    <StyledContainer>
      <ToastContainer />
      {/* <h1 className="title">Rooms</h1> */}
      <div className="create">
        <h2 className="title">create room</h2>
        <div className="container">
          <TextField
            className="create--input"
            id="standard-basic"
            label="room name"
            variant="outlined"
            onChange={(e) => { setRoom(e.target.value) }}
          />
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
      </div>
      <JoinRoom>
        <h2 className="title">join room</h2>
        <div className="rooms-container">
        {rooms.map((room, key) => (
          <RoomCard room={room} key={key}/>
            // <div className="room hover:bg-gray-700" key={key}>
            //   <div className="item name">{room.name}</div>
            //   <div className="item mode">{room.mode}</div>
            //   <div className="item players">{room.playersIn}/{room.maxPlayers}</div>
            //   <div className="item status">status</div>
            // </div>
          ))}
        </div>
      </JoinRoom>
    </StyledContainer>
  );
};

export default Rooms;
