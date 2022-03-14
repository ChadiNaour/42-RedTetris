import { useEffect, useState } from "react";
import styled from "styled-components";
import Stage from "./Stage";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
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
  const [stage, setStage] = useStage(player, resetPlayer);
  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 }))
      updatePlayerPos({ x: dir, y: 0 });
  };
  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
    console.log("bskch");
  };
  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 }))
      updatePlayerPos({ x: 0, y: 1, collided: false });
    else {
      if (player.pos.y < 1) {
        console.log("GameOver!!!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };
  const dropPlayer = () => {
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

  return (
    <Styled onKeyDown={(e) => move(e)}>
      <Stage stage={stage} />
    </Styled>
  );
};
export default Tetris;
