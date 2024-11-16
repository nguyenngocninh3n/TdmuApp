import { View, Text } from 'react-native'
import React from 'react'
import { helper } from '../../../../../../../utils/helpers'
import { MESSAGE_TYPE } from '../../../../../../../utils/Constants'
import VideoMessage from '../VideoMessage'
import ImageMessage from '../ImageMessage'
import TextMessage from '../TextMessage'

const ChatItem = React.memo(({ item, index, members, ownerID, beforeItem }) => {
  const boolCheckOwner = item.senderID === ownerID
  console.log('re-render chatitem: ', beforeItem?.message)
  var messageType = TextMessage
  switch (item.type) {
    case MESSAGE_TYPE.TEXT:
      messageType = TextMessage
      break
    case MESSAGE_TYPE.IMAGE:
      messageType = ImageMessage
      break
    case MESSAGE_TYPE.VIDEO:
      messageType = VideoMessage
      break
  }
  const config = {
    style: boolCheckOwner ? {} : {},
    avatar: boolCheckOwner ? members.get(item.senderID)?.avatar : '',
    messageType: messageType,
    owner: boolCheckOwner,
    message: item.message,
    time: item.createdAt
  }

  const time = item.createdAt
  if (item.type === MESSAGE_TYPE.NOTIFY) {
    return (
      <Text style={{ textAlign: 'center', fontWeight: '400', fontSize: 13 }}>{item.message}</Text>
    )
  }
  if (!beforeItem) {
    //first message => having avatar, time
    return (
      <config.messageType
        avatar={config.avatar}
        message={config.message}
        style={config.style}
        owner={config.owner}
        time={config.time}
      />
    )
  } else {
    // single message or first chat on multing from anyone => having avatar & time
    const beforeTime = beforeItem.createdAt
    const timeSpace = helper.DateTimeHelper.compareTwoDateByDate(time, beforeTime, 'hour')

    return timeSpace >= 1 ? (
      <config.messageType
        message={config.message}
        time={config.time}
        messageTime={config.time}
        avatar={config.avatar}
        owner={config.owner}
        // style={config.style}
      />
    ) : (
      // multi message from anyone => having avatar, not time
      <config.messageType
        message={config.message}
        style={config.style}
        owner={config.owner}
        messageTime={config.time}
      />
    )
  }
})

export default ChatItem
