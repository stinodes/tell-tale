// @flow
import * as React from 'react'
import * as firebase from 'firebase/app'
import gql from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo-hooks'
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
  loggedIn: ?boolean,

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

const ADD_USER = gql`
  mutation addUser($user: AddUserInput!) {
    addUser(user: $user) {
      id
    }
  }
`
const GET_ME = gql`
  {
    me {
      pseudonym
      firstName
      lastName
    }
  }
`
const logIn = async ({ email, password }: LogInInfo) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

const createLogIn = async ({
  email,
  password,
}: {
  email: string,
  password: string,
}) => firebase.auth().createUserWithEmailAndPassword(email, password)

const logOut = async () => firebase.auth().signOut()

type Props = {
  children: React.Node,
}
const ProfileProvider = (props: Props) => {
  const [user, setUser] = React.useState()
  const addUser = useMutation(ADD_USER)

  const {
    data: { me: profile },
  } = useQuery(GET_ME, {
    suspend: false,
    variables: { uid: user && user.uid },
  })

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, [])

  const value = {
    logIn,
    register: async ({
      email,
      password,
      confirmPassword,
      ...userInput
    }: RegisterInfo) => {
      await createLogIn({ email, password })
      await firebase.auth().currentUser.getIdToken()
      await addUser({ variables: { user: userInput } })
    },
    logOut,
    profile: profile,
    loggedIn: user === undefined ? null : !!user,
  }

  return <ProfileContext.Provider {...props} value={value} />
}

const useProfileContext = (): Context => React.useContext(ProfileContext)
const useProfile = (): ?Profile => useProfileContext().profile
const useIsLoggedIn = (): ?boolean => useProfileContext().loggedIn

export { useProfileContext, useProfile, useIsLoggedIn, ProfileProvider }
