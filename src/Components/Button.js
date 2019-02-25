// @flow
import styled from '@emotion/styled'
import { Link } from '@reach/router'
import withProps from 'recompose/withProps'
import { color } from 'styled-system'
import { interactiveColor, outline } from './styles'
import { Flex } from './Container'

const Base = styled('button')(
  interactiveColor(color),
  outline({ borderRadius: ({ borderRadius }) => borderRadius }),
  {
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  },
)
const Button = withProps(({ to }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  as: to ? Link : undefined,
}))(Flex.withComponent(Base))

export { Base, Button }
