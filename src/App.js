// @flow
import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { NavBar } from './Components/Layout'
import { Router } from '@reach/router'
import { css } from 'emotion'
import { BrowseTales } from './Browse/BrowseTales'
import { Splash } from './Splash'
import './App.css'

const theme = {
  space: [0, 4, 8, 16, 24, 32, 48, 64, 128, 256, 512],
  colors: {
    white: '#FFFFFF',
    charlestonGreen: '#272D2D',
    blackCoral: '#59656F',
    plumpPurple: '#5F4BB6',
  },
}

const App = (props: {}) => {
  const [splashShowing, setSplashShowing] = React.useState(true)
  return (
    <ThemeProvider theme={theme}>
      <div className={css({ paddingTop: 180 })}>
        <Router>
          <BrowseTales path="browse" />
        </Router>
      </div>
      <NavBar />
      {splashShowing && <Splash onComplete={() => setSplashShowing(false)} />}
    </ThemeProvider>
  )
}

export default App
