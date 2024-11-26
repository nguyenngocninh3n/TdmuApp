import React from 'react'
import RowComponent from '../RowComponent'

import SpaceComponent from '../SpaceComponent'
import GoBackIcon from './GoBackIcon'
import { Text } from 'react-native'

const GoBackComponent = ({
  height,
  title,
  size,
  color,
  style,
  paddingLeft,
  marginLeft,
  children,
  borderWidth,
  borderColor,
  bgColor,
  textColor
}) => {
  return (
    <RowComponent
      alignItems
      
      style={[
        { backgroundColor:bgColor, marginLeft, paddingLeft, borderBottomColor: borderColor, borderBottomWidth: borderWidth },
        style
      ]}
    >
      <GoBackIcon size={size} color={color} />
      <SpaceComponent height={height ?? 48} />

      {title && (
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '500',
            flex: 1,
            color: textColor ?? '#000',
            fontSize: 20,
            marginRight: 24
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </RowComponent>
  )
}

export default GoBackComponent
