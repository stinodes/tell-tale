// @flow
import * as React from 'react'
import { Link } from '@reach/router'
import { color, height, width } from 'styled-system'
import styled from '@emotion/styled'
import { outline, flexBox } from '../styles'
import { Icon } from '../Icons'

const Button = styled('button')(outline(), color, height, width, flexBox, {
  border: 'none',
})

type Props = {
  to?: string,
  onClick?: () => any,
  icon: React.ComponentType<*>,
}
const NavLink = ({ to, onClick, icon, ...props }: Props) => {
  return (
    <Button
      {...props}
      as={to && Link}
      to={to}
      onClick={onClick}
      width={{ sm: 40, md: 48 }}
      height={{ sm: 40, md: 48 }}
      justifyContent="center"
      alignItems="center"
      bg="transparent">
      <Icon icon={icon} size={{ sm: 28, md: 32 }} color="lapisLazuliLight" />
    </Button>
  )
}

NavLink.ICONS = Icon.ICONS

const BackButton = () => {
  return (
    <NavLink
      icon={NavLink.ICONS.ChevronLeft}
      onClick={() => window.history.back()}
    />
  )
}

export { NavLink, BackButton }
