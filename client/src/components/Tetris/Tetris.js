import styled from "styled-components";
import Stage from "./Stage";

const Styled = styled.button`
  width: 100%;
  height: 100%;
  background: transparent;
  outline: none;
  border: none;
  &:focus {
    outline: none;
    border: none;
  }
`;

const Tetris = ({ move, keyUp, startGame, stage, startgame }) => {

  return (
    <Styled onKeyDown={(e) => move(e)} onKeyUp={keyUp} onKeyPress={startgame}>
      {/* <button style={{ backgroundColor: "red", paddingInline: "10px" }} onClick={startGame}>start</button> */}
      <Stage stage={stage} />
    </Styled>
  );
};
export default Tetris;
