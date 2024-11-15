import { StyleSheet, TextInput } from 'react-native'
import React, { forwardRef, useState } from 'react'

const PostInput = forwardRef(function (props, ref) {
  const [value, setValue] = useState(ref.current.value)
  const handleTextChange = (newValue) => {
    setValue(newValue)
    ref.current.value = newValue
  }
  return (
    <TextInput
      ref={ref}
      style={styles.textInput}
      onChangeText={handleTextChange}
      focusable={true}
      textAlignVertical="top"
      value={value}
      autoFocus={true}
      multiline={true}
      placeholder="Ngày hôm nay của bạn thế nào?"
    />
  )
})

export default PostInput

const styles = StyleSheet.create({
  textInput: {
    width: '80%',
    fontSize: 16,
    marginLeft: 16
  }
})
