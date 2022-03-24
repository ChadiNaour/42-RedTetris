import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import {
  StyledContainer,
  LeftSide,
  RightSide,
  StyledAvatar,
} from "./Home.Style";
import { addUser, setUserAvatar } from "../store/slices/playerSlice";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { StyledStartButton1 } from "../components/StartButton/StyledStartButton";
import { getAvatar } from "../utils/Helpers";
import parse from "html-react-parser";
import { Popover, Button } from "antd";
import { useNavigate } from "react-router";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");

  const state = useSelector((state) => state);

  const addUsername = () => {
    userName.trim();
    const regex = /^[a-zA-Z0-9]{4,16}$/;
    if (regex.test(userName)) {
      dispatch(addUser({ username: userName, avatar: avatar }));
    } else {
      setErrorUsername(
        "username must be only alphanumerique between 4 and 16 characters"
      );
    }
  };

  useEffect(() => {
    console.log(state);
    if (state.playerReducer.userName) navigate("/rooms");
  }, [state]);

  useEffect(() => {
    getAvatar()
      .then((avatar) => {
        setAvatar(avatar);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return (
    <StyledContainer>
      <ToastContainer />
      <RightSide>
        <div className="title">
          Red <span>Tetris</span>
        </div>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            addUsername();
          }}
        >
          <Popover
            placement="left"
            content={"Click here to change your avatar"}
          >
            <StyledAvatar
              onClick={() => {
                getAvatar()
                  .then((avatar) => {
                    setAvatar(avatar);
                  })
                  .catch((err) => {
                    console.log(err.response.data);
                  });
              }}
            >
              {avatar ? parse(avatar) : ""}
            </StyledAvatar>
          </Popover>
          <TextField
            className="input"
            id="outlined-basic"
            label="username"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <StyledStartButton1>play</StyledStartButton1>
          <span style={{ color: "red" }}>{errorUsername}</span>
        </form>
      </RightSide>
      <LeftSide />
    </StyledContainer>
  );
};

export default Home;
