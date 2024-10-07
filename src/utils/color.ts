import type { ColorPalette, ColorLevels } from '@/types'

export const toRGB = (color: string) => {
  const div = document.createElement('div')

  div.style.color = color
  document.body.appendChild(div)

  const rgbColor = window.getComputedStyle(div).color

  document.body.removeChild(div)
  const colorArray = rgbColor.slice(4).slice(0, -1).split(',')
  return { color: rgbColor, colorArray: colorArray.map((item) => Number(item)) }
}

export const generateElColor = (color: string): ColorPalette => {
  const { colorArray } = toRGB(color)

  const BLACK_COLOR = 0
  const WHITE_COLOR = 255

  const result: Partial<ColorPalette> = {}

  for (let mixingRatio = 0; mixingRatio < 10; mixingRatio++) {
    const lightMixedColor: number[] = []
    const darkMixedColor: number[] = []
    for (let color = 0; color < 3; color++) {
      lightMixedColor.push(Math.round((WHITE_COLOR * mixingRatio + colorArray[color] * (10 - mixingRatio)) / 10))
      darkMixedColor.push(Math.round((BLACK_COLOR * mixingRatio + colorArray[color] * (10 - mixingRatio)) / 10))
    }
    if (mixingRatio === 0) {
      result['--el-color-primary'] = color
    } else {
      result[`--el-color-primary-light-${mixingRatio as ColorLevels}`] = `rgb(${lightMixedColor.join(',')})`
      result[`--el-color-primary-dark-${mixingRatio as ColorLevels}`] = `rgb(${darkMixedColor.join(',')})`
    }
  }

  return result as ColorPalette
}
