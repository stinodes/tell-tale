// @flow
import * as React from 'react'
import * as firebase from 'firebase/app'
import type { Profile } from 'tell-tale'

type LogInInfo = {
  email: string,
  password: string,
}

type RegisterInfo = {
  pseudonym: ?string,
  firstName: ?string,
  lastName: ?string,
  email: string,
  password: string,
}
type Context = {
  profile: ?Profile,
  loggedIn: boolean,

  logIn: LogInInfo => Promise<void>,
  register: RegisterInfo => Promise<void>,
  logOut: () => Promise<void>,
}
const ProfileContext = React.createContext<Context>({
  profile: null,
  loggedIn: false,
  logIn: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
})

const api = {
  logIn: async ({ email, password }: LogInInfo) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  },
  register: async ({ email, password }: RegisterInfo) => {
    console.log('registering')
    await firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  logOut: async () => {
    await firebase.auth().signOut()
  },
}

type Props = {
  children: React.Node,
}
const ProfileProvider = (props: Props) => {
  const [profile, setProfile] = React.useState(null)
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      setProfile(user)
    })
  }, [])
  const value = {
    ...api,
    profile,
    loggedIn: !!profile,
  }
  return <ProfileContext.Provider {...props} value={value} />
}

const useProfileContext = (): Context => React.useContext(ProfileContext)
const useProfile = (): ?Profile => useProfileContext().profile

export { useProfileContext, useProfile, ProfileProvider }
