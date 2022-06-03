import React from "react";
import { StyledStartButton } from "./StartButton.style";

const StartButoon = ({ createRoom }) => (
    <StyledStartButton onClick={createRoom}>
        <div style={{ marginTop: "-4px" }}></div>
        Create
    </StyledStartButton>
);

export default StartButoon;
