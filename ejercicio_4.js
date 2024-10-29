function findTheKiller(whisper, suspects) {
  const isAllUncertain = whisper.slice(0, -1).split('').every(char => char === '~')
    && whisper.endsWith('$');

  const matches = suspects.filter(suspect => {
    // Caso especial: todos los caracteres son inciertos excepto `$`
    if (isAllUncertain) {
      return suspect.length === whisper.length - 1;
    }

    // Condición de longitud para nombres que terminan en `$`
    const isLengthMatch = whisper.endsWith('$')
      ? whisper.length - 1 === suspect.length
      : whisper.length <= suspect.length;

    if (!isLengthMatch) return false;

    // Condición para último carácter si el susurro termina en `$`
    const doesLastCharMatch = whisper.endsWith('$')
      ? whisper[whisper.length - 2].toLowerCase() === suspect[suspect.length - 1].toLowerCase()
      : true;

    if (!doesLastCharMatch) return false;

    // Verificar que todos los caracteres definidos coincidan
    for (let i = 0; i < whisper.length && whisper[i] !== '$'; i++) {
      if (whisper[i] !== '~' && whisper[i].toLowerCase() !== suspect[i].toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  // 😱 Retornamos el nombre del sospechoso o una lista de nombres que coinciden
  return matches.length === 1 ? matches[0] : matches.join(',') || '';
}


const whisper = 'd~~~~~a';
const suspects = ['Dracula', 'Freddy Krueger', 'Jason Voorhees', 'Michael Myers'];

console.log(findTheKiller(whisper, suspects)); // -> 'Dracula'

const whisper2 = '~r~dd~';
const suspects2 = ['Freddy', 'Freddier', 'Fredderic']

console.log(findTheKiller(whisper2, suspects2)); // -> 'Freddy,Freddier,Fredderic'

const whisper3 = '~r~dd$';
const suspects3 = ['Freddy', 'Freddier', 'Fredderic']

console.log(findTheKiller(whisper3, suspects3)); // -> 'Freddy'

const whisper4 = 'mi~~def';
const suspects4 = ['Midudev', 'Midu', 'Madeval']

console.log(findTheKiller(whisper4, suspects4)); // -> ''