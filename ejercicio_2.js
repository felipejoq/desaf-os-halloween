function battleHorde(zombies, humans) {
  let humanEnergy = 0;
  let zombieEnergy = 0;
  let resultLastCombat = { win: 'x', plus: 0 };

  for (let i = 0; i < humans.length; i++) {
    // Convertir los valores y añadir energía acumulada
    const humanPower = +humans[i] + humanEnergy;
    const zombiePower = +zombies[i] + zombieEnergy;
    // A combatir!
    const combat = humanPower - zombiePower;

    // Resumen: Determinar el resultado final y la energía sobrante
    resultLastCombat = {
      win: combat === 0 ? 'x' : combat > 0 ? 'h' : 'z',
      plus: Math.abs(combat),
    };

    // Actualizar energía acumulada según el ganador
    if (combat > 0) {
      humanEnergy = resultLastCombat.plus;
      zombieEnergy = 0;
    } else {
      zombieEnergy = resultLastCombat.plus;
      humanEnergy = 0;
    }
  }

  // Devolver el resultado final
  return resultLastCombat.win === 'x' ? 'x' : resultLastCombat.plus + resultLastCombat.win;
}

const zombies = '242';
const humans = '334';

console.log(battleHorde('444', '282'))
// primera ronda: zombie 2 vs human 3 -> humano gana (+1)
// segunda ronda: zombie 4 vs human 3+1 -> empate
// tercera ronda: zombie 2 vs human 4 -> humano gana (+2)
// resultado: "2h"