// @flow
import * as React from 'react'
import { css } from 'emotion'
import { Link } from '@reach/router'
import {
  Flex,
  Text,
  TaleTitle,
  Box,
  Body,
  Icon,
  IconButton,
} from '../Components'
import { Tag } from './Tag'
import type { Tale } from 'tell-tale'

type Props = {
  tale: Tale,
  height?: number,
}
export const TaleSummary = ({ tale, height = 256 }: Props) => {
  return (
    <Flex flexDirection="column" position="relative" bg="white">
      <Flex px={5} py={3}>
        <TaleTitle summary>{tale.title}</TaleTitle>
      </Flex>
      <Flex
        flexDirection="column"
        flex={1}
        maxHeight={height}
        className={css({
          overflow: 'hidden',
        })}>
        {tale.description ? (
          <Box px={5} pt={2}>
            <Body summary>{tale.description}</Body>
          </Box>
        ) : (
          tale.paragraphs.map(({ body }, i) => (
            <Box px={5} pt={2}>
              <Body summary>{body}</Body>
            </Box>
          ))
        )}
      </Flex>
      <Flex px={5} height={64} justifyContent="space-between">
        <Flex alignItems="center" flex={1}>
          {tale.tags ? (
            tale.tags.map(({ label }) => (
              <Flex mr={1}>
                <Tag>{label}</Tag>
              </Flex>
            ))
          ) : (
            <Text color="lapisLazuliLight">No tags selected</Text>
          )}
        </Flex>
        <Flex alignItems="center">
          <IconButton
            to={`/tales/${tale.title}`}
            as={Link}
            width={40}
            height={40}
            justifyContent="center"
            alignItems="center"
            bg="transparent">
            <Icon
              icon={Icon.ICONS.CornerDownRight}
              size={32}
              color="lapisLazuliLight"
            />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  )
}
