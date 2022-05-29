import { Dimensions } from 'react-native'

export const { width, height } = Dimensions.get('window')
export const SIZE = 63
export const ICON_SIZE = SIZE * 0.6
export const SPACING = 20

export const s = width * 0.68

export const placesToVisitTheme = {
  ITEM_WIDTH: s,
  ITEM_HEIGHT: s * 1.5,
  RADIUS: 20,
  SPACING,
  FULL_SIZE: s + SPACING + 1,
}
