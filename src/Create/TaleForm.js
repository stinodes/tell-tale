// @flow
import * as React from 'react'
import { update, insert, remove, splitAt } from 'ramda'
import { space, height } from 'styled-system'
import styled from '@emotion/styled'
import { withFormik, Field, Formik } from 'formik'
import {
  Flex,
  TaleTitle,
  Body,
  outline,
  Outline,
  TextArea,
  asField,
  Box,
} from '../Components'
import type { FormikProps } from 'formik'
import type { Tale } from 'tell-tale'

const TitleInput = asField(
  styled(TaleTitle.withComponent('input'))(
    { border: 'none', outline: 'none' },
    outline(),
    space,
  ),
)
const ParagraphInput = asField(
  styled(Body.withComponent(TextArea))({
    border: 'none',
    outline: 'none',
    overflow: 'hidden',
    width: '100%',
  }),
)

type Props = FormikProps<Tale> & {}

const TaleForm = ({ values: { paragraphs }, setFieldValue }: Props) => {
  const [paragraphFocus, setParagraphFocus] = React.useState({
    index: null,
    position: null,
  })
  const { current: inputRefs } = React.useRef(([]: Array<HTMLInputElement>))

  React.useEffect(
    () => {
      const { index, position } = paragraphFocus
      if (inputRefs[index]) {
        inputRefs[index].focus()
        inputRefs[index].setSelectionRange(position, 0)
      }
    },
    [paragraphFocus, inputRefs[paragraphFocus]],
  )

  const onKeyDown = (e: Event, index: number) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()

      const [body1, body2] = splitAt(
        e.target.selectionStart,
        paragraphs[index].body,
      )

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
      setFieldValue('paragraphs', remove(index, 1, paragraphs))
      setParagraphFocus({
        index: index - 1,
        position: paragraphs[index].body.length,
      })
    }
  }

  return (
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
        <Outline px={5} py={3}>
          <Field
            component={ParagraphInput}
            name={`paragraphs[${index}].body`}
            placeholder="Write your paragraph..."
            inputRef={input => (inputRefs[index] = input)}
            onKeyDown={e => onKeyDown(e, index)}
          />
        </Outline>
      ))}
    </Flex>
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
