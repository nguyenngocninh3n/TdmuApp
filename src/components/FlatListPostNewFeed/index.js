import { FlatList, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { API } from '../../api'
import PostItem from '../PostItem'
import SpaceComponent from '../SpaceComponent'
import { useCustomContext } from '../../store'
import SocketClient from '../../socket'
import NewPostBox from '../NewPostBox'
import Stories from '../Stories'

const FlatListPostNewFeed = ({navigation}) => {
  const [postsData, setPostsData] = useState([])
  const [state, dispatch] = useCustomContext()
  console.log('flatlistposts newfeed re-render')
  useEffect(() => {
    API.getNewFeedPostsAPI(state._id).then((response) => {
      setPostsData(response)
    })
  }, [])

  const viewableItemsMap = useRef(new Map()) // Để theo dõi trạng thái từng item
  const timeoutRefs = useRef(new Map()) // Lưu timeout cho từng item


  const handleJoinPostIdRoom = (postID) => {
    SocketClient.emitConventionJoinRoomsByArray([postID])
  }

  const handleExitPostIdRoom = (postID) => {
    SocketClient.exitRooms([postID])
  }

  const handleAddPostView = (userID, postID) => {
    API.addPostViewAPI(userID, postID)
  }

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    changed.forEach(({ item, isViewable }) => {
      const itemId = item._id

      if (isViewable) {
        // Nếu item hiển thị >= 50%: gọi API_A
        handleJoinPostIdRoom(item._id)

        // Đặt timeout 2s để gọi API_C
        const timeout = setTimeout(() => {
          handleAddPostView(state._id, item._id)
        }, 2000)
        timeoutRefs.current.set(itemId, timeout)
      } else {
        // Nếu item không còn hiển thị: gọi API_B
        handleExitPostIdRoom(item._id)

        // Hủy timeout nếu item rời khỏi màn hình trước 2s
        if (timeoutRefs.current.has(itemId)) {
          clearTimeout(timeoutRefs.current.get(itemId))
          timeoutRefs.current.delete(itemId)
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
      ListHeaderComponent={(<View>
        <Stories />
        <NewPostBox navigation={navigation} />
      </View>)}
      ListFooterComponent={<SpaceComponent height={64} />}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      renderItem={({ item, index }) => <PostItem ownerID={state._id} item={item} key={item._id} />}
    />
  )
}

export default FlatListPostNewFeed
