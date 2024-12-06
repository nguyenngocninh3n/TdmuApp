import { FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import PostItem from '../PostItem'
import SpaceComponent from '../SpaceComponent'
import { useCustomContext } from '../../store'

const FlatListPostNewFeed = () => {
  const [postsData, setPostsData] = useState([])
  const [state, dispatch] = useCustomContext()
  console.log('flatlistposts newfeed re-render')
  useEffect(()=> {
    API.getNewFeedPostsAPI(state._id).then(response => {
      console.log('response getnewfeedpostsapi: ', response)
      setPostsData(response)
    })
  },[])

  return (
    <FlatList
      scrollEnabled={false}
      data={postsData}
      initialNumToRender={2}
      ItemSeparatorComponent={
        <View style={{ height: 4, marginVertical: 16, backgroundColor: '#ccc' }} />
      }
      ListFooterComponent={(<SpaceComponent height={64} />)}
      renderItem={({ item, index }) => (
        <PostItem ownerID={state._id} item={item} key={item._id} />
      )}
    />
  )
}

export default FlatListPostNewFeed
