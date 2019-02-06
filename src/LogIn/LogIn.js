// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { Redirect } from '@reach/router'
import { space } from 'styled-system'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import { Page } from '../Components/Layout'
import {
  H3,
  Flex,
  asField,
  Outline,
  Button,
  Text,
  Card,
  Icon,
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
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
})

type Props = {}
const LogIn = (props: Props) => {
  const { logIn, loggedIn } = useProfileContext()

  return (
    <Page title="Log In">
      {loggedIn && <Redirect from="log-in" to="profile" noThrow />}
      <Formik validationSchema={validationSchema} onSubmit={logIn}>
        {({ handleSubmit, errors, touched }) => (
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
                  Welcome back!
                </H3>
              </Flex>
              <Outline
                outline={touched.email && errors.email ? 'error' : undefined}>
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
              <Outline
                outline={
                  touched.password && errors.password ? 'error' : undefined
                }>
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
              <Button type="submit" bg="transparent" px={5} py={4}>
                <Text
                  sans
                  color="lapisLazuliLight"
                  fontWeight="600"
                  fontSize={20}
                  textAlign="center">
                  Log In
                </Text>
              </Button>
              <Button bg="transparent" px={5} py={4} to="/register">
                <Text
                  sans
                  color="lapisLazuliLight"
                  fontWeight="600"
                  fontSize={20}
                  textAlign="center">
                  Or Register Instead!
                </Text>
              </Button>
            </Flex>
          </Flex>
        )}
      </Formik>
    </Page>
  )
}

export { LogIn }
