/* eslint-disable react/no-unstable-nested-components */
import { FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpaceComponent from '../../../../../components/SpaceComponent'
import ChatItem from './components/ChatItem'
import { API } from '../../../../../api'
import SocketClient from '../../../../../socket'

const ChatList = React.memo(({ conventionID, ownerID }) => {
  console.log('data in chatlist: ', conventionID, ' ', ownerID)
  const [chatData, setChatData] = useState([])
  const [members, setMembers] = useState(new Map())
  useEffect(() => {
    API.getConventionByIdAPI(conventionID).then((data) => {
      setChatData(data.data.reverse() ?? [])
      setMembers(() => {
        const arrMap = new Map()
        data.members.forEach((item) => arrMap.set(item._id, item))
        console.log('arrMap: ', arrMap)
        return arrMap
      })
    })
  }, [conventionID])

  useEffect(() => {
    SocketClient.socket.on('convention', (value) => {
      console.log('on convention: ', value)
      setChatData((pre) => {
        const { _id, senderID, message, type, createdAt, updatedAt } = value
        const newData = { _id, senderID, message, type, createdAt, updatedAt }
        return [newData, ...pre]
      })
    })
  }, [])

  return (
    <FlatList
      style={{ flex: 1, marginLeft: 8, marginRight: 8 }}
      inverted
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      data={chatData}
      keyExtractor={(item) => item._id}
      ListFooterComponent={<SpaceComponent height={64} />}
      ListHeaderComponent={<SpaceComponent height={32} />}
      ItemSeparatorComponent={<SpaceComponent height={4} />}
      renderItem={React.useCallback(({ item, index }) => (
        <ChatItem
          members={members}
          beforeItem={chatData?.at(index + 1)}
          ownerID={ownerID}
          item={item}
          key={item._id + item.createdAt}
        />
      ))}

      // renderItem={React.useCallback(({ item, index }) => {
      //   console.log('render item at: ', index)
      //   return (
      //     <Text key={item._id} id={item._id}>
      //       {item.message}
      //     </Text>
      //   )
      // })
      // }
    />
  )
})

export default ChatList
