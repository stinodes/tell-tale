// @flow
import * as React from 'react'
import { navigate } from '@reach/router'
import uuid from 'uuid/v4'
import { useTalesContext } from '../Browse/TalesContext'
import { Flex } from '../Components'
import { Page } from '../Components/Layout'
import { TaleForm } from './TaleForm'

type Props = {}

const CreateTale = (props: Props) => {
  const { addTale } = useTalesContext()
  return (
    <Page title="Create">
      <Flex
        maxWidth={1200}
        px={{ sm: 5, md: 8 }}
        pt={6}
        m="auto"
        flexDirection="column">
        <TaleForm
          tale={null}
          handleSubmit={values => {
            addTale({ ...values, id: uuid() })
            navigate('/browse')
          }}
        />
      </Flex>
    </Page>
  )
}

export { CreateTale }
