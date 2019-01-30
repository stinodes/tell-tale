// @flow
import * as React from 'react'
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
  return (
    <Flex flexDirection="column" position="relative" alignSelf="stretch">
      <Outline>
        <Field
          component={TitleInput}
          name="title"
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
