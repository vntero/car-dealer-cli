export const stringValidation = (input) => {
  if (typeof input !== 'string' || input.trim() === '') {
    return false
  }
  return true
}

export const numberValidation = (input) => {
  if (isNaN(input)) {
    return false
  }
  return true
}
