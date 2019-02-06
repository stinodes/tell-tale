// @flow
import * as React from 'react'
import { ThemeContext } from '@emotion/core'
import styled from '@emotion/styled'
import { width, height, color } from 'styled-system'
import { flexBox } from '../styles'

import { Base } from '../Button'
import { ReactComponent as Home } from './feather/home.svg'
import { ReactComponent as Edit } from './feather/edit-3.svg'
import { ReactComponent as User } from './feather/user.svg'
import { ReactComponent as ChevronLeft } from './feather/chevron-left.svg'
import { ReactComponent as CornerDownRight } from './feather/corner-down-right.svg'
import { ReactComponent as X } from './feather/x.svg'
import { ReactComponent as LogIn } from './feather/log-in.svg'
import { ReactComponent as UserPlus } from './feather/user-plus.svg'

const ICONS = {
  ChevronLeft,
  CornerDownRight,
  Edit,
  Home,
  User,
  X,
  LogIn,
  UserPlus,
}

const IconButton = styled(Base)(color, height, width, flexBox, {
  border: 'none',
})

type Props = {
  color?: string,
  size?: number,
  icon: React.ComponentType<{ stroke: ?string }>,
}
const Icon = ({ color, icon: Svg, ...props }: Props) => {
  const theme = React.useContext(ThemeContext)
  const colorString = theme.colors[color] || color || theme.colors.icon
  return <Svg stroke={colorString} {...props} />
}

const StyledIcon = styled(Icon)(width, height)

Icon.ICONS = ICONS
StyledIcon.ICONS = ICONS

export { StyledIcon as Icon, IconButton }
