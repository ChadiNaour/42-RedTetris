import styled from "styled-components";
export const StyledRoomCard = styled.div`
    background-color: ${(props) => props.theme.background.secondary};
    width: 250px;
    height: auto;
    border-radius: 15px;
    overflow: hidden;
    position : relative;
    position: relative;
    .name {
        /* color: ${(props) => props.theme.headers.h1.color}; */
        display : flex;
        align-items : center;
        color: white;
        width: 100%;
        gap : 10px;
        justify-content : center;
        padding: 1.5rem;
        margin-top : 15px;
        font-size: 1rem;
        /* font-weight: bold; */
        text-align: center;
        border-bottom: 1px solid white;
    }
    .players {
        // width: 100%;
        // padding: 1rem;
        font-size: 0.8rem;
        text-align: center;
        border-bottom: 1px solid white;
        color: white;
    }
    .cover {
        width: 100%;
        height: 200px;
        background-color: ${(props) => props.theme.background.primary};
        background-image: url("https://images.unsplash.com/photo-1634295912158-9c847b6b3a40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGV0cmlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
        background-size: cover;
        background-position: center;
        background-image: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(0, 0, 0, 0.4) 100%
            ),
            url("https://images.unsplash.com/photo-1599933310642-8f07bdea325a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGV0cmlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60");
        /* background-image: url("https://images.unsplash.com/photo-1599933310642-8f07bdea325a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGV0cmlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"); */
        /* background-image: url("https://images.unsplash.com/photo-1596998791568-386ef5297c2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGV0cmlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"); */
    }
    .status {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 1rem;
        font-size: 0.8rem;
        text-align: center;
        color: white;
    }
`;
export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  align-items: center;
  .title {
    width: 50%;
    text-align: center;
    font-size: 6em;
    padding: ${(props) => props.theme.headers.h1.padding};
    font-family: ${(props) => props.theme.headers.h1.font};
    font-weight: ${(props) => props.theme.headers.h1.fontWeight};
    letter-spacing: ${(props) => props.theme.headers.h1.letterSpacing};
    color: ${(props) => props.theme.headers.h1.color};
    padding-bottom: 3rem;
  }
  .create {
    display: flex;
    width: 100%;
    flex-direction: column;
    .container {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 50px;
    }
    &--select {
      width: 15%;
      border: none;
      .ant-select-selector {
        height: 3rem;
        background-color: ${(props) => props.theme.background.secondary};
        color: white;
        border: 1px solid ${(props) => props.theme.border.avatar};
        .ant-select-selection-item {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
      .ant-select-arrow {
        color: ${(props) => props.theme.border.avatar};
      }
    }
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    .title {
      font-size: 4em;
      padding-bottom: 0.5rem;
    }
    input[type="submit"] {
      padding: 0.8rem 2rem;
      border: none;
      cursor: pointer;
      border-radius: 2px;
      background-color: white;
      font-size: 0.8rem;
      font-family: ${(props) => props.theme.message.font};
      letter-spacing: ${(props) => props.theme.message.letterSpacing};
      color: ${(props) => props.theme.message.color};
      background: ${(props) => props.theme.message.background};
      border: 1px solid ${(props) => props.theme.border.avatar};
      outline: none;
      &:focus {
        outline: none;
        border: none;
      }
    }
    &--input {
      .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
        color: white;
      }
      flex: 0 0 300px;
      label {
        color: white;
      }
      .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border-color: #b33030;
      }
    }
  }
`;

export const JoinRoom = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: auto;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 4em;
    padding-bottom: 0.5rem;
  }
  .container {
    width: 100%;
    flex: 1;
    // background-color: ${(props) => props.theme.background.secondary};
    .rooms-container {
      display: flex;
      align-items: center;
      align-content: center;
    }
    header,
    .room {
      width: 100%;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      align-content: center;
      border-bottom: 1px solid white;
      .item {
        font-size: 1rem;
        padding: 0.5rem;
        color: white;
        text-align: center;
        flex: 1;
      }
      .name {
        flex: 3;
      }
    }
    .room {
      border-bottom: 1px solid #b33030;
    }
  }
`;
