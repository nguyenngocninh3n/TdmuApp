import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import RowComponent from '../../../../../../../components/RowComponent'
import ChatAvatar from '../ChatAvatar'
import { helper } from '../../../../../../../utils/helpers'
import SpaceComponent from '../../../../../../../components/SpaceComponent'

const TextMessage = React.memo(({ message, style, owner, time, messageTime, avatar }) => {
  const [isPressed, setIsPressed] = useState(false)
  const handlePress = () => {
    setIsPressed(!isPressed)
  }
  const formatTime = time ? helper.DateTimeHelper.displayTimeDescendingFromDate(time) : null
  const formatMessageTime = helper.DateTimeHelper.displayTimeDescendingFromDate(messageTime)

  const styless = StyleSheet.create({
    userTextMessage: {
      color: '#000',
      fontSize: 18,
      fontWeight: '400',
      backgroundColor: '#ccc',
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 15
    },
    ownerTextMessage: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '400',
      backgroundColor: 'blue',
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 15
    },
    ownerContainer: {
      justifyContent: 'flex-end'
    },
    userContainer: { justifyContent: 'flex-start' }
  })

  return (
    <View>
      {time && <Text style={{ textAlign: 'center', width: '100%' }}>{formatTime}</Text>}
      <RowComponent alignItems onLongPress={() => Alert.alert('long press')}
        onPress={handlePress}
        
        style={owner ? styless.ownerContainer : styless.userContainer}
      >
        {isPressed && !time && (
          <View style={{marginHorizontal:8}}>
            <SpaceComponent width={8} />
            <Text style={{fontSize:12}}>{formatMessageTime}</Text>
            <SpaceComponent width={8} />
          </View>
        )}
        {!owner && <ChatAvatar avatar={avatar} size={30} />}
        <Text style={owner ? styless.ownerTextMessage : styless.userTextMessage}>{message}</Text>
      </RowComponent>
    </View>
  )
})

export default TextMessage
