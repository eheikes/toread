// Colors found on http://www.colorjack.com
const palette = [
  '45C7BA', 'AC0339', 'A9533A', '2B20A1', 'F79E09', 'B7078C',
  '23780A', 'F2DEC4', 'D6FFFC', '333333', '452223', '974ABA',
  '00374A', 'FF00DD', 'DCFE00', '8193AF', '4C010E', '8AABAF',
]

export const getColor = (index) => {
  return `#${palette[index]}`
}

// From http://24ways.org/2010/calculating-color-contrast
export const getContrastColor = (hexColor) => {
  hexColor = hexColor.replace(/^#/, '')
  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? 'black' : 'white'
}
