import styled from "styled-components";
import UserCard from "../UserCard";
import Messages from "./Message";
import { AiOutlineSend } from "react-icons/ai";

const StyledChat = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.background.secondary};

  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  h1 {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.headers.h1.fontSize};
    padding: ${(props) => props.theme.headers.h1.padding};
    font-family: ${(props) => props.theme.headers.h1.font};
    font-weight: ${(props) => props.theme.headers.h1.fontWeight};
    letter-spacing: ${(props) => props.theme.headers.h1.letterSpacing};
    color: ${(props) => props.theme.headers.h1.color};
  }
  .users {
    padding: 1rem;
    display: flex;
    .user {
      flex: 1;
    }
  }
  .chat-box {
    flex: 1;
    background-color: black;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem 0 0 0;
    .input {
      width: 100%;
      height: 60px;
      background-color: white;
      display: flex;
      align-items: center;
      .icone {
        color: #b33030;
        height: 30px;
        width: 60px;
      }
      input {
        flex: 1;
        height: 100%;
        padding: 1rem;
        outline: none;
        border: none;
        color: #b33030;
        font-size: 1rem;
        &::placeholder {
          color: #b33030;
          font-size: 0.8rem;
          outline: none;
          border: none;
        }
      }
    }
  }
`;

const Chat = () => {
  return (
    <StyledChat>
      <h1>chat</h1>
      <div className="users">
        <div className="user">
          <UserCard />
        </div>
        <div className="user">
          <UserCard />
        </div>
        <div className="user">
          <UserCard />
        </div>
        <div className="user">
          <UserCard />
        </div>
      </div>
      <div className="chat-box">
        <Messages />
        <div className="input">
          <input type="text" placeholder="write your message" />
          <AiOutlineSend className="icone" />
        </div>
      </div>
    </StyledChat>
  );
};

export default Chat;
