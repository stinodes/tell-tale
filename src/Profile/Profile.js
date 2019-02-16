// @flow
import * as React from 'react'
import { Redirect } from '@reach/router'
import { useProfileContext } from './ProfileContext'
import { Button, Text, Flex, H3 } from '../Components'
import { Page } from '../Components/Layout'

type Props = {}
const Profile = (props: Props) => {
  const { loggedIn, logOut, profile } = useProfileContext()

  if (!loggedIn) return <Redirect from="profile" to="log-in" noThrow />

  if (!profile) return null

  return (
    <Page title="Profile">
      <Flex flex={1} flexDirection="column">
        <Flex px={5} py={4} justifyContent="center">
          <H3
            textAlign="center"
            color="blackCoral"
            fontSize={40}
            fontWeight="800">
            {profile.pseudonym || `${profile.firstName} ${profile.lastName}`}
          </H3>
        </Flex>
        {profile.firstName && (
          <Flex px={5} pb={4} justifyContent="center">
            <Text
              sans
              textAlign="center"
              color="blackCoral"
              fontSize={24}
              fontWeight="600">
              {profile.firstName} {profile.lastName}
            </Text>
          </Flex>
        )}
        <Flex flex={1} />
        <Flex justifyContent="center">
          <Button bg="transparent" px={5} py={4} onClick={logOut}>
            <Text sans fontSize={20} fontWeight="600" color="lapisLazuliLight">
              Log Out
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Page>
  )
}

export { Profile }
