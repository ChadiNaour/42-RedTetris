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
  max-width: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background: rgba(${props => props.color}, 0.8);
  border: ${props => (props.type === 0 ? `1px solid ${props.theme.border.stage}` : '1px solid')};
  border-bottom-color: rgba(${props => (props.type === 0 ? props.theme.border.stage : props.color)}, 0.1);
  border-right-color: rgba(${props => (props.type === 0 ? props.theme.border.stage : props.color)}, 1);
  border-top-color: rgba(${props => (props.type === 0 ? props.theme.border.stage : props.color)}, 1);
  border-left-color: rgba(${props => (props.type === 0 ? props.theme.border.stage : props.color)}, 0.3 );
`;


// border: solid 1px ${(props) => props.theme.border.stage};
// background-color: ${(props) => {
//   if (props.type) return "red";
//   return props.theme.background.stage;
// }};
