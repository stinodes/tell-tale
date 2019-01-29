// @flow
import * as React from 'react'
import { css } from 'emotion'
import { ThemeContext } from '@emotion/core'
import { Grid, Col, Flex } from '../Components'
import { Page } from '../Components/Layout'
import { Masonry } from '../Components/Masonry'
import { TaleSummary } from './TaleSummary'
import type { Tale } from 'tell-tale'

const initialTales: Tale[] = [
  {
    title: 'My first story',
    description: null,
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [{ label: 'fantasy' }, { label: 'amateur' }],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },
  {
    title: 'My first story',
    description:
      'A summary of Lorem Ipsum text. This has been copied from Google, and is not an actual story. Please do not hate me for being lazy and stuff.',
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [{ label: 'drama' }, { label: 'solo' }],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },
  {
    title: 'My first story',
    description:
      'A summary of Lorem Ipsum text. This has been copied from Google, and is not an actual story. Please do not hate me for being lazy and stuff. A summary of Lorem Ipsum text. This has been copied from Google, and is not an actual story. Please do not hate me for being lazy and stuff.',
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [{ label: 'first' }, { label: 'historical' }],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },
  {
    title: 'My first story',
    description: null,
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [
      { label: 'professional' },
      { label: 'romance' },
      { label: 'comedy' },
    ],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },

  {
    title: 'My first story',
    description: null,
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [{ label: 'fantasy' }, { label: 'amateur' }],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },
  {
    title: 'My first story',
    description:
      'A summary of Lorem Ipsum text. This has been copied from Google, and is not an actual story. Please do not hate me for being lazy and stuff.',
    paragraphs: [
      { body: 'Where does it come from?' },
      {
        body: `
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of “de Finibus Bonorum et Malorum” (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, “Lorem ipsum dolor sit amet..”, comes from a line in section 1.10.32.
`,
      },
      {
        body: `
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
`,
      },
    ],
    tags: [{ label: 'drama' }, { label: 'solo' }],
    lastEdit: Date.now(),
    contributors: [{}, {}],
  },
]

type Props = {}
const BrowseTales = (props: Props) => {
  const [tales, setTales] = React.useState(initialTales)
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
        {/* <Grid
          masonry
          gutter={{
            lg: 4,
          }}>
          {tales.map(tale => (
            <Col
              gutter={{
                lg: 4,
              }}
              width={{
                sm: 1,
                lg: 1 / 2,
                xlg: 1 / 3,
              }}
              mb={5}>
              <TaleSummary tale={tale} />
            </Col>
          ))}
        </Grid> */}
      </Flex>
    </Page>
  )
}

export { BrowseTales }
