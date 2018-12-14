// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { color } from 'styled-system'
import { Flex } from '../Container'
import { NavLink } from './NavButton'
import { Logo } from '../Logo'

const NavBarComp = styled('nav')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 180,
})
const NavBarBackground = styled('div')(color, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 122,
})
const NavBarContent = styled(Flex)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

type Props = {}
export const NavBar = (props: Props) => {
  return (
    <NavBarComp>
      <NavBarBackground bg="white" />
      <NavBarContent flexDirection="row" alignItems="center" px={6} py={5}>
        <Logo alignSelf="flex-start" />
        <Flex flex={1} />
        <NavLink to="create">Create Tale</NavLink>
        <NavLink to="browse">Browse Tales</NavLink>
        <NavLink to="login">Log In / Sign Up</NavLink>
      </NavBarContent>
    </NavBarComp>
  )
}
