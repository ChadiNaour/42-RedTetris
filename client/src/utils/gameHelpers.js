export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const createStage = (height = STAGE_HEIGHT , width = STAGE_WIDTH) =>
  Array.from(Array(height), () =>
    new Array(width).fill([0, "clear"])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1 - check that we are on atetromino
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2 - check that our move is inside the canva height Y
          !stage[y + player.pos.y + moveY] ||
          // 3 - check that our move is inside the canva width X
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 4 - check that the cell were moving into not set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
};
