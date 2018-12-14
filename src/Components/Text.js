// @flow
import styled from '@emotion/styled'
import { color } from 'styled-system'
import withProps from 'recompose/withProps'
import { typography } from './styles'

export const Text = styled('p')(
  color,
  typography,
  {
    padding: 0,
    margin: 0,
  },
  ({ sans, bold }) => ({
    fontWeight: bold ? 'bold' : undefined,
    fontFamily: sans ? 'Montserrat' : 'Cormorant Garamond',
  }),
)
export const H1 = styled(Text.withComponent('h1'))({ fontFamily: 'Montserrat' })
export const H2 = styled(Text.withComponent('h2'))({ fontFamily: 'Montserrat' })
export const H3 = styled(Text.withComponent('h3'))({ fontFamily: 'Montserrat' })
export const TaleTitle = withProps({
  fontSize: 36,
  fontWeight: 'bold',
  color: 'charlestonGreen',
})(H3)