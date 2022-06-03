import styled from "styled-components";

export const StyledStartButton = styled.button`
    padding: 20px;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    color: #fff;
    background: #f9253c;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 0.9rem;
    outline: none;
    cursor: pointer;
    border-bottom: 6px solid rgba(183, 51, 62, 0.4);
    -webkit-box-shadow: inset 0 -6px rgba(183, 51, 62, 0.4);
    box-shadow: inset 0 -6px rgba(183, 51, 62, 0.4);
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.02);
    }
`;

export const StyledStartButton1 = styled.button`
    padding: 20px;
    width: 500px;
    height: 60px;
    border-radius: 7px;
    color: #fff;
    background: #f9253c;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    border-bottom: 6px solid rgba(183, 51, 62, 0.4);
    -webkit-box-shadow: inset 0 -6px rgba(183, 51, 62, 0.4);
    box-shadow: inset 0 -6px rgba(183, 51, 62, 0.4);
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.02);
    }
    @media (max-width: 900px) {
        width: 430px;
    }
    @media (max-width: 450px) {
        width: 90%;
    }
`;
