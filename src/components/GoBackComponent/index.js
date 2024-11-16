import React from 'react'
import RowComponent from '../RowComponent'

import SpaceComponent from '../SpaceComponent'
import GoBackIcon from './GoBackIcon'

const GoBackComponent = ({ height, size, color, style, paddingLeft, marginLeft }) => {
  return (
    <RowComponent alignItems style={[{ marginLeft, paddingLeft }, style]}>
      <GoBackIcon size={size} color={color} />
      <SpaceComponent height={height ?? 48} />
    </RowComponent>
  )
}

export default GoBackComponent
