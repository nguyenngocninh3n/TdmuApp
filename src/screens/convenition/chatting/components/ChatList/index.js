/* eslint-disable react/no-unstable-nested-components */
import { FlatList, Text, View } from 'react-native'
import React, { lazy } from 'react'
import styles from '../../styles'
import SpaceComponent from '../../../../../components/SpaceComponent'
import { helper } from '../../../../../utils/helpers'
import { CHAT_ITEM_TYPE, MESSAGE_TYPE } from '../../../../../utils/Constants'
const SingleMessage = lazy(() => import('../SingleMessage'))

const ChatList = ({ chatData, members, ownerID }) => {
  const getItemType = (senderID) => {
    return senderID === ownerID ? CHAT_ITEM_TYPE.OWNER_MESSAGE : CHAT_ITEM_TYPE.USER_MESSAGE
  }
  const ChatItem = ({ item, index }) => {
    const chatAvatar = members?.get(item.senderID)?.avatar
    const { senderID, message, type } = item
    const time = item.createdAt
    const itemType = getItemType(senderID)
    if (item.type === MESSAGE_TYPE.NOTIFY) {
      console.log('notify message: ', item.message)
      return (<Text style={{textAlign:'center',fontWeight: '400', fontSize:13}}>{item.message}</Text>)
    }
    if (index === chatData.length - 1) {
      //first message => having avatar, time
      return (
        <SingleMessage messageTime={time} message={message} chatAvatar={chatAvatar} time={time} itemType={itemType} messageType={type} />
      )
    }
    // multi message from anyone => having avatar, not time
    else if (item.senderID === chatData?.at(index + 1)?.senderID) {
      return <SingleMessage messageTime={time} itemType={itemType} messageType={type} message={item.message} />
    } else {
      // single message or first chat on multing from anyone => having avatar & time
      const beforeTime = chatData?.at(index + 1).createdAt || Date.now().toLocaleString()
      const timeSpace = helper.DateTimeHelper.compareTwoDateByDate(time, beforeTime, 'hour')
      return (
        <SingleMessage
          message={message}
          time={timeSpace >= 1 && timeSpace}
          messageTime={time}
          chatAvatar={chatAvatar}
          itemType={itemType}
          messageType={type}
          key={item._id}
        />
      )
    }
  }

  return (
    <FlatList
      style={styles.chatFlatlistContainer}
      inverted
      initialNumToRender={10}
      // data={chatData.filter(item => item.type === 'TEXT')}
      data={chatData}
      ListFooterComponent={<SpaceComponent height={64} />}
      ListHeaderComponent={<SpaceComponent height={32} />}
      ItemSeparatorComponent={<SpaceComponent height={4} />}
      renderItem={({ item, index }) => <ChatItem key={'chatlist item' + index} item={item} index={index} />}
    />
  )
}

export default ChatList
