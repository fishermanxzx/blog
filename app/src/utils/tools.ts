export const random = (...args: [number, number?]) => {
  let min = args[0]
  let max = args[1]
  if (max === undefined) {
    max = min
    min = 0
  }
  if (min > max) {
    const hold = max
    max = min
    min = hold
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}
