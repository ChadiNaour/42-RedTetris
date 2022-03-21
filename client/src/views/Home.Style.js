import styled from "styled-components";
import Tetris from '../../src/images/redTetris2.png';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  // object-fit: contain;
  background-size: cover;
  // background-repeat: no-repeat;
  // background-image:
  // linear-gradient(to right, #212121, rgba(117, 19, 93, 0.73)),url(${Tetris});
  background-image: url(${Tetris});
  background-size: cover;
  background-position: center;
`;

export const LeftSide = styled.div`
  width: 60%;
  height: 100%;
  
  // background-image: url(${Tetris});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledAvatar = styled.div`
    cursor: pointer;
    width: 200px;
    height: 200px;
    // background-color: ${(props) => props.theme.background.primary};
    svg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        // background-color: ${(props) => props.theme.background.primary};
        background-size: cover;
        background-position: center;
    };
    padding-bottom: 2rem;
`;

export const RightSide = styled.div`
  display: inline-block;
  width: 40%;
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
    padding-bottom: 2rem;
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
      width: 500px;
      color: white;
      label {
        color: white;
        font-size: 1rem;
      }
      .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border-color: #b33030;
      }
      .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        color : white;
      }
      .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root {
        color : white;
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
