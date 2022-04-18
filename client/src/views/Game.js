import { useEffect, useState } from "react";
import styled from "styled-components";
// import Info from "../components/Info/Info";
import Info from "../components/Info/Info";
import Chat from "../components/Chat/Chat.js";
import OtherStages from "../components/OtherStages/OtherStages";
import Tetris from "../components/Tetris/Tetris";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";
import { createStage, checkCollision } from "../utils/gameHelpers";

const StyledContainer = styled.div`
  /* width: 100%; */
  display: grid;
  background-color: ${(props) => props.theme.background.primary};
  grid-template-columns: 500px 500px 500px;
  grid-template-rows: 350px 350px 350px;
  // padding: 1rem;
  gap: 1rem;
  justify-content: center;
  grid-template-areas:
    "otherstage stage info"
    "otherstage stage msgs"
    "otherstage stage msgs";
  @media (max-width: 1300px) {
    /* height: 1800px !important; */
    grid-template-columns: 300px 300px 300px !important;
    grid-template-rows: 300px 300px 300px !important;
  }
  @media (max-width: 1000px) {
    /* height: 1800px !important; */
    grid-template-columns: 300px 300px !important;
    grid-template-rows: 400px 600px !important;
    grid-template-areas:
      "msgs  info"
      "otherstage  stage" !important;
  }
  @media (max-width: 600px) {
    /* height: 1800px !important; */
    grid-template-columns: 300px !important;
    grid-template-rows: 500px 500px 250px 250px !important;
    background-color: turquoise !important;
    grid-template-areas:
      "info"
      "stage"
      "otherstage"
      "msgs" !important;
  }
  @media (max-width: 380px) {
    /* height: 1800px !important; */
    /* padding: rem !important; */
    grid-template-columns: 250px !important;
    grid-template-rows: 500px 500px 250px 250px !important;
    background-color: turquoise !important;
    grid-template-areas:
      "info"
      "stage"
      "otherstage"
      "msgs" !important;
  }
`;

const StyledOtherStages = styled.div`
  grid-area: otherstage;
  background: blue;
`;
const StyledStage = styled.div`
  background: yellow;
  grid-area: stage;
  border: 1px solid ${(props) => props.theme.border.stage};
`;
const StyledInfo = styled.div`
  background: red;
  grid-area: info;
  /* padding: 1rem; */
`;
const StyledMsgs = styled.div`
  background: green;
  grid-area: msgs;
`;

const Game = () => {
  const players = useSelector((state) => state.playersReducer.players);
  const UserPlayer = useSelector((state) => state.playerReducer);
  const [gameOver, setGameOver] = useState(false);
  const [dropTime, setDropTime] = useState(null);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);



  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0 });
  };


  const startGame = () => {
    //reset everyting
    setStage(createStage());
    // setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
    // //console.log("bskch");
  };


  const drop = () => {
    // console.log("rows are : ",rows)
    // console.log("rows cleared are : ",rowsCleared);
    //increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10){
      setLevel(level + 1);
      //also increase speed
      // setDropTime(1000 / (level + 1) + 200);

    }
    if (!checkCollision(player, stage, { x: 0, y: 1 }))
      updatePlayerPos({ x: 0, y: 1, collided: false });
    else {
      if (player.pos.y < 1) {
        //console.log("GameOver!!!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };
  
  const keyUp = ({keyCode}) => {
    if (!gameOver)
    {
      // if (keyCode === 40){
      //   setDropTime(1000 / (level + 1) + 200);
      // }
    }
  };

  const dropPlayer = () => {
    // setDropTime(null);
    drop();
  };
  useEffect(() => {
    startGame();
  }, []);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37)
        //left key
        movePlayer(-1);
      else if (keyCode === 39)
        //right key
        movePlayer(1);
      else if (keyCode === 40)
        //down key
        dropPlayer(1);
      else if (keyCode === 38)
        //up key
        playerRotate(stage, 1);
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  // console.log("the stage is", stage)
  //console.log("hado homa lplayers", players);

  return (
    <StyledContainer>
      {/* <StyledOtherStages>
        <OtherStages />
      </StyledOtherStages> */}
      <StyledStage>
        <Tetris move={move} keyUp={keyUp} startGame={startGame} stage={stage} />
      </StyledStage>
      <StyledInfo>
        <Info score={score} level={level} rows={rows}/>
      </StyledInfo>
      <StyledMsgs>
        <Chat players={players} player={UserPlayer} />
      </StyledMsgs>
    </StyledContainer>
  );
};

export default Game;
