// @flow
import * as React from 'react'
import { Flex } from '../Components'
import { Page } from '../Components/Layout'
import { TaleForm } from './TaleForm'

type Props = {}

const CreateTale = (props: Props) => {
  return (
    <Page title="Create">
      <Flex maxWidth={1200} m="auto" flexDirection="column">
        <TaleForm tale={null} />
      </Flex>
    </Page>
  )
}

export { CreateTale }
