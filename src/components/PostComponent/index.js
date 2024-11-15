import { View } from 'react-native'
import React from 'react'
import PostHeader from './components/PostHeader'
import PostContent from './components/PostContent'
import PostFooter from './components/PostFooter'
import SpaceComponent from '../SpaceComponent'

const PostComponent = ({ item, name, avatar }) => {
  return (
    <View style={{flex:1, marginHorizontal:8}}>
      <PostHeader name={name} avatar={avatar} createdAt={item.createdAt} />
      <SpaceComponent height={32} />
      <PostContent content={item.content} attachments={item.attachments} />
      <SpaceComponent height={32} />
      <PostFooter />
    </View>
  )
}

export default PostComponent
