import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledContainer, LeftSide, RightSide } from "./Home.Style";

const Home = () => {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  return (
    <StyledContainer>
      <RightSide>
        <div className="title">
          Red <span>Tetris</span>
        </div>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            navigate("/rooms", { state: { userName } });
          }}
        >
          <TextField
            className="input"
            id="outlined-basic"
            label="username"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input type="submit" />
        </form>
      </RightSide>
      <LeftSide />
    </StyledContainer>
  );
};

export default Home;
