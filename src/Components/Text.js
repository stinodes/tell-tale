// @flow
import styled from '@emotion/styled'
import { color } from 'styled-system'
import { typography } from './styles'

export const Text = styled('p')(
  color,
  typography,
  { whiteSpace: 'pre-wrap', padding: 0, margin: 0 },
  ({ sans, bold, fontWeight }) => ({
    fontFamily: sans ? 'Montserrat' : 'Roboto Slab',
  }),
)
export const Body = styled(Text)(
  {
    fontWeight: '300',
  },
  ({ theme: { colors, space }, summary }) => ({
    color: colors.blackCoral,
    fontSize: summary ? 18 : 24,
  }),
)
export const H1 = styled(Text.withComponent('h1'))({ fontFamily: 'Montserrat' })
export const H2 = styled(Text.withComponent('h2'))({ fontFamily: 'Montserrat' })
export const H3 = styled(Text.withComponent('h3'))({ fontFamily: 'Montserrat' })

export const TaleTitle = styled(H3)(
  {
    fontWeight: '600',
  },
  ({ theme: { space, colors }, summary }) => ({
    fontSize: summary ? 24 : 40,
    color: colors.blackCoral,
  }),
)
