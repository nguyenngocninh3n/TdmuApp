import { FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostComponent from '../PostComponent'
import { API } from '../../api'
import PostItem from '../PostItem'

const FlatListPost = ({ ownerID, userID }) => {
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

  return (
    <FlatList
      scrollEnabled={false}
      data={postsData.data}
      ItemSeparatorComponent={
        <View style={{ height: 4, marginVertical: 16, backgroundColor: '#ccc' }} />
      }
      renderItem={({ item, index }) => (
        <PostItem userData={userData} ownerID={ownerID} item={item} key={item._id} />
      )}
    />
  )
}

export default FlatListPost
