import { FlatList, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { API } from '../../api'
import PostItem from '../PostItem'
import SpaceComponent from '../SpaceComponent'
import SocketClient from '../../socket'
import { REACTION_TYPE } from '../../utils/Constants'

const FlatListPost = ({ ownerID, userID, children }) => {
  const [postsData, setPostsData] = useState({})
  const [userData, setUserData] = useState({})
  useEffect(() => {
    API.getUserPostsAPI(userID, ownerID).then((data) => {
      setPostsData(data)
    })

    API.getUserByIdAPI({ uid: userID }).then((data) => {
      setUserData(data)
    })
  }, [])


  const handleRemovePost = (postID) => {
    setPostsData(pre => {
      const postIndex = [].findIndex(item => item._id === postID)
      const preArr = [].slice(0, postIndex)
      const nextArr = [].slice(postIndex)
      return [...preArr, ...nextArr]
    })
  }


  // POSTVIEW ACTION
  const timeoutRefs = useRef(new Map()) // Lưu timeout cho từng item
  const handleJoinPostIdRoom = (postID) => SocketClient.emitJoinRoomsByArray([postID])
  const handleExitPostIdRoom = (postID) => SocketClient.exitRooms([postID])
  const handleAddPostView = (pUserID, postID) => API.addPostViewAPI(pUserID, postID)

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 }// 50% => item visible

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    changed.forEach(({ item, isViewable }) => {
      const postID = item._id
      const pUserID = ownerID
      if (isViewable) {
        //nếu item hiển thị => join room preparing add postview
        handleJoinPostIdRoom(postID)
        const timeout = setTimeout(() => handleAddPostView(pUserID, postID), 2000)
        timeoutRefs.current.set(postID, timeout)
      } else {
        //item thoát khỏi view nhìn => exit room và check condition of postview
        handleExitPostIdRoom(item._id)
        if (timeoutRefs.current.has(postID)) {
          clearTimeout(timeoutRefs.current.get(postID))
          timeoutRefs.current.delete(postID)
        }
      }
    })
  }).current



  // ON LISTEN REACTION ACTION
  useEffect(() => {
    const event_name = REACTION_TYPE.POST + 'reaction'
    console.log('event_name on socket listion reaction: ', event_name)
    SocketClient.socket.on(event_name, (data) => {
      console.info('reaction listen: ', data.postID)
      setPostsData((pre) => {
        const postList = [...pre.data]
        const filterIndex = postList.findIndex((item) => item._id === data.postID)
        console.log('filter index: ', filterIndex)
        postList[filterIndex].reactionsCount += data.number
        return {...pre, data: postList}
      })
    })
  }, [])

  return (
    <FlatList
      data={postsData.data}
      initialNumToRender={2}
      style={{backgroundColor:'#fff'}}
      ItemSeparatorComponent={
        <View style={{ height: 4, marginVertical: 16, backgroundColor: '#ccc' }} />
      }
      ListFooterComponent={(<SpaceComponent height={64} />)}
      ListHeaderComponent={<View style={{borderBottomWidth:2, borderBottomColor:'#acc', marginBottom:16}}>{children}</View>}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      renderItem={({ item, index }) => (
        <PostItem userData={userData} ownerID={ownerID} item={item} key={item._id} />
      )}
    />
  )
}

export default FlatListPost
