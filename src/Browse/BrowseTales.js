// @flow
import * as React from 'react'
import { css } from 'emotion'
import { ThemeContext } from '@emotion/core'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

import { Col, Flex, MaxWidthContainer } from '../Components'
import { Page } from '../Components/Layout'
import { Masonry } from '../Components/Masonry'
import { TaleSummary } from './TaleSummary'

const GET_TALES = gql`
  {
    tales {
      title
      description
      paragraphs {
        body
        index
      }
      tags {
        label
      }
    }
  }
`

type Props = {}
const BrowseTales = (props: Props) => {
  const {
    data: { tales },
  } = useQuery(GET_TALES, {
    suspend: false,
  })
  const { breakpoints } = React.useContext(ThemeContext)

  return (
    <Page title="Browse">
      <MaxWidthContainer
        pt={4}
        className={css({
          overflowX: 'hidden',
        })}>
        {tales && (
          <Masonry breakpoints={breakpoints} columns={{ sm: 1, lg: 2, xlg: 3 }}>
            {tales.map(tale => (
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

export { BrowseTales }
