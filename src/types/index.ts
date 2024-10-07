export type ColorLevels = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type ColorDarkPalette = {
  [K in `--el-color-primary-dark-${ColorLevels}`]: string
}

export type ColorLightPalette = {
  [K in `--el-color-primary-light-${ColorLevels}`]: string
}

export type ColorPalette = ColorDarkPalette &
  ColorLightPalette & {
    '--el-color-primary': string
  }
