// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

jest.mock('firebase/app')
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
