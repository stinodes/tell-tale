// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { color } from 'styled-system'
import { Flex, Text, Box } from '../Components'

const Background = styled(Flex)(color, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

const Logo = (props: {}) => (
  <Flex flexDirection="column" alignItems="center" {...props}>
    <Text sans fontWeight="bold" color="charlestonGreen" fontSize={36}>
      Tell Tale
    </Text>
    <Box pb={5} />
    <Text color="charlestonGreen" fontSize={24}>
      Adventure together.
    </Text>
  </Flex>
)

type Props = {
  onComplete: () => any,
}
const Splash = ({ onComplete }: Props) => {
  // const [isCompleted, setCompleted] = React.useState(false)
  // React.useEffect(() => {
  //   new Promise(resolve => setTimeout(resolve, 2000)).then(() =>
  //     setCompleted(true),
  //   )
  // }, [])

  // const [backgroundStyles] = useSpring({
  //   delay: 200,
  //   from: { opacity: 1 },
  //   opacity: isCompleted ? 0 : 1,
  //   onFrame: props => props.opacity === 0 && onComplete(),
  // })

  return (
    <Background bg="white" alignItems="center" justifyContent="center">
      <Logo key="logo" />
    </Background>
  )
}

export { Splash }
