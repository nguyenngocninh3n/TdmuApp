import { Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'

const OpacityButtton = ({ title, left, right, textSize, submit, width, height, padding, paddingHorizontal, bgColor, margin, onPress, style, textColor, textStyle, children }) => {
  const initValue = {
    onPress: () => {},
    textStyle: {
      color: submit && 'red' || textColor || '#000',
      fontWeght: submit && '600',
      fontSize: textSize,
      paddingVertical: 4,
      paddingHorizontal: paddingHorizontal ?? 4,
      textAlign: left ? 'left' : right ? 'right' : 'center',
      ...textStyle
    },
    style: {
      width:width,
      height: height,
      padding: padding ?? 2,
      margin: margin,
      backgroundColor: bgColor,
      justifyContent:  'center',
      alignItems: left ? 'left' : right ? 'right' : 'center'
    }
  }
  const localValue = {
    onPress: onPress || initValue.onPress,
    style: [initValue.style, style],
    textStyle: initValue.textStyle,
    children: children || <Text style={initValue.textStyle}>{title}</Text>
  }
  return (
    <TouchableHighlight underlayColor={'#eee'} onPress={localValue.onPress} style={localValue.style}>
      {localValue.children}
    </TouchableHighlight>
  )
}

export default OpacityButtton
