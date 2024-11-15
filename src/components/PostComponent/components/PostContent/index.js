import { View, Text } from 'react-native'
import React from 'react'

const PostContent = ({ content, attachments }) => {
  return (
    <View>
      <Text>{content}</Text>
    </View>
  )
}

export default PostContent
