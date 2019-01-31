// @flow
import * as React from 'react'
import { update, insert, remove, splitAt, prop } from 'ramda'
import { space } from 'styled-system'
import styled from '@emotion/styled'
import { withFormik, Field } from 'formik'
import {
  Flex,
  TaleTitle,
  Body,
  outline,
  Outline,
  TextArea,
  asField,
  Button,
  Text,
} from '../Components'
import type { FormikProps } from 'formik'
import type { Tale } from 'tell-tale'

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

  const onKeyDown = (
    e: SyntheticKeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()

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

    if (e.keyCode === 8 && !paragraphs[index].body && index !== 0) {
      e.preventDefault()
      const paragraph = prop(index, paragraphs)
      const previousParagraph = prop(index - 1, paragraphs)
      setFieldValue('paragraphs', remove(index, 1, paragraphs))
      setParagraphFocus({
        index: index - 1,
        position: previousParagraph.body.length,
      })
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
          <Outline>
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
