import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { StyledContainer, LeftSide, RightSide, StyledAvatar  } from "./Home.Style";
import { addUser, clearUser } from '../reducers/playerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {StyledStartButton1} from "../components/StartButton/StyledStartButton";
import {getAvatar} from '../utils/Helpers';
import parse from "html-react-parser";
import { Popover, Button } from 'antd';

const Home = ({ socket, avatar , setAvatar}) => {
  // let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const dispatch = useDispatch();
  // const [avatar, setAvatar] = useState("");
  // const []

  const addUsername = () => {
    userName.trim();
    const regex = /^[a-zA-Z0-9]{4,16}$/;
    if (regex.test(userName)) {
      socket.emit("new_user", { username: userName })
      // dispatch(addUser(userName));
    }
    else {
      setErrorUsername("username must be only alphanumerique between 4 and 16 characters");
    }
  }

  useEffect(() => {
    socket.on("user_exists", (data) => {
      console.log("user_already_exist", userName);
      if (data.error)
      toast("user already exist")
      else
      dispatch(addUser(data.username));
    });
    return () => {
      socket.off("user_exists");
    };
  }, [])
  useEffect(() => {
    // console.log(avatar)
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
            <Popover  placement="left"  content={"Click here to change your avatar"}>
             <StyledAvatar   onClick={() => {
                                getAvatar()
                                    .then((avatar) => {
                                        setAvatar(avatar);
                                    })
                                    .catch((err) => {
                                        console.log(err.response.data);
                                    });
                            }}>
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
          {/* <input type="submit" /> */}
          {/* <StartButton /> */}
          <StyledStartButton1 >
        {/* <div style={{marginTop:"-8px"}}></div> */}
    play
    </StyledStartButton1 >
          <span style={{ color: "red" }}>{errorUsername}</span>
        </form>
      </RightSide>
      <LeftSide />
    </StyledContainer>
  );
};

export default Home;
