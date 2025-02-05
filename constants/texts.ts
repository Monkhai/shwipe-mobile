import { TextStyle } from 'react-native'

export const texts = {
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: -0.4,
  },
  largeTitleEmphasized: {
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: -0.4,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  titleEmphasized: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.4,
    fontWeight: 'bold',
  },

  secondaryTitle: {
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.4,
  },
  secondaryTitleEmphasized: {
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.4,
    fontWeight: 'bold',
  },
  tertiaryTitle: {
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: -0.4,
  },
  tertiaryTitleEmphasized: {
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: -0.4,
    fontWeight: 'bold',
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
    fontWeight: 'semibold',
  },
  HeadlineItalic: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
    fontWeight: 'semibold',
    fontStyle: 'italic',
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  bodyItalic: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
    fontStyle: 'italic',
  },
  bodyEmphasized: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
    fontWeight: 'bold',
  },
  bodyEmphasizedItalic: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  callout: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.4,
  },
  calloutItalic: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.4,
    fontStyle: 'italic',
  },
  calloutEmphasized: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.4,
    fontWeight: 'bold',
  },
  calloutEmphasizedItalic: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.4,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  subHeadline: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.4,
  },
  subHeadlineItalic: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.4,
    fontStyle: 'italic',
  },
  subHeadlineEmphasized: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.4,
    fontWeight: 'bold',
  },
  subHeadlineEmphasizedItalic: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.4,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.4,
  },
  footnoteItalic: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.4,
    fontStyle: 'italic',
  },
  footnoteEmphasized: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.4,
    fontWeight: 'bold',
  },
  footnoteEmphasizedItalic: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.4,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.4,
  },
  captionItalic: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.4,
    fontStyle: 'italic',
  },
  captionEmphasized: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.4,
    fontWeight: 'bold',
  },
  captionEmphasizedItalic: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: -0.4,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  secondaryCaption: {
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: -0.4,
  },
  secondaryCaptionItalic: {
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: -0.4,
    fontStyle: 'italic',
  },
  secondaryCaptionEmphasized: {
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: -0.4,
    fontWeight: 'bold',
  },
  secondaryCaptionEmphasizedItalic: {
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: -0.4,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
}

export type TextType = keyof typeof texts
