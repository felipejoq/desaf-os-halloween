function escapePyramidHead(room) {
  const n = room.length;
  let pyramidPos, targetPos;

  // Buscando rápidamente las posiciones iniciales de '▲' (Pyramid Head) y 'T' (tú)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (room[i][j] === '▲') pyramidPos = [i, j];
      if (room[i][j] === 'T') targetPos = [i, j];
    }
  }

  // Mapa inicial (arriba, abajo, izquierda, derecha)
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1]
  ];

  // Cola para BFS con [fila, columna, pasos] https://es.wikipedia.org/wiki/B%C3%BAsqueda_en_anchura
  const queue = [[...pyramidPos, 0]];
  const visited = Array.from({ length: n }, () => Array(n).fill(false));
  visited[pyramidPos[0]][pyramidPos[1]] = true;

  // Ejecutamos BFS
  while (queue.length > 0) {
    const [x, y, steps] = queue.shift();

    // Si Pyramid Head alcanzó tu posición 💀
    if (x === targetPos[0] && y === targetPos[1]) {
      return steps;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      // Verificar límites y obstáculos 😬
      if (nx >= 0 && nx < n && ny >= 0 && ny < n &&
        room[nx][ny] !== '#' && !visited[nx][ny]) {
        visited[nx][ny] = true;
        queue.push([nx, ny, steps + 1]);
      }
    }
  }

  // Si no se encontró un camino 🥳
  return -1;
}

const room = [
  ['.', '.', '#', '.', '▲'],
  ['#', '.', '#', '.', '#'],
  ['.', '.', '.', '.', '.'],
  ['#', '#', '#', '.', '#'],
  ['T', '.', '.', '.', '.']
]

console.log(escapePyramidHead(room)) // -> 8

const room2 = [
  ['T', '.', '#', '.'],
  ['.', '.', '.', '.'],
  ['▲', '.', '.', '#'],
  ['.', '#', '#', '#']
]

console.log(escapePyramidHead(room2)) // -> 2

const room3 = [
  ['#', '#', '#',],
  ['▲', '.', '#',],
  ['.', '#', 'T',]
]

console.log(escapePyramidHead(room3)) // -> -1