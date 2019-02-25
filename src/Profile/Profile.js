// @flow
import * as React from 'react'
import { Redirect } from '@reach/router'
import { ThemeContext } from '@emotion/core'
import styled from '@emotion/styled'
import { Formik, Field, Form } from 'formik'
import { space } from 'styled-system'
import { useProfileContext } from './ProfileContext'
import {
  Text,
  Flex,
  H3,
  Masonry,
  Divider,
  Col,
  Absolute,
  MaxWidthContainer,
  asField,
  TextArea,
  IconButton,
  Outline,
} from '../Components'
import { errorOutline } from '../utils/forms'
import { TaleSummary } from '../Browse/TaleSummary'
import { Page } from '../Components/Layout'
import type { Profile as ProfileType } from 'tell-tale'

const Input = asField(
  styled(Text.withComponent('input'))(
    {
      border: 'none',
      borderWidth: 0,
      outline: 'none',
      width: '100%',
      resize: 'none',
    },
    { '::placeholder': { opacity: 0.6, color: 'inherit' } },
    space,
  ),
)

type Props = {}
const Profile = (props: Props) => {
  const [isEditing, setEditing] = React.useState(false)
  const { loggedIn, profile, editProfile } = useProfileContext()
  const { breakpoints } = React.useContext(ThemeContext)

  if (!loggedIn) return <Redirect from="profile" to="log-in" noThrow />
  if (!profile) return null

  return (
    <Page title="Profile">
      <Formik
        initialValues={(profile: any)}
        onSubmit={async ({ tales, __typename, ...profile }: ProfileType) => {
          console.log(profile)
          await editProfile(profile)
          setEditing(false)
        }}>
        {({ errors, touched, handleSubmit, isSubmitting }) => (
          <MaxWidthContainer pt={4}>
            <Flex as={Form} position="relative">
              <Flex flex={1} flexDirection="column">
                {isEditing ? (
                  <Outline
                    outline={errorOutline('pseudonym', {
                      errors,
                      touched,
                    })}>
                    <Field
                      component={Input}
                      name="pseudonym"
                      id="pseudonym"
                      placeholder="Psuedonym"
                      sans
                      textAlign="center"
                      color="blackCoral"
                      fontSize={40}
                      fontWeight="800"
                      px={5}
                      py={3}
                    />
                  </Outline>
                ) : (
                  <Flex
                    style={{
                      border: '1.5px solid transparent',
                    }}
                    px={5}
                    py={3}
                    justifyContent="center">
                    <H3
                      textAlign="center"
                      color="blackCoral"
                      fontSize={40}
                      fontWeight="800">
                      {profile.pseudonym ||
                        `${profile.firstName} ${profile.lastName}`}
                    </H3>
                  </Flex>
                )}
                {profile.firstName && (
                  <Flex flexDirection="row">
                    <Flex flex={1} flexDirection="column">
                      {isEditing ? (
                        <Outline
                          outline={errorOutline('firstName', {
                            errors,
                            touched,
                          })}>
                          <Field
                            component={Input}
                            name="firstName"
                            id="first-name"
                            placeholder="First name"
                            sans
                            textAlign="right"
                            color="blackCoral"
                            fontSize={24}
                            fontWeight="600"
                            px={5}
                            py={3}
                          />
                        </Outline>
                      ) : (
                        <Flex
                          style={{
                            border: '1.5px solid transparent',
                          }}
                          px={5}
                          py={3}
                          flexDirection="column">
                          <Text
                            sans
                            textAlign="right"
                            color="blackCoral"
                            fontSize={24}
                            fontWeight="600">
                            {profile.firstName}
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                    <Flex flex={1} flexDirection="column">
                      {isEditing ? (
                        <Outline
                          outline={errorOutline('firstName', {
                            errors,
                            touched,
                          })}>
                          <Field
                            component={Input}
                            name="lastName"
                            id="last-name"
                            placeholder="Last name"
                            sans
                            textAlign="left"
                            color="blackCoral"
                            fontSize={24}
                            fontWeight="600"
                            px={5}
                            py={3}
                          />
                        </Outline>
                      ) : (
                        <Flex
                          style={{
                            border: '1.5px solid transparent',
                          }}
                          px={5}
                          py={3}
                          flexDirection="column">
                          <Text
                            sans
                            textAlign="left"
                            color="blackCoral"
                            fontSize={24}
                            fontWeight="600">
                            {profile.lastName}
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                )}

                {isEditing ? (
                  <Outline
                    outline={errorOutline('bio', {
                      errors,
                      touched,
                    })}>
                    <Field
                      component={Input}
                      as={TextArea}
                      name="bio"
                      id="bio"
                      placeholder="Your bio"
                      color="blackCoral"
                      fontSize={18}
                      px={5}
                      py={3}
                      textAlign="center"
                    />
                  </Outline>
                ) : (
                  profile.bio && (
                    <Flex
                      style={{
                        border: '1.5px solid transparent',
                      }}
                      px={5}
                      py={3}
                      flexDirection="column">
                      <Text color="blackCoral" fontSize={18} textAlign="center">
                        {profile.bio}
                      </Text>
                    </Flex>
                  )
                )}

                <Absolute top={0} right={0} py={4}>
                  <Flex flexDirection="row">
                    {isEditing ? (
                      isSubmitting ? (
                        `...`
                      ) : (
                        <>
                          <IconButton
                            type="submit"
                            key="submit"
                            icon={IconButton.ICONS.Check}
                          />
                          <IconButton
                            type="button"
                            key="cancel"
                            onClick={() => setEditing(false)}
                            icon={IconButton.ICONS.X}
                          />
                        </>
                      )
                    ) : (
                      <IconButton
                        key="edit"
                        onClick={() => setEditing(true)}
                        icon={IconButton.ICONS.Edit}
                      />
                    )}
                  </Flex>
                </Absolute>

                <Divider horizontal opacity={0.1} bg="blackCoral" />
              </Flex>
            </Flex>
          </MaxWidthContainer>
        )}
      </Formik>
      <MaxWidthContainer>
        {profile.tales && (
          <Masonry breakpoints={breakpoints} columns={{ sm: 1, lg: 2, xlg: 3 }}>
            {profile.tales.map(tale => (
              <Col
                gutter={{
                  lg: 4,
                }}
                mb={5}>
                <TaleSummary tale={tale} />
              </Col>
            ))}
          </Masonry>
        )}
      </MaxWidthContainer>
    </Page>
  )
}

export { Profile }
