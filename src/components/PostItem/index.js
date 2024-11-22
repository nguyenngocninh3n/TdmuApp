import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostHeader from './components/PostHeader'
import PostContent from './components/PostContent'
import PostFooter from './components/PostFooter'
import SpaceComponent from '../SpaceComponent'

const PostItem = ({ item, userData, ownerID, onRemove }) => {

  return (
    <View style={{flex:1, marginHorizontal:8}}>
      <PostHeader onRemove={onRemove} item={item} user={userData} ownerID={ownerID} />
      <SpaceComponent height={8} />
      <PostContent content={item.content} attachments={item.attachments} />
      <SpaceComponent height={16} />
      <PostFooter postID={item._id} user={userData} ownerID={ownerID} />
    </View>
  )
}

export default PostItem
