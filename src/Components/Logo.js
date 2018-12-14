// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { Link } from '@reach/router'
import { Flex } from './Container'
import { Text } from './Text'

const Container = styled(Flex.withComponent(Link))({ textDecoration: 'none' })

export const Logo = (props: {}) => {
  return (
    <Container to="/" {...props} flexDirection="column">
      <Text
        sans
        fontSize={36}
        fontWeight="bold"
        color="charlestonGreen"
        textAlign="left">
        Tell Tale
      </Text>
      <Text fontSize={24} color="charlestonGreen" textAlign="left">
        Adventure together.
      </Text>
    </Container>
  )
}
