export const colors = {
  white: '#FFFFFF',
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
    background: '#000000',
    secondaryBackground: '#161618',
    elevatedBackground: '#1C1C1F',
    white: '#000000',
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

export type ColorType = keyof typeof colors.light | keyof typeof colors.dark
