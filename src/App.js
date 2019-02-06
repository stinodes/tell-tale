// @flow
import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Router, Redirect } from '@reach/router'
import { css } from 'emotion'
import { tint } from 'polished'

import { ScrollView, Flex } from './Components'
import { NavBar, PageProvider } from './Components/Layout'
import { BrowseTales } from './Browse/BrowseTales'
import { TalesProvider } from './Browse/TalesContext'
import { CreateTale } from './Create/CreateTale'
import { Profile } from './Profile/Profile'
import { LogIn } from './LogIn/LogIn'
import { Register } from './LogIn/Register'
import { ProfileProvider } from './Profile/ProfileContext'
import { Splash } from './Splash'
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

const App = (props: {}) => {
  const [splashShowing, setSplashShowing] = React.useState(true)
  return (
    <ThemeProvider theme={theme}>
      <PageProvider>
        <TalesProvider>
          <ProfileProvider>
            <ScrollView as={Flex} flexDirection="column" height="100%">
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
            </ScrollView>
            <NavBar />
            {splashShowing && (
              <Splash onComplete={() => setSplashShowing(false)} />
            )}
          </ProfileProvider>
        </TalesProvider>
      </PageProvider>
    </ThemeProvider>
  )
}

export default App
