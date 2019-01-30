// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { Text, TaleTitle } from '../Text'
import { outline } from '../styles'

const OutlineComp = styled('div')(
  outline({
    prop: 'outline',
    focus: false,
    borderRadius: ({ borderRadius }) => borderRadius,
  }),
)
const Outline = ({
  children,
  borderRadius,
  ...props
}: {
  children: React.Node,
  borderRadius: number,
}) => {
  const [isFocused, setFocused] = React.useState(false)
  const child = React.Children.only(children)
  return (
    <OutlineComp outline={isFocused} {...props}>
      {React.cloneElement(child, {
        onFocus: e => {
          setFocused(true)
          child.props.onFocus && child.props.onFocus(e)
        },
        onBlur: e => {
          setFocused(false)
          child.props.onBlur && child.props.onBlur(e)
        },
      })}
    </OutlineComp>
  )
}

export { Outline }
