// @flow
import {
  compose,
  // layout
  space,
  display,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  verticalAlign,
  //flex
  alignItems,
  alignContent,
  justifyContent,
  justifyItems,
  flex,
  flexWrap,
  flexBasis,
  flexDirection,
  justifySelf,
  alignSelf,
  order,
  // typo
  fontSize,
  fontWeight,
  textAlign,
  letterSpacing,
  lineHeight,
  // position
  position as positionStyle,
  top,
  left,
  right,
  bottom,
} from 'styled-system'

export const layout = compose(
  space,
  display,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  verticalAlign,
  width,
)
export const flexBox = compose(
  () => ({ display: 'flex' }),
  alignItems,
  alignContent,
  justifyContent,
  justifyItems,
  flex,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  justifySelf,
  alignSelf,
  order,
)
export const typography = compose(
  fontSize,
  fontWeight,
  textAlign,
  verticalAlign,
  letterSpacing,
  lineHeight,
)

export const position = compose(
  positionStyle,
  top,
  left,
  right,
  bottom,
)

export const outline = (
  selectors: Array<'focus' | 'active'> = ['focus', 'active'],
) => (props: any) =>
  selectors.reduce(
    (prev, selector) => ({
      ...prev,
      [`:${selector}`]: {
        outline: 'Highlight thick solid',
      },
    }),
    {},
  )
