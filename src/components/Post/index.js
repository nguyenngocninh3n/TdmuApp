import { View, StyleSheet } from 'react-native'
import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import ImageRenderComponent from '../ImageRenderComponent'

const Post = ({ post }) => {
  return (
    <View>
      <PostHeader data={post} />
      <ImageRenderComponent source={post.image} />
      <PostFooter data={post} />
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.white,
    marginTop: 8
  },
  postImg: {
    width: '90%',
    margin: 20,
    height: 250
  },
  postImg_none: {
    width: 0,
    height: 0,
    margin: 0
  }
})

