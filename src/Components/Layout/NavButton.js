// @flow
import * as React from 'react'
import { IconButton } from '../Icons'

const BackButton = () => {
  return (
    <IconButton
      icon={IconButton.ICONS.ChevronLeft}
      onClick={() => window.history.back()}
    />
  )
}

export { BackButton }
