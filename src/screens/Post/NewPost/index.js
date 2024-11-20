import { ToastAndroid } from 'react-native'
import React from 'react'
import { API } from '../../../api'
import PostHandler from '../components/PostHandler'
import { RESPONSE_STATUS } from '../../../utils/Constants'

const NewPost = ({ navigation }) => {
  console.log('newpost re-render')

  const handleSubmit = (ownerID, customAttachments, value) => {
    const newPostData = {
      userID: ownerID,
      attachments: customAttachments,
      content: value
    }
    API.storePostAPI(newPostData).then((result) => {
      if (result === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Thêm bài viết thành công', ToastAndroid.LONG)
        navigation.goBack()
      } else {
        ToastAndroid.show('Lỗi khi thêm bài viết', ToastAndroid.LONG)
      }
    })
  }

  return <PostHandler onSubmit={handleSubmit} />
}

export default NewPost
