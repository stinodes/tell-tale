// @flow
import * as React from 'react'
import { space } from 'styled-system'
import styled from '@emotion/styled'
import { withFormik, Field, Formik } from 'formik'
import { Flex, TaleTitle, Body, outline, Outline } from '../Components'
import type { FormikProps } from 'formik'
import type { Tale } from 'tell-tale'

const TitleInput = styled(TaleTitle.withComponent('input'))(
  { border: 'none', outline: 'none' },
  outline(),
  space,
)
const ParagraphInput = styled(Body.withComponent('textarea'))(
  { border: 'none', outline: 'none' },
  outline(),
  space,
)

type Props = FormikProps<Tale> & {}

const TaleForm = ({  }: Props) => {
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
    </Flex>
  )
}

const WithFormikTaleForm = withFormik({
  mapPropsToValues: ({ tale }) => tale,
  handleSubmit: async (values, { setSubmitting, props: { handleSubmit } }) => {
    await handleSubmit(values)
    setSubmitting(false)
  },
})(TaleForm)

export { WithFormikTaleForm as TaleForm }
