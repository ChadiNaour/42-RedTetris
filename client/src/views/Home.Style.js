import styled from "styled-components";
export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1555864400-cc47dd93d427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGV0cmlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const RightSide = styled.div`
  display: inline-block;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    width: 50%;
    text-align: center;
    font-size: 6em;
    padding: ${(props) => props.theme.headers.h1.padding};
    font-family: ${(props) => props.theme.headers.h1.font};
    font-weight: ${(props) => props.theme.headers.h1.fontWeight};
    letter-spacing: ${(props) => props.theme.headers.h1.letterSpacing};
    color: ${(props) => props.theme.headers.h1.color};
    padding-bottom: 5rem;
    span {
      color: white;
    }
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    input[type="submit"] {
      height: 3rem;
      border: none;
      cursor: pointer;
      width: 50%;
      padding: 1rem;
      border-radius: 10px;
      background-color: white;
      font-size: ${(props) => props.theme.message.fontSize};
      font-family: ${(props) => props.theme.message.font};
      letter-spacing: ${(props) => props.theme.message.letterSpacing};
      color: ${(props) => props.theme.message.color};
      background: ${(props) => props.theme.message.background};
      border: none;
      outline: none;
      &:focus {
        outline: none;
        border: none;
      }
    }
    .input {
      width: 50%;
      label {
        font-size: 1rem;
        color: white;
      }
      .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border-color: #b33030;
      }
    }
  }
  @media (max-width: 768px) {
    width: 100% !important;
    .title {
      width: 100% !important;
    }
    .form {
      input[type="submit"],
      label {
        width: 80% !important;
      }
    }
  }
`;
