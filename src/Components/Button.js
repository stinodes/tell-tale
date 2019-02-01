// @flow
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'
import { color } from 'styled-system'
import { interactiveColor, outline } from './styles'
import { Flex } from './Container'

const Base = styled('button')(
  interactiveColor(color),
  outline({ borderRadius: ({ borderRadius }) => borderRadius }),
  { border: 'none', outline: 'none', cursor: 'pointer' },
)
const Button = withProps(() => ({
  justifyContent: 'center',
  alignItems: 'center',
}))(Flex.withComponent(Base))

export { Base, Button }
