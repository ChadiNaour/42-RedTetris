export const TETROMINOS = {
  0: { shape: [[0]], color: "0,0,0" },
  I: {
    shape: [
      ["I", "I", "I", "I"],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "80, 227, 230",
  },
  J: {
    shape: [
      ["J", 0, 0],
      ["J", "J", "J"],
      [0, 0, 0],
    ],
    color: "36, 95, 223",
  },
  L: {
    shape: [
      [0, 0, "L"],
      ["L", "L", "L"],
      [0, 0, 0],
    ],
    color: "223, 173, 36",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "223, 217, 36",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "48, 211, 56",
  },
  T: {
    shape: [
      ["T", "T", "T"],
      [0, "T", 0],
      [0, 0, 0],
    ],
    color: "132, 61, 198",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "227, 78, 78",
  },
  IS: {
    color: "80, 227, 230, 0.3",
  },
  JS: {
    color: "36, 95, 223, 0.3",
  },
  LS: {
    color: "223, 173, 36 , 0.3",
  },
  OS: {
    color: "223, 217, 36, 0.3",
  },
  SS: {
    color: "48, 211, 56, 0.3",
  },
  TS: {
    color: "132, 61, 198, 0.3",
  },
  ZS: {
    color: "227, 78, 78, 0.3",
  },
};

export const randomTetromino = () => {
  // //console.log("in here")
  const tetrominos = "IJLOSTZ";
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  // //console.log(randTetromino);
  // //console.log(randTetromino.shape);
  // //console.log(randTetromino.color);

  return TETROMINOS[randTetromino];
};
