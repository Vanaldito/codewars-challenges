const movements = {
  right: [0, 1],
  left: [0, -1],
  up: [-1, 0],
  down: [1, 0],
};

const nextDirection = {
  right: "down",
  down: "left",
  left: "up",
  up: "right",
};

function spiralize(n) {
  const result = Array.from({ length: n }).map(() => Array(n).fill(0));

  let direction = "right";
  let [y, x] = [0, 0];

  result[y][x] = 1;

  let numberOfMovements = n - 1;

  for (let _ = 0; _ < numberOfMovements; _++) {
    const [movementY, movementX] = movements[direction];

    y += movementY;
    x += movementX;
    result[y][x] = 1;
  }

  direction = nextDirection[direction];

  while (numberOfMovements > 0) {
    let cicles = numberOfMovements === 1 ? 1 : 2;

    for (let i = 0; i < cicles; i++) {
      const [movementY, movementX] = movements[direction];

      for (let j = 0; j < numberOfMovements; j++) {
        y += movementY;
        x += movementX;
        result[y][x] = 1;
      }

      direction = nextDirection[direction];
    }

    numberOfMovements -= 2;
  }

  return result;
}

console.log(spiralize(10));

console.log(
  JSON.stringify(spiralize(5)) ===
    JSON.stringify([
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
    ])
);

console.log(
  JSON.stringify(spiralize(8)) ===
    JSON.stringify([
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ])
);
