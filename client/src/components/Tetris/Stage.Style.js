import styled from "styled-components";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../../utils/gameHelpers";

export const StyledStage = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(STAGE_HEIGHT, 1fr);
`;

export const RowStyle = styled.div`
  width: 100%;
  display: flex;
`;

export const Col = styled.div`
  flex: 1;
  height: 100%;
  border: solid 1px ${(props) => props.theme.border.stage};
  background-color: ${(props) => {
    if (props.fill) return props.theme.background.fillCol;
    return props.theme.background.stage;
  }};
`;
