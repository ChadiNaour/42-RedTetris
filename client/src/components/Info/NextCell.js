import React from "react";
import { NEXT_TETROMINOS } from "../../utils/tetrominos";
import styled from "styled-components";

const StyledNextCell = styled.div`
    width: auto;
    background: rgba(
        ${(props) => (props.type === 0 ? (0, 0, 0, 0.8) : props.color)}
    );
    border: ${(props) => (props.type === 0 ? `unset` : "4px solid")};
    border-right-color: rgba(${(props) => props.color});
    border-top-color: rgba(${(props) => props.color});
`;

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type }) => (
    <StyledNextCell
        type={type}
        color={NEXT_TETROMINOS[type]?.color}
    ></StyledNextCell>
);

export default React.memo(Cell);
