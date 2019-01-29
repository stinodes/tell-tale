// @flow
import styled from '@emotion/styled'
import { color } from 'styled-system'
import { interactiveColor, outline } from './styles'

const Base = styled('button')(
  interactiveColor(color),
  outline({ borderRadius: ({ borderRadius }) => borderRadius }),
  { border: 'none', outline: 'none' },
)

export { Base }
