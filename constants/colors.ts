import { Platform } from 'react-native'

export const colors = {
  baseMaterial: '#FFFFFF4D',
  light: {
    material: '#8080804D',
    thickMaterial: '#808080E6',
    platformMaterial: Platform.select({
      ios: '#80808066',
      android: '#FFFFFF',
    }),
    thinMaterial: '#FFFFFF4D',
    background: '#FFFFFF',
    secondaryBackground: '#F2F2F7',
    elevatedBackground: '#FFFFFF',
    white: '#FFFFFF',
    primary: '#007AFF',
    danger: '#FF3B30',
    secondaryDanger: '#FF3B30',
    success: '#34C759',
    opaqueSuccess: '#34C75933',
    warning: '#FF9F0A',
    label: '#000000',
    secondaryLabel: '#3C3C4399',
    tertiaryLabel: '#3C3C434D',
    quaternaryLabel: '#3C3C432E',
  },
  dark: {
    material: '#FFFFFF4D',
    platformMaterial: Platform.select({
      ios: '#80808080',
      android: '#1C1C1F',
    }),
    thickMaterial: '#80808080',
    thinMaterial: '#8080804D',
    white: '#FFFFFF',
    background: '#000000',
    secondaryBackground: '#121214',
    elevatedBackground: '#1C1C1F',
    primary: '#0A84FF',
    danger: '#FF453A',
    secondaryDanger: '#F2544A',
    success: '#30D158',
    opaqueSuccess: '#34C75918',
    warning: '#FF9F0A',
    label: '#FFFFFF',
    secondaryLabel: '#FFFFFF99',
    tertiaryLabel: '#FFFFFF4D',
    quaternaryLabel: '#FFFFFF2E',
  },
}

export const gradients = {
  x: {
    light: ['#FF3D00', '#FF5252', '#FF7676'],
    dark: ['#D32F2F', '#E53935', '#F44336'],
  },
  heart: {
    light: ['#4CAF50', '#66BB6A', '#81C784'],
    dark: ['#4CAF50', '#81C784', '#A5D6A7'],
  },
}

export const cardBorderColors = {
  red: ['#FF3B3000', '#FF3B30', '#FF0000'],
  green: ['#34C75900', '#34C759', '#00FF00'],
  mixed: ['#FF3B3000', '#FF3B30', '#FF0000', '#FFFFFF00', '#34C75900', '#34C759', '#00FF00'],
}

export type ColorType = keyof typeof colors.light | keyof typeof colors.dark
