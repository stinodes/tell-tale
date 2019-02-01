// @flow
import * as React from 'react'
import { update, insert, remove, splitAt, prop } from 'ramda'
import { space } from 'styled-system'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { withFormik, Field } from 'formik'
import {
  Flex,
  TaleTitle,
  Body,
  Outline,
  TextArea,
  asField,
  Button,
  Absolute,
  Text,
  Icon,
  Opacity,
} from '../Components'
import type { FormikProps } from 'formik'
import type { Tale } from 'tell-tale'

const Keys = {
  BACKSPACE: 8,
  ENTER: 13,
}

const TitleInput = asField(
  styled(TaleTitle.withComponent('input'))(
    { border: 'none', outline: 'none', width: '100%' },
    space,
  ),
)
const ParagraphInput = asField(
  styled(Body.withComponent(TextArea))(
    {
      border: 'none',
      outline: 'none',
      overflow: 'hidden',
      width: '100%',
      backgroundColor: 'transparent',
      resize: 'none',
    },
    space,
  ),
)

type Props = FormikProps<Tale> & {}

const TaleForm = ({
  values: { paragraphs },
  setFieldValue,
  handleSubmit,
}: Props) => {
  const [paragraphFocus, setParagraphFocus] = React.useState({
    index: null,
    position: null,
  })
  const { current: inputRefs } = React.useRef(([]: Array<HTMLInputElement>))

  React.useEffect(
    () => {
      const { index, position } = paragraphFocus
      const paragraph = prop(index, inputRefs)
      if (
        typeof index === 'number' &&
        typeof position === 'number' &&
        paragraph
      ) {
        paragraph.focus()
        setTimeout(() => paragraph.setSelectionRange(position, position), 100)
      }
    },
    [paragraphFocus, prop(paragraphFocus.index, inputRefs)],
  )

  const addParagraph = (
    e: SyntheticKeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const selectionStart: number = (e.target: any).selectionStart

    const [body1, body2] = splitAt(selectionStart, paragraphs[index].body)

    const newParagraphs = update(
      index,
      { body: body1 },
      insert(index + 1, { body: body2, id: Math.random() }, paragraphs),
    )

    setFieldValue('paragraphs', newParagraphs)

    setParagraphFocus({ index: index + 1, position: 0 })
  }
  const removeParagraph = (
    e: ?SyntheticKeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const previousParagraph = prop(index - 1, paragraphs)
    setFieldValue('paragraphs', remove(index, 1, paragraphs))
    setParagraphFocus({
      index: index - 1,
      position: previousParagraph.body.length,
    })
  }

  const onKeyDown = (
    e: SyntheticKeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.keyCode === Keys.ENTER && !e.shiftKey) {
      e.preventDefault()
      addParagraph(e, index)
    }

    if (
      e.keyCode === Keys.BACKSPACE &&
      !paragraphs[index].body &&
      index !== 0
    ) {
      e.preventDefault()
      removeParagraph(e, index)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection="column" position="relative" alignSelf="stretch">
        <Outline>
          <Field
            component={TitleInput}
            name="title"
            id="tale-title"
            placeholder="Title"
            px={5}
            py={3}
          />
        </Outline>
        {paragraphs.map((paragraph, index) => (
          <Outline
            flex={1}
            render={focused =>
              index !== 0 && (
                <Absolute
                  display={{ sm: 'block', lg: 'none' }}
                  right={0}
                  top={0}
                  className={css({
                    transform: 'translate-x(100%)',
                  })}>
                  <Opacity opacity={focused ? 0.5 : 0} hover={focused ? 1 : 0}>
                    <Button
                      type="button"
                      noOutline
                      tabIndex={-1}
                      width={32}
                      height={32}
                      bg="transparent"
                      onClick={() => removeParagraph(null, index)}>
                      <Icon
                        color="lapisLazuliLight"
                        icon={Icon.ICONS.X}
                        size={28}
                      />
                    </Button>
                  </Opacity>
                </Absolute>
              )
            }>
            <Field
              px={5}
              py={3}
              component={ParagraphInput}
              name={`paragraphs[${index}].body`}
              placeholder="Write your paragraph..."
              inputRef={input => inputRefs && (inputRefs[index] = input)}
              onKeyDown={e => onKeyDown(e, index)}
            />
          </Outline>
        ))}
        <Button type="submit" px={5} py={4} bg="transparent">
          <Text sans color="lapisLazuliLight" fontSize={20} fontWeight="600">
            Create Tale
          </Text>
        </Button>
      </Flex>
    </form>
  )
}

const WithFormikTaleForm = withFormik({
  mapPropsToValues: ({ tale }) => {
    if (!tale) {
      return {
        paragraphs: [{ body: '' }],
      }
    }
    return tale
  },
  handleSubmit: async (values, { setSubmitting, props: { handleSubmit } }) => {
    await handleSubmit(values)
    setSubmitting(false)
  },
})(TaleForm)

export { WithFormikTaleForm as TaleForm }
