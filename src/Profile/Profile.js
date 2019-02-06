// @flow
import * as React from 'react'
import { Redirect } from '@reach/router'
import { useProfileContext } from './ProfileContext'
import { Button, Text, Flex } from '../Components'
import { Page } from '../Components/Layout'

type Props = {}
const Profile = (props: Props) => {
  const { loggedIn, logOut } = useProfileContext()

  if (!loggedIn) return <Redirect from="profile" to="log-in" noThrow />

  return (
    <Page title="Profile">
      <Flex alignItems="center" justifyContent="center" flex={1}>
        <Button px={5} py={4} onClick={logOut}>
          <Text sans fontSize={20} fontWeight="600" color="lapisLazuliLight">
            Log Out
          </Text>
        </Button>
      </Flex>
    </Page>
  )
}

export { Profile }
