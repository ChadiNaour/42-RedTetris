import React from "react";
import { StyledStartButton } from "./StyledStartButton";

const StartButoon = ({createRoom}) => (
    <StyledStartButton onClick={createRoom}>
        <div style={{marginTop: "-3px"}}>
        Create
        </div>
    </StyledStartButton>
);

export default StartButoon;