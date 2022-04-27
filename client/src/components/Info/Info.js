import styled from "styled-components";
import Stage from "../Tetris/Stage";
import NextCell from './NextCell'

const StyledInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.background.secondary};
  display: flex;
`;

const NextTetromino = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  // background-color: yellow;
  h1 {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.headers.h1.fontSize};
    padding: ${(props) => props.theme.headers.h1.padding};
    font-family: ${(props) => props.theme.headers.h1.font};
    font-weight: ${(props) => props.theme.headers.h1.fontWeight};
    letter-spacing: ${(props) => props.theme.headers.h1.letterSpacing};
    color: ${(props) => props.theme.headers.h1.color};
  }
  .content {
    flex: 1;
    /* background-color: white; */
    /* border: 1px solid ${(props) => props.theme.border.avatar};
     */
    position: relative;
    .background {
      // position: absolute;
      // top: 0;
      // left: 0;
      // background-color: yellow;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: black;
      border-top: 1px solid #b33030;
      border-right: 1px solid #b33030;
      border-bottom: 1px solid #b33030;
    }
  }
`;

const GameDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  // background-color: blue;
  h1 {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.headers.h1.fontSize};
    padding: ${(props) => props.theme.headers.h1.padding};
    font-family: ${(props) => props.theme.headers.h1.font};
    font-weight: ${(props) => props.theme.headers.h1.fontWeight};
    letter-spacing: ${(props) => props.theme.headers.h1.letterSpacing};
    color: ${(props) => props.theme.headers.h1.color};
  }
  .content {
    flex: 1;
    background-color: black;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top: 1px solid #b33030;
    border-left: 1px solid #b33030;
    border-bottom: 1px solid #b33030;
  }
  p {
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-weight: ${(props) => props.theme.message.fontWeight};
    letter-spacing: ${(props) => props.theme.message.letterSpacing};
    color: ${(props) => props.theme.message.color};
    padding: 0.5rem;
  }
`;

export const StyledNext = styled.div`
  display: grid;
  // background-color: red;
  grid-template-columns: repeat(${props => props.width}, 48px);
  grid-template-rows: repeat(
    ${props => props.height},
    calc(14.5vh / ${props => props.width})
  );
  height: 185px;
  width: 180px;
  // margin-bottom: -70px;
  // margin-left: 0px;
`;

const Info = ({ score, level, rows, nextStage }) => {
  return (
    <StyledInfo>
      <GameDetails>
        <h1>Details</h1>
        <div className="content">
          <p>rows : {rows}</p>
          <p>level : {level}</p>
          <p >score : {score}</p>
        </div>
      </GameDetails>
      <NextTetromino>
        <h1>Next</h1>
        <div className="content">
          {/* <div className="tetromino"></div> */}
          <div className="background">
          <StyledNext width={nextStage[0].length} height={nextStage.length} >
            {nextStage.map(row => row.map((cell, x) => <NextCell key={x} type={cell[0]} />))}
          </StyledNext>
          </div>
        </div>
      </NextTetromino>
    </StyledInfo>
  );
};

export default Info;
