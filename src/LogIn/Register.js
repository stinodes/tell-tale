// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { Redirect } from '@reach/router'
import { space } from 'styled-system'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import { errorOutline } from '../utils/forms'
import { Page } from '../Components/Layout'
import {
  H3,
  Flex,
  asField,
  Outline,
  Button,
  Text,
  Divider,
} from '../Components'
import { useProfileContext } from '../Profile/ProfileContext'

const Input = asField(
  styled(Text.withComponent('input'))(
    {
      border: 'none',
      outline: 'none',
      width: '100%',
      backgroundColor: 'transparent',
    },
    { '::placeholder': { opacity: 0.6, color: 'inherit' } },
    ({ theme: { colors } }) => ({ color: colors.blackCoral }),
    space,
  ),
)

const validationSchema = Yup.object({
  pseudonym: Yup.string().when(['firstName', 'lastName'], {
    is: (firstName, lastName) => !firstName && !lastName,
    then: s => s.required(),
  }),
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required(),
})

type Props = {}
const Register = (props: Props) => {
  const { register, loggedIn } = useProfileContext()

  return (
    <Page title="Register">
      {loggedIn && <Redirect from="register" to="profile" noThrow />}
      <Formik validationSchema={validationSchema} onSubmit={register}>
        {({ touched, errors, handleSubmit }) => (
          <Flex
            as="form"
            onSubmit={handleSubmit}
            flex={1}
            justifyContent="center"
            flexDirection="column"
            alignItems="center">
            <Flex
              width={{ sm: 1, md: 0.8, lg: 560 }}
              p={5}
              flexDirection="column">
              <Flex px={5} py={3}>
                <H3 color="blackCoral" fontSize={24}>
                  Nice meeting you!
                </H3>
              </Flex>
              <Outline
                outline={errorOutline('pseudonym', {
                  errors,
                  touched,
                })}>
                <Field
                  sans
                  component={Input}
                  placeholder="Pseudonym"
                  name="pseudonym"
                  fontWeight="600"
                  fontSize={18}
                  px={5}
                  py={3}
                />
              </Outline>
              <Flex px={5} py={3}>
                <Text sans fontWeight="700" fontSize={14} color="blackCoral">
                  And / Or
                </Text>
              </Flex>
              <Flex flexDirection="row">
                <Outline
                  outline={errorOutline('firstName', {
                    errors,
                    touched,
                  })}>
                  <Field
                    sans
                    component={Input}
                    placeholder="First name"
                    name="firstName"
                    fontWeight="600"
                    fontSize={18}
                    px={5}
                    py={3}
                  />
                </Outline>
                <Outline
                  outline={errorOutline('lastName', {
                    errors,
                    touched,
                  })}>
                  <Field
                    sans
                    component={Input}
                    placeholder="Last name"
                    name="lastName"
                    fontWeight="600"
                    fontSize={18}
                    px={5}
                    py={3}
                  />
                </Outline>
              </Flex>

              <Divider
                alignSelf="flex-start"
                width={200}
                horizontal
                my={5}
                mx={5}
                bg="blackCoral"
              />

              <Outline
                outline={errorOutline('email', {
                  errors,
                  touched,
                })}>
                <Field
                  sans
                  component={Input}
                  placeholder="E-mail address"
                  name="email"
                  type="email-address"
                  fontWeight="600"
                  fontSize={18}
                  px={5}
                  py={3}
                />
              </Outline>
              <Outline outline={errorOutline('password', { errors, touched })}>
                <Field
                  sans
                  component={Input}
                  placeholder="Password"
                  name="password"
                  type="password"
                  fontWeight="600"
                  fontSize={18}
                  px={5}
                  py={3}
                />
              </Outline>

              <Outline
                outline={errorOutline('confirmPassword', { errors, touched })}>
                <Field
                  sans
                  component={Input}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  type="password"
                  fontWeight="600"
                  fontSize={18}
                  px={5}
                  py={3}
                />
              </Outline>
              <Button type="submit" bg="transparent" px={5} py={4}>
                <Text
                  sans
                  color="lapisLazuliLight"
                  fontWeight="600"
                  fontSize={20}
                  textAlign="center">
                  Register
                </Text>
              </Button>

              <Button bg="transparent" px={5} py={4} to="/log-in">
                <Text
                  sans
                  color="lapisLazuliLight"
                  fontWeight="600"
                  fontSize={20}
                  textAlign="center">
                  Or Log In Instead!
                </Text>
              </Button>
            </Flex>
          </Flex>
        )}
      </Formik>
    </Page>
  )
}

export { Register }
