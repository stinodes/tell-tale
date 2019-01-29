// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { Text, TaleTitle } from '../Text'
import { outline } from '../styles'

const withInputStyles = <Props>(Component: React.ComponentType<Props>) =>
  styled(Component)(outline(), {
    border: 'none',
  })

const TextInput = withInputStyles(Text.withComponent('input'))
const TitleInput = withInputStyles(TaleTitle.withComponent('input'))

export { TextInput, TitleInput }
