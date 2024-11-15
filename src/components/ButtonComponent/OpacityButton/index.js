import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const OpacityButtton = ({ title, width, height, padding, bgColor, margin, onPress, style, textColor, textStyle, children, ...props }) => {
  const initValue = {
    onPress: () => {},
    textStyle: {
      color: textColor || '#000',
      paddingVertical: 4,
      paddingHorizontal: 4,
      textAlign: 'center',
      ...textStyle
    },
    style: {
      width:width,
      height: height,
      padding: padding,
      margin: margin,
      backgroundColor: bgColor,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
  const localValue = {
    onPress: onPress || initValue.onPress,
    style: [initValue.style, style],
    textStyle: textStyle || initValue.textStyle,
    children: children || <Text style={initValue.textStyle}>{title}</Text>
  }
  return (
    <TouchableOpacity {...props} onPress={localValue.onPress} style={localValue.style}>
      {localValue.children}
    </TouchableOpacity>
  )
}

export default OpacityButtton
