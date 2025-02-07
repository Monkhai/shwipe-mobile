export const colors = {
  light: {
    background: '#FFFFFF',
    secondaryBackground: '#F2F2F7',
    elevatedBackground: '#FFFFFF',
    white: '#FFFFFF',
    primary: '#007AFF',
    danger: '#FF3B30',
    success: '#34C759',
    warning: '#FF9F0A',
    label: '#000000',
    secondaryLabel: '#3C3C4399',
    tertiaryLabel: '#3C3C434D',
    quaternaryLabel: '#3C3C432E',
  },
  dark: {
    white: '#FFFFFF',
    background: '#000000',
    secondaryBackground: '#161618',
    elevatedBackground: '#1C1C1F',
    primary: '#0A84FF',
    danger: '#FF453A',
    success: '#30D158',
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
}

export type ColorType = keyof typeof colors.light | keyof typeof colors.dark
