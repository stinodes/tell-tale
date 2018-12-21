// @flow
import * as React from 'react'
import { Link, Match } from '@reach/router'
import styled from '@emotion/styled'
import { Text } from '../Text'
import { outline } from '../styles'
import { Flex } from '../Container'

const StyledText = styled(Text)({
  display: 'flex',
})
const Button = styled(Flex.withComponent(Link))(outline(), {
  textDecoration: 'none',
})
const Border = styled('div')(
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    transform: 'scaleX(0)',
    transition: 'transform .2s ease',
  },
  ({ theme }) => ({ backgroundColor: theme.colors.charlestonGreen }),
  ({ hovering, selected }) => {
    if (selected) return { transform: 'scaleX(1)' }
    if (hovering) return { transform: 'scaleX(.2)' }
  },
)

type Props = {
  to: string,
  children: React.Node,
}
export const NavLink = ({ to, ...props }: Props) => {
  const [hovering, setHovering] = React.useState(false)
  return (
    <Match path={to + '/*'}>
      {({ match }) => (
        <Button
          to={to}
          position="relative"
          width={200}
          height={64}
          mx={3}
          justifyContent="center"
          alignItems="center"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}>
          <StyledText
            sans
            color="charlestonGreen"
            textDecoration="none"
            fontSize={20}
            fontWeight="bold"
            {...props}
          />
          <Border hovering={hovering} selected={!!match} />
        </Button>
      )}
    </Match>
  )
}
