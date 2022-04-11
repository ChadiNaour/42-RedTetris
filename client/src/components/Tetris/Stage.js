import { StyledStage, RowStyle, Col } from "./Stage.Style";
import {TETROMINOS} from '../../utils/tetrominos';

const Row = ({ row, rowIdx, stage }) => {
  return (
    <RowStyle>
      {row.map((col, colIdx) => {
        return <Col key={colIdx} type={col[0]} color={TETROMINOS[col[0]].color} />;
      })}
    </RowStyle>
  );
};

const Stage = ({ stage }) => {
  return (
    <StyledStage>
      {stage.map((row, rowIdx) => (
        <Row key={rowIdx} stage={stage} row={row} rowIdx={rowIdx} />
      ))}
    </StyledStage>
  );
};

export default Stage;
