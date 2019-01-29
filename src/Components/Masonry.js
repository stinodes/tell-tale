// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { style } from 'styled-system'
import debounce from 'debounce'
import { Grid, Col } from './Container'

const DEFAULT_COLS = 3

type MasonryConfig = {
  children: React.Node,
  columns: number | number[] | { [string]: number },
}

const useOnResize = (
  fn: () => any,
  { enable, debounce: debounceDur }: { enable: boolean, debounce?: ?number },
) => {
  React.useEffect(
    () => {
      const onResize = fn
      onResize()
      if (enable) {
        window.addEventListener(
          'resize',
          debounceDur ? debounce(onResize, debounceDur) : onResize,
        )
      }

      return () => window.removeEventListener('resize', onResize)
    },
    [enable, debounceDur],
  )
}

const columnContent = style({
  prop: 'content',
  transformValue: val => `"${val}"`,
  cssProperty: 'content',
})
const BPElement = styled('span')({ display: 'none' }, props => ({
  ':before': columnContent(props),
}))

type Props = MasonryConfig

const Masonry = ({ columns: columnsProp, ...props }: Props) => {
  const ref = React.useRef(null)
  const [columns, setColumns] = React.useState(DEFAULT_COLS)
  useOnResize(
    () => {
      const content =
        ref.current && window.getComputedStyle(ref.current, ':before').content
      if (content) setColumns(parseInt(content.replace('"', '')))
    },
    { enable: typeof columnsProp === 'object' },
  )
  // const { columns } = useResponsiveColumns(props)
  const children = React.Children.toArray(props.children)

  console.log(columns)

  const columnGroups = children.reduce(
    (prev, child, i) => ({
      ...prev,
      [i % columns]: [
        ...(prev[i % columns] || []),
        React.cloneElement(child, { width: 1 }),
      ],
    }),
    {},
  )

  return (
    <Grid {...props}>
      <BPElement content={columnsProp} ref={ref} />
      {Object.keys(columnGroups).map(k => (
        <Col width={1 / columns} gutter={'0'} style={{ float: 'left' }}>
          {columnGroups[k]}
        </Col>
      ))}
    </Grid>
  )
}

export { Masonry }
