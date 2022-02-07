export function allFieldsClicked(fields) {
  let count = 0

  for (let i = 0; i < fields.length; i += 1) {
    if (fields[i].value !== '') {
      count += 1
    }
  }

  if (count === 9) {
    return true
  }
  return false
}
