// @flow
import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import * as firebase from 'firebase/app'
import { Router, Redirect } from '@reach/router'
import { css } from 'emotion'
import { tint } from 'polished'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo-hooks'

import { ScrollView, Flex } from './Components'
import { NavBar, PageProvider } from './Components/Layout'
import { BrowseTales } from './Browse/BrowseTales'
import { TalesProvider } from './Browse/TalesContext'
import { CreateTale } from './Create/CreateTale'
import { Profile } from './Profile/Profile'
import { LogIn } from './LogIn/LogIn'
import { Register } from './LogIn/Register'
import { ProfileProvider, useIsLoggedIn } from './Profile/ProfileContext'
import './App.css'

const theme = {
  breakpoints: { sm: 0, md: '40em', lg: '64em', xlg: '80em' },
  space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  colors: {
    white: '#FFFFFF',
    blackCoral: '#566570',
    lapisLazuliLight: '#0091D6',
    error: tint(0.7, '#FF4D80'),
  },
}

const authLink = setContext(async (_, { headers }) => {
  const user = firebase.auth().currentUser
  const token = user ? await user.getIdToken() : ''
  return {
    headers: {
      ...headers,
      authorization: token && `Bearer ${token}`,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(
    createHttpLink({
      uri:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000/tell-tale-4f929/us-central1/api/graphql'
          : null,
    }),
  ),
  cache: new InMemoryCache(),
})

const AuthWrapper = ({ children }: { children: React.Node }) => {
  const isLoggedIn = useIsLoggedIn()
  if (isLoggedIn === null) return null
  return children
}

const App = (props: {}) => {
  // const [splashShowing, setSplashShowing] = React.useState(true)
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <PageProvider>
          <TalesProvider>
            <ProfileProvider>
              <ScrollView as={Flex} flexDirection="column" height="100%">
                <AuthWrapper>
                  <Router
                    className={css({
                      display: 'flex',
                      paddingBottom: 80,
                      flexGrow: 1,
                      flexDirection: 'column',
                    })}>
                    <Redirect noThrow from="/" to="browse" />
                    <BrowseTales path="browse" />
                    <CreateTale path="create" />
                    <Profile path="profile" />
                    <LogIn path="log-in" />
                    <Register path="register" />
                  </Router>
                </AuthWrapper>
              </ScrollView>
              <NavBar />
              {/* {splashShowing && (
                <Splash onComplete={() => setSplashShowing(false)} />
              )} */}
            </ProfileProvider>
          </TalesProvider>
        </PageProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
