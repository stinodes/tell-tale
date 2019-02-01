// @flow
import * as React from 'react'
import { css } from 'emotion'
import { ThemeContext } from '@emotion/core'
import { useTales } from './TalesContext'
import { Col, Flex } from '../Components'
import { Page } from '../Components/Layout'
import { Masonry } from '../Components/Masonry'
import { TaleSummary } from './TaleSummary'

type Props = {}
const BrowseTales = (props: Props) => {
  const tales = useTales()
  const { breakpoints } = React.useContext(ThemeContext)
  return (
    <Page title="Browse">
      <Flex
        className={css({
          overflowX: 'hidden',
        })}
        maxWidth={1640}
        pt={4}
        px={{ sm: 6, md: 140 }}
        mx="auto">
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
      </Flex>
    </Page>
  )
}

export { BrowseTales }
