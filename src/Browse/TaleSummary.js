// @flow
import * as React from 'react'
import { css } from 'emotion'
import styled from '@emotion/styled'
import moment from 'moment'
import { Flex, Text, TaleTitle, Absolute, Box } from '../Components'
import type { Tale } from 'tell-tale'

const AvatarCircle = styled(Box)(
  {
    height: 30,
    width: 30,
    borderRadius: 32 * 0.5,
    border: 'white 1px solid',
  },
  ({ index }) => ({
    transform: `translateX(${32 * 0.5 * index}px)`,
  }),
)

type Props = {
  tale: Tale,
  height?: number,
}
export const TaleSummary = ({ tale, height = 560 }: Props) => {
  return (
    <Flex flexDirection="column" height={height} position="relative">
      <TaleTitle>{tale.title}</TaleTitle>
      <Flex
        flexDirection="column"
        flex={1}
        className={css({
          overflow: 'hidden',
        })}>
        {tale.paragraphs.map(({ body }, i) => (
          <Box mb={i < tale.paragraphs.length - 1 ? 4 : 0}>
            <Text textAlign="justify" fontSize={18} color="charlestonGreen">
              {body}
            </Text>
          </Box>
        ))}
      </Flex>
      <Absolute
        bottom={0}
        left={0}
        right={0}
        height={96}
        className={css({
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(transparent 0%, white 40%)',
        })}>
        <Flex flex={1} />
        <Flex h={64} flexDirection="row" justifyContent="space-between">
          <Flex py={4}>
            <Text sans fontSize={16} color="charlestonGreen">
              edited: {moment(tale.lastEdit).format('DD MMM, HH:mm')}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Flex
              height={32}
              width={100}
              justifyContent="flex-end"
              flexDirection="reverse-row">
              {tale.contributors.map((contributor, i, arr) => (
                <AvatarCircle bg="charlestonGreen" index={arr.length - 1 - i} />
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex bg="charlestonGreen" height={1} width={120} alignSelf="center" />
      </Absolute>
    </Flex>
  )
}
