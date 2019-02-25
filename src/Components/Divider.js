// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { Flex } from './Container'

const Divider: React.ComponentType<{
  opacity?: number,
  vertical?: boolean,
  horizontal?: boolean,
  bg: string,
}> = styled(Flex)(({ vertical, horizontal, opacity = 0.3 }) => {
  if (vertical) return { width: 1, opacity }
  return { height: 1, opacity }
})

export { Divider }
