import styled from "styled-components";
import Tetris from "../../../src/images/redTetris2.png";

export const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-size: cover;
    background-image: url(${Tetris});
    background-size: cover;
    background-position: center;
`;

export const LeftSide = styled.div`
    width: 60%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    @media (max-width: 1400px) {
        display: none;
    }
`;

export const StyledAvatar = styled.div`
    cursor: pointer;
    width: 200px;
    height: 200px;
    svg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
    }
    padding-bottom: 2rem;
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
        // background-color: blue;
        width: 100%;
        text-align: center;
        font-size: 4em;
        font-family: Pixel, Arial, Helvetica, sans-serif;
        font-weight: ${(props) => props.theme?.headers?.h1?.fontWeight};
        letter-spacing: ${(props) => props.theme?.headers?.h1?.letterSpacing};
        color: #f9253c;
        padding-bottom: 2rem;
        span {
            padding: 1%;
            @media (max-width: 400px) {
                padding: 0px;
            }
        }
        @media (max-width: 630px) {
            font-size: 3rem;
            width: 100%;
        }
        @media (max-width: 350px) {
            font-size: 2.5rem;
            width: 100%;
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
            width: 10%;
            padding: 1rem;
            border-radius: 10px;
            font-size: ${(props) => props.theme?.message?.fontSize};
            font-family: ${(props) => props.theme?.message?.font};
            letter-spacing: ${(props) => props.theme?.message?.letterSpacing};
            color: ${(props) => props.theme?.message?.color};
            background: ${(props) => props.theme?.message?.background};
            border: none;
            outline: none;
            &:focus {
                outline: none;
                border: none;
            }
        }
        .input {
            &::placeholder {
                line-height: 50px;
            }
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
                color: white;
            }
            .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root {
                color: white;
            }
            @media (max-width: 900px) {
                width: 430px;
            }
            @media (max-width: 450px) {
                width: 90%;
            }
        }
    }
    @media (max-width: 1400px) {
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
