import { useEffect, useState } from "react";
import styled from "styled-components";
import Stage from "./Stage";
import { useInterval } from "../../hooks/useInterval";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { useGameStatus } from "../../hooks/useGameStatus";
import { createStage, checkCollision } from "../../utils/gameHelpers";

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

const Tetris = () => {
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
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    // //console.log("bskch");
  };


  const drop = () => {
    //increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10){
      setLevel(prev => prev + 1);
      //also increase speed
      setDropTime(1000 / (level + 1) + 200);

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
      if (keyCode === 40){
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
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

  console.log("the stage is", stage)

  return (
    <Styled onKeyDown={(e) => move(e)}  onKeyUp={keyUp}>
      <>score: {score} </><br />
      <>level: {level}</><br />
      <>rows: {rows}</><br />
      <Stage stage={stage} />
    </Styled>
  );
};
export default Tetris;
