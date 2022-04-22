import { StyledStage, RowStyle, Col } from "./Stage.Style";
import {TETROMINOS} from '../../utils/tetrominos';
import React from 'react';

const Row = ({ row, rowIdx, stage }) => {
  return (
    <RowStyle>
      {row.map((col, colIdx) => {
        return <Cell key={colIdx} colIdx={colIdx} col={col} />;
      })}
    </RowStyle>
  );
};

const Cell = React.memo(({ colIdx, col }) => {
  return (
    <Col key={colIdx} type={col[0]} color={TETROMINOS[col[0]].color} />
  );
});

const Stage = ({ stage }) => {
  return (
    <StyledStage>
      {stage.map((row, key) => (
        <Row key={key} stage={stage} row={row} />
      ))}
    </StyledStage>
  );
};

export default Stage;
