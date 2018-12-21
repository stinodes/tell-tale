// @flow
import * as React from 'react'
import { Flex } from '../Components'
import { TaleForm } from './TaleForm'

type Props = {}

const CreateTale = (props: Props) => {
  return (
    <Flex maxWidth={1200} m="auto" flexDirection="column">
      <TaleForm tale={null} />
    </Flex>
  )
}

export { CreateTale }
