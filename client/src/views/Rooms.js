import TextField from "@mui/material/TextField";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { StyledContainer, JoinRoom } from "./Rooms.Style";
import { useLocation } from "react-router";
const { Option } = Select;

const Rooms = () => {
  const [mode, setMode] = useState("solo");
  const { state } = useLocation();
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <StyledContainer>
      {/* <h1 className="title">Rooms</h1> */}
      <div className="create">
        <h2 className="title">create room</h2>
        <div className="container">
          <TextField
            className="create--input"
            id="standard-basic"
            label="room name"
            variant="outlined"
          />
          <Select
            className="create--select"
            defaultValue="mode"
            onChange={handleChange}
          >
            <Option value="solo">solo</Option>
            <Option value="multiplayer">multiplayer</Option>
          </Select>
          <input type="submit" value="create" />
        </div>
      </div>
      <JoinRoom>
        <h2 className="title">join room</h2>
        <div className="container">
          <header>
            <div className="item name">name</div>
            <div className="item mode">mode</div>
            <div className="item players">players</div>
            <div className="item status">status</div>
          </header>
          {/* <div className="room">
            <div className="item name">name</div>
            <div className="item mode">mode</div>
            <div className="item players">players</div>
            <div className="item status">status</div>
          </div> */}
        </div>
      </JoinRoom>
    </StyledContainer>
  );
};

export default Rooms;
