import { Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'

const OpacityButtton = ({ title, textSize, submit, width, height, padding, bgColor, margin, onPress, style, textColor, textStyle, children, ...props }) => {
  const initValue = {
    onPress: () => {},
    textStyle: {
      color: submit && 'red' || textColor || '#000',
      fontWeght: submit && '600',
      fontSize: textSize,
      paddingVertical: 4,
      paddingHorizontal: 4,
      textAlign: 'center',
      ...textStyle
    },
    style: {
      width:width,
      height: height,
      padding: padding ?? 2,
      margin: margin,
      backgroundColor: bgColor,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
  const localValue = {
    onPress: onPress || initValue.onPress,
    style: [initValue.style, style],
    textStyle: initValue.textStyle,
    children: children || <Text style={initValue.textStyle}>{title}</Text>
  }
  return (
    <TouchableHighlight underlayColor={'#ddda'} {...props} onPress={localValue.onPress} style={localValue.style}>
      {localValue.children}
    </TouchableHighlight>
  )
}

export default OpacityButtton
