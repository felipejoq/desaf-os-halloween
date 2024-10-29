function createMagicPotion(potions, target) {
  // Para evitar usar dos for
  const seen = new Map();
  // iteramos el array de pociones
  for (let i = 0; i < potions.length; i++) {
    // Calculamos el valor que debería tener el complemento para lograr el target
    const complement = target - potions[i];
    // ¿El complemento está ya en el map? ¡Entonces se encontró, retornamos resultado.
    if (seen.has(complement)) {
      // Obtiene el valor guardado en el map y lo complementa con la posición i.
      return [seen.get(complement), i];
    }
    // Si aún no encuentra, almacena el valor en el map.
    seen.set(potions[i], i);
  }

  return undefined;
}


console.log('Resultado', createMagicPotion([10, 20, 30, 40], 50))