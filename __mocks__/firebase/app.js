// @flow

const auth = () => ({
  signInWithEmailAndPassword: () => Promise.resolve(),
  createUserWithEmailAndPassword: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
  onAuthStateChanged: () => {},
})

module.exports = { auth }
