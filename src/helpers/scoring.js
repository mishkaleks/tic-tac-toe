export function scoring(list, isWin, isNextMove, firstName, secondName) {
  // update scores
  const updateScores = (total, amount, isWin) => {
    const point = isWin ? 3 : 1
    const item = {
      name: amount.name,
      victories: amount.victories + point
    }
    total.push(item)
    return total
  }

  const newList = list.reduce((total, amount) => {
    const currentName = isNextMove ? firstName : secondName

    if (isWin) {
      if (amount.name === currentName) return updateScores(total, amount, isWin)
      total.push(amount)
      return total
    }

    if (amount.name === firstName) return updateScores(total, amount)
    if (amount.name === secondName) return updateScores(total, amount)

    total.push(amount)
    return total
  }, [])

  return newList
}
