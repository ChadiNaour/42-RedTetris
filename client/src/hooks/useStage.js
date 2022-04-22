import { useState, useEffect } from 'react';
import { createStage, STAGE_HEIGHT, checkCollision } from '../utils/gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = newStage =>
      newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          console.log("hhhhhhhhh", rowsCleared);
          setRowsCleared(rowsCleared + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = prevStage => {
      // First flush the stage
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Then draw the shadow of tetromino
      let shadow = 1;
      while (shadow < STAGE_HEIGHT && !checkCollision(player, stage, { x: 0, y: shadow })) {
        shadow++;
      }
      if (shadow) {
        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              newStage[y + player.pos.y + shadow - 1][x + player.pos.x] = [
                value + "S",
                `${player.collided ? "merged" : "clear"}`,
              ];
            }
          });
        });
      }

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });
      // Then check if we got some score if collided
      if (player.collided) {
        resetPlayer(newStage);
        return sweepRows(newStage);
      }
      return newStage;
    };

    // Here are the updates
    setStage(prev => updateStage(prev));
  }, [
    player,
    resetPlayer,
  ]);

  return [stage, setStage, rowsCleared];
};