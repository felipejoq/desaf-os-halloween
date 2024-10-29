function findSafestPath(dream) {
  const n = dream.length;
  const m = dream[0].length;

  // Crear una matriz de costos del mismo tamaño que dream
  const cost = Array.from({length: n}, () => Array(m).fill(0));

  // Iniciar la celda de partida
  cost[0][0] = dream[0][0];

  // Llenar la primera fila
  for (let j = 1; j < m; j++) {
    cost[0][j] = cost[0][j - 1] + dream[0][j];
  }

  // Llenar la primera columna
  for (let i = 1; i < n; i++) {
    cost[i][0] = cost[i - 1][0] + dream[i][0];
  }

  // Llenar el resto de la matriz de costos
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      cost[i][j] = dream[i][j] + Math.min(cost[i - 1][j], cost[i][j - 1]);
    }
  }

  // El valor en la esquina inferior derecha es el camino más seguro
  return cost[n - 1][m - 1];
}

const dream = [
  [1, 2, 3],
  [3, 2, 1],
  [4, 4, 4]
]

console.log(findSafestPath(dream));  // Devuelve 10
