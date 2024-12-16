import { FlatList, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { API } from '../../api'
import PostItem from '../PostItem'
import SpaceComponent from '../SpaceComponent'
import { useCustomContext } from '../../store'
import SocketClient from '../../socket'
import NewPostBox from '../NewPostBox'
import Stories from '../Stories'
import { REACTION_TYPE } from '../../utils/Constants'

const FlatListPostNewFeed = ({ navigation }) => {
  const [postsData, setPostsData] = useState([])
  const [state, dispatch] = useCustomContext()
  console.log('flatlistposts newfeed re-render')
  useEffect(() => {
    API.getNewFeedPostsAPI(state._id).then((response) => {
      console.log(response)
      setPostsData(response)
    })
  }, [])

  // ON LISTEN REACTION ACTION
  useEffect(() => {
    const event_name = REACTION_TYPE.POST+'reaction'
    console.log('event_name on socket listion reaction: ', event_name)
    SocketClient.socket.on(event_name, (data) => {
      console.info('reaction listen: ', data.postID)
      setPostsData((pre) => {
        const postList = [...pre]
        const filterIndex = postList.findIndex((item) => item._id === data.postID)
        console.log('filter index: ', filterIndex)
        postList[filterIndex].reactionsCount += data.number
        return postList
      })
    })
  }, [])

  // POSTVIEW ACTION
  const timeoutRefs = useRef(new Map()) // Lưu timeout cho từng item
  const handleJoinPostIdRoom = (postID) => SocketClient.emitJoinRoomsByArray([postID])
  const handleExitPostIdRoom = (postID) => SocketClient.exitRooms([postID])
  const handleAddPostView = (userID, postID) => API.addPostViewAPI(userID, postID)

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    changed.forEach(({ item, isViewable }) => {
      const postID = item._id
      const userID = state._id
      if (isViewable) {
        //nếu item hiển thị => join room preparing add postview
        handleJoinPostIdRoom(postID)
        const timeout = setTimeout(() => handleAddPostView(userID, postID), 2000)
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

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50 // Chỉ định >= 50% là "hiển thị"
  }

  return (
    <FlatList
      // scrollEnabled={false}
      data={postsData}
      initialNumToRender={2}
      ItemSeparatorComponent={
        <View style={{ height: 4, marginVertical: 16, backgroundColor: '#ccc' }} />
      }
      ListHeaderComponent={
        <View>
          <Stories />
          <NewPostBox navigation={navigation} />
        </View>
      }
      ListFooterComponent={<SpaceComponent height={64} />}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      renderItem={({ item, index }) => <PostItem ownerID={state._id} item={item} key={item._id} />}
    />
  )
}

export default FlatListPostNewFeed
