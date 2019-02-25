import React from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const config = {
  apiKey: 'AIzaSyDB5zAcQRjBzTao96QZGcCeXJk0dwf4XHo',
  authDomain: 'tell-tale-4f929.firebaseapp.com',
  databaseURL: 'https://tell-tale-4f929.firebaseio.com',
  projectId: 'tell-tale-4f929',
  storageBucket: 'tell-tale-4f929.appspot.com',
  messagingSenderId: '489301500756',
}
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
