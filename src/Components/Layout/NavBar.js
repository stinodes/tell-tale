// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { color } from 'styled-system'
import { Flex } from '../Container'
import { H1 } from '../Text'
import { NavLink, BackButton } from './NavButton'
import { Logo } from '../Logo'
import { flexBox } from '../styles'
import { PageContext } from './Page'

const NavBarComp = styled('nav')(
  {
    position: 'fixed',
    left: 0,
    right: 0,
    height: 80,
  },
  ({ theme, position = 'bottom' }) => ({
    [position]: 0,
    boxShadow: `${transparentize(0.9)(theme.colors.blackCoral)} 0 ${
      position === 'bottom' ? -8 : 8
    }px 24px`,
  }),
  flexBox,
  color,
)

type Props = {}
export const NavBar = (props: Props) => {
  const { title } = React.useContext(PageContext)
  return (
    <NavBarComp bg="white" alignItems="center" position="bottom">
      <Flex flex={1}>
        <Flex pl={{ sm: 2, md: 5 }} pr={{ sm: 2, md: 5 }}>
          <BackButton />
        </Flex>
        <Flex flex={1} alignItems="center">
          <H1 fontSize={{ sm: 24, md: 28 }} fontWeight="600" color="blackCoral">
            {title}
          </H1>
        </Flex>
      </Flex>
      <Flex px={{ sm: 1, md: 3 }}>
        <Flex px={{ sm: 1, md: 2 }}>
          <NavLink key="browse-tales" to="/browse" icon={NavLink.ICONS.Home} />
        </Flex>
        <Flex px={{ sm: 1, md: 2 }}>
          <NavLink key="create-tale" to="/create" icon={NavLink.ICONS.Edit} />
        </Flex>
        <Flex px={{ sm: 1, md: 2 }}>
          <NavLink key="profile" to="/profile" icon={NavLink.ICONS.User} />
        </Flex>
      </Flex>
    </NavBarComp>
  )
}
