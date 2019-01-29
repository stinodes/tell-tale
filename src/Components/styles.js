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
import { tint, shade } from 'polished'

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

type ColorStyles = {
  backgroundColor: ?string,
  color: ?string,
}

const withValidColor = (fn: string => string) => (color: ?string) => {
  if (!color || color === 'transparent') return color
  return fn(color)
}
export const interactiveColor = <Props: {}>(fn: Props => ColorStyles) => {
  return (props: Props) => {
    const { color, backgroundColor } = fn(props)
    const hover = withValidColor(tint(0.3))
    const active = withValidColor(shade(0.3))
    return {
      color,
      backgroundColor,
      transition: 'color .2s ease, background-color .2s ease',
      outline: 'none',
      ':hover': {
        color: hover(color),
        backgroundColor: hover(backgroundColor),
      },
      ':focus': {
        color: active(color),
        backgroundColor: active(backgroundColor),
      },
    }
  }
}

export const outline = <Props: {}>({
  borderRadius,
}: {
  borderRadius?: number | (Props => number),
} = {}) => {
  return (props: Props) => {
    let br
    if (typeof borderRadius === 'number') br = borderRadius
    else if (typeof borderRadius === 'function') br = borderRadius(props)
    return {
      position: 'relative',
      borderRadius: br,
      ':before': {
        content: '" "',
        display: 'block',
        position: 'absolute',
        top: -3,
        bottom: -3,
        left: -3,
        right: -3,
        borderRadius: br && br + 3,
        border: 'transparent 3px solid',
        transition: 'border-color .2s ease',
      },
      ':focus': {
        ':before': {
          borderColor: 'Highlight',
        },
      },
    }
  }
}

// export const outline = (
//   selectors: Array<'focus' | 'active'> = ['focus', 'active'],
// ) => (props: any) =>
//   selectors.reduce(
//     (prev, selector) => ({
//       ...prev,
//       [`:${selector}`]: {
//         outline: 'Highlight thick solid',
//       },
//     }),
//     {},
//   )
