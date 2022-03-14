import styled from "styled-components";

const StyledMsgs = styled.div`
  width: 100%;
  height: 100%;
  /* padding: 1rem rem 0 1rem; */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  .input {
    width: 100%;
    height: 60px;
    background-color: white;
    display: flex;
  }
`;

const StyledMessage = styled.div`
  width: 100%;
  /* flex: 1; */
  /* padding: 1rem; */
  /* height: ; */
  display: flex;
  flex-direction: ${(props) => {
    if (props.type === 0) return "row-reverse";
    return "row";
  }};
  padding: 1rem;
  gap: 1rem;

  .content {
    min-height: 60px;
    /* padding: 1rem; */
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    .username {
      text-align: ${(props) => {
        if (props.type !== 0) return "start";
        return "end";
      }};
      font-size: 0.9rem;
      font-weight: lighter;
      color: white;
      line-height: 1.5;
      letter-spacing: 2px;

      /* padding: 1rem 0; */
    }
    .message {
      padding: 1rem;
      border-radius: 10px;
      background-color: white;
      /* margin-top: 20px; */
      font-size: ${(props) => props.theme.message.fontSize};
      font-family: ${(props) => props.theme.message.font};
      /* font-weight: ${(props) => props.theme.message.fontWeight}; */
      letter-spacing: ${(props) => props.theme.message.letterSpacing};
      color: ${(props) => props.theme.message.color};
      background: ${(props) => props.theme.message.background};
    }
  }
  .avatar {
    gap: 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .cercle {
      color: white;
      justify-content: center;
      align-items: center;
      display: flex;
      border: 2px solid ${(props) => props.theme.border.avatar};
      background-color: ${(props) => props.theme.background.primary};
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
  }
`;

const Message = ({ username, message, index }) => {
  console.log(username, message, index);
  return (
    <StyledMessage type={index % 2 === 0 ? 1 : 0}>
      <div className="avatar">
        <div className="cercle">TS</div>
      </div>
      <div className="content">
        <div className="username">{username}</div>
        <div className="message">{message}</div>
      </div>
    </StyledMessage>
  );
};

const Messages = () => {
  const messages = [
    { username: "rwayda", message: "fachkout ibno lbott" },
    { username: "pikala", message: "fachkout ibno lmaslou9" },
    { username: "telfaza", message: "fachkout ibno lmandour" },
  ];
  return (
    <StyledMsgs>
      {messages.map((message, index) => (
        <Message
          key={index}
          index={index}
          username={message.username}
          message={message.message}
        />
      ))}
    </StyledMsgs>
  );
};

export default Messages;
