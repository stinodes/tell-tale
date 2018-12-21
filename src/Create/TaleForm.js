// @flow
import * as React from 'react'
import { withFormik, Field } from 'formik'
import { Flex, TitleInput } from '../Components'
import type { FormikProps } from 'formik'
import type { Tale } from 'tell-tale'

type Props = FormikProps<Tale> & {}

const TaleForm = ({ values, onChange }: Props) => {
  return (
    <Flex flexDirection="column" position="relative" alignSelf="stretch">
      <Field component={TitleInput} name="title" placeholder="Title" />
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
