import { View, Text, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostHandler from '../components/PostHandler'
import { API } from '../../../api'
import { MESSAGE_ACTION, POST_ACTION, POST_ATTACHMENT, RESPONSE_STATUS } from '../../../utils/Constants'
import { actions } from '../../../store'

const EditPost = ({ navigation, route }) => {
  const { postID } = route.params
  const [postData, setPostData] = useState()
  const [files, setFiles] = useState([])
  useEffect(() => {
    API.getPostAPI(postID).then((data) => {
      if (data) {
        setPostData(data)
        setFiles(data.attachments.map((item) => ({ type: item.type === 'IMAGE' ? POST_ATTACHMENT.IMAGE : POST_ATTACHMENT.VIDEO, uri: API.getFileUrl(item.source) })))
      }
    })
  }, [])

  const handleSubmit = (ownerID, attachments, value) => {

    const isValueChanged = !(value === postData.content)
    const isAttachmentsChanged = !(JSON.stringify(files) === JSON.stringify(attachments))
    var newPostData = {}
    if (isValueChanged && isAttachmentsChanged) {
      console.log('change all')
      newPostData = {
        userID: ownerID,
        content: value,
        attachments: attachments,
        action: POST_ACTION.UPDATE_ALL
      }
      
    } else if (isValueChanged) {
      console.log('only change content')
      newPostData = {
        userID: ownerID,
        content: value,
        action: POST_ACTION.UPDATE_CONTENT
      }
    } else if (isAttachmentsChanged) {
      console.log('only change attachments')
      newPostData = {
        userID: ownerID,
        attachments:attachments,
        action: POST_ACTION.UPDATE_ATTACHMENT
      }
    } else {
      console.log('dont change')
      ToastAndroid.show('Chỉnh sửa bài viết thành công', ToastAndroid.SHORT)
      navigation.goBack()
      return
    }
    API.editPostAPI(postID, newPostData).then((result) => {
      if (result === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Cập nhật bài viết thành công', ToastAndroid.SHORT)
        navigation.goBack()
      } else {
        ToastAndroid.show('Lỗi khi chỉnh sửa bài viết', ToastAndroid.SHORT)
      }
    })
  }

  console.log('edit post re-render: ', postID)

  return <PostHandler onSubmit={handleSubmit} value={postData?.content} files={files} />
}

export default EditPost
