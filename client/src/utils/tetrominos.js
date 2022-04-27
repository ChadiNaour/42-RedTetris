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

export const NEXT_TETROMINOS = {
  0: { shape: [[0]], color: "0,0,0" },
  I: {
    shape: [
      [0, 0, 0, 0],
      ["I", "I", "I", "I"],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "80, 227, 230",
  },
  J: {
    shape: [
      [0, 0, 0, 0],
      ["J", 0, 0, 0],
      ["J", "J", "J", 0],
      [0, 0, 0, 0],
    ],
    color: "36, 95, 223",
  },
  L: {
    shape: [
      [0, 0, 0, 0],
      [0, 0, "L", 0],
      ["L", "L", "L", 0],
      [0, 0, 0, 0],
    ],
    color: "223, 173, 36",
  },
  O: {
    shape: [
      [0, 0, 0, 0],
      [0, "O", "O", 0],
      [0, "O", "O", 0],
      [0, 0, 0, 0],
    ],
    color: "223, 217, 36",
  },
  S: {
    shape: [
      [0, 0, 0, 0],
      [0, "S", "S", 0],
      ["S", "S", 0, 0],
      [0, 0, 0, 0],
    ],
    color: "48, 211, 56",
  },
  T: {
    shape: [
      [0, 0, 0, 0],
      ["T", "T", "T", 0],
      [0, "T", 0, 0],
      [0, 0, 0, 0],
    ],
    color: "132, 61, 198",
  },
  Z: {
    shape: [
      [0, 0, 0, 0],
      [0, "Z", "Z", 0],
      [0, 0, "Z", "Z"],
      [0, 0, 0, 0],
    ],
    color: "227, 78, 78",
  },
};

// Generate random tetrimino
export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};


export const randomTetromino1 = () => {
  let randomTetrimino = Math.floor(Math.random() * 7);
  switch (randomTetrimino) {
    case 0:
      return "I";
    case 1:
      return "J";
    case 2:
      return "L";
    case 3:
      return "O";
    case 4:
      return "S";
    case 5:
      return "T";
    case 6:
      return "Z";
  }
};

export const getTetrominos = () => {
  let tetriminos = [];
  for (let i = 0; i < 20; i++) {
    tetriminos.push(randomTetromino1());
  }
  return tetriminos;
};