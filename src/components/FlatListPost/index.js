import { FlatList, View } from 'react-native'
import React from 'react'
import PostComponent from '../PostComponent'

const FlatListPost = ({ data, style }) => {
  return (
    <FlatList
      scrollEnabled={false}
      style={style}
      data={data.data}
      ItemSeparatorComponent={<View style={{height:4, marginVertical:16, backgroundColor: '#ccc'}} />}
      renderItem={({ item, index }) => (
        <PostComponent name={data.userName} avatar={data.userAvatar} item={item} key={index} />
      )}
    />
  )
}

export default FlatListPost
