// @flow
import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Router, Redirect } from '@reach/router'
import { css } from 'emotion'

import { ScrollView, Flex } from './Components'
import { NavBar, PageProvider } from './Components/Layout'
import { BrowseTales } from './Browse/BrowseTales'
import { CreateTale } from './Create/CreateTale'
import { Splash } from './Splash'
import './App.css'

const theme = {
  breakpoints: { sm: 0, md: '40em', lg: '64em', xlg: '80em' },
  space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  colors: {
    white: '#FFFFFF',
    blackCoral: '#566570',
    lapisLazuliLight: '#0091D6',
  },
}

const App = (props: {}) => {
  const [splashShowing, setSplashShowing] = React.useState(true)
  return (
    <ThemeProvider theme={theme}>
      <PageProvider>
        <ScrollView as={Flex} flexDirection="column" height="100%">
          <div className={css({ paddingBottom: 80 })}>
            <Router>
              <Redirect noThrow from="/" to="browse" />
              <BrowseTales path="browse" />
              <CreateTale path="create" />
            </Router>
          </div>
        </ScrollView>
        <NavBar />
        {splashShowing && <Splash onComplete={() => setSplashShowing(false)} />}
      </PageProvider>
    </ThemeProvider>
  )
}

export default App
