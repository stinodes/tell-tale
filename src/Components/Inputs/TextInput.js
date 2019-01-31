// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import TextArea from 'react-textarea-autosize'
import { outline, layout } from '../styles'
import type { FieldProps } from 'formik'

const OutlineComp = styled('div')(
  outline({
    prop: 'outline',
    focus: false,
    borderRadius: ({ borderRadius }) => borderRadius,
  }),
  layout,
)
const Outline = ({
  children,
  ...props
}: {
  children: React.Node,
  borderRadius?: number,
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

const asField = (Comp: React.ComponentType<*>) => ({
  field,
  form,
  inputKey,
  ...props
}: {
  ...FieldProps,
  inputRef?: React.Ref,
  onBlur?: Event => any,
}) => {
  return (
    <Comp
      {...props}
      {...field}
      onBlur={e => {
        field && field.onBlur(e)
        // $FlowFixMe :(
        props.onBlur && props.onBlur(e)
      }}
    />
  )
}

export { Outline, TextArea, asField }
