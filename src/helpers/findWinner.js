export function findWinner(fields) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < winningCombinations.length; i += 1) {
    const [a, b, c] = winningCombinations[i]

    if (fields[a].value !== '' && fields[a].value === fields[b].value && fields[a].value === fields[c].value) {
      return `${fields[a].value} win`
    }
  }

  return null
}
