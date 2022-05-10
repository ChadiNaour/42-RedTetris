import styled from "styled-components";
import Stage from "./Stage";
import GameOver from "../GameOver"

const Styled = styled.button`
position: relative;
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

const Tetris = ({ move, keyUp, stage, gameOver, start, setStart, UserPlayer }) => {

  return (
    <Styled onKeyDown={(e) => move(e)} onKeyUp={keyUp}>
      {!start ? <GameOver UserPlayer={UserPlayer} gameOver={gameOver} start={start} setStart={setStart} /> : ""}
      {/* <button style={{ backgroundColor: "red", paddingInline: "10px" }} onClick={startGame}>start</button> */}
      <Stage stage={stage} />
      {/* <div className="overlay">
          {gameOver ? 
            <h1 className="game-over">GAME OVER</h1> : <h1>Play</h1>
          }
          <div className="overlay-content">
            <div id="key-up">
              <kbd className="key">up</kbd>
              <span>piece&nbsp; rotation</span>
            </div>
            <div id="key-down">
              <kbd className="key">down</kbd>
              <span>move&nbsp; piece&nbsp; down</span>
            </div>
            <div id="key-left">
              <kbd className="key">left</kbd>
              <span>move &nbsp;piece &nbsp;left</span>
            </div>
            <div id="key-right">
              <kbd className="key">right</kbd>
              <span>move &nbsp;piece&nbsp; right</span>
            </div>
            <div id="key-space">
              <kbd className="key">space</kbd>
              <span>hard &nbsp;drop</span>
            </div>
          </div>
          <h2 className="start-game">Press &nbsp;enter &nbsp;to &nbsp;start</h2>
        </div> */}
    </Styled>
  );
};
export default Tetris;
