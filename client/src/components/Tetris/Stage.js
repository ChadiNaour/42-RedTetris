import { StyledStage, RowStyle, Col } from "./Stage.style";
import { TETROMINOS } from "../../utils/tetrominos";
import React from "react";

export const Row = ({ row, rowIdx, stage }) => {
    return (
        <RowStyle>
            {row.map((col, colIdx) => {
                return <Cell key={colIdx} colIdx={colIdx} col={col} />;
            })}
        </RowStyle>
    );
};

export const Cell = React.memo(({ colIdx, col }) => {
    return <Col key={colIdx} type={col[0]} color={TETROMINOS[col[0]].color} />;
});

export const Stage = ({ stage }) => {
    return (
        <StyledStage>
            {stage.map((row, key) => (
                <Row key={key} stage={stage} row={row} />
            ))}
        </StyledStage>
    );
};

export default Stage;
