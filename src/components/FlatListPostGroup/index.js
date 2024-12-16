import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import PostItem from '../PostItem'
import SpaceComponent from '../SpaceComponent'
import { RESPONSE_STATUS } from '../../utils/Constants'

const FlatListPostGroup = ({ groupID, ownerID }) => {
  const [postsData, setPostsData] = useState([])
  console.log('flatlist post group re-render: ', groupID, ' ', ownerID)
  useEffect(() => {
    API.getGroupPostsOfGroupAPI(groupID).then((response) => {
      console.log('set post data: ', response.data.length)
      if (response.status === RESPONSE_STATUS.SUCCESS && response.data.length > 0) {
        console.log('set post data:  settt', response.data.length)
        setPostsData(response.data)
      }
    })
  }, [groupID])

  return (
    <FlatList
      scrollEnabled={false}
      data={postsData}
      initialNumToRender={2}
      ItemSeparatorComponent={
        <View style={{ height: 4, flex: 1, marginVertical: 16, backgroundColor: '#ccc' }} />
      }
      ListFooterComponent={<SpaceComponent height={64} />}
      renderItem={({ item, index }) => (
        <PostItem item={item} groupID={groupID} ownerID={ownerID} key={item._id} />
      )}
    />
  )
}

export default FlatListPostGroup
