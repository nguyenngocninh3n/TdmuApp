import React, { useCallback, useEffect, useState } from 'react'
import RowComponent from '../../../RowComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import { OpacityButtton } from '../../../ButtonComponent'
import SpaceComponent from '../../../SpaceComponent'
import CommentModal from '../../../../modals/CommentModal'
import { API } from '../../../../api'
import { useCustomContext } from '../../../../store'
import { Text, View } from 'react-native'
import { REACTION_TYPE } from '../../../../utils/Constants'

const icon = {
  none: 'heart',
  react: 'heart-fill'
}

const PostFooter = ({ postID, ownerID, item }) => {
  const [state, dispatch] = useCustomContext()
  const [modalVisible, setModalVisible] = useState(false)
  const [reaction, setReaction] = useState()
  const handleShowModal = useCallback(() => setModalVisible(true), [])
  const handleCloseModal = useCallback(() => setModalVisible(false), [])

  useEffect(() => {
    API.getReactionOfUserByTargetAPI(postID, ownerID)
      .then((data) => {
        console.log('get reaction: ', )
        setReaction(data)
      })
      .catch((error) => {
        console.log('Lỗi khi getReactionOfUserByTargetAPI ', error)
      })
  }, [])

  const handleUpdateReaction = () => {
    const customData = {
      targetID: postID,
      type: REACTION_TYPE.POST,
      userID: ownerID,
      userName: state.userName,
      avatar: state.avatar,
      status: reaction?.status
    }
    API.updateReactionOfUserByTargetAPI(customData)
      .then((data) => {
        console.log('update reaction: ', data)
        setReaction(data)
      })
      .catch((error) => {
        console.log('Lỗi khi getReactionOfUserByTargetAPI ', error)
      })
  }

  return (
    <View>
      <RowComponent alignItems>
        <OpacityButtton
          onPress={handleUpdateReaction}
          children={<Octicons name={reaction?.status ? icon.react : icon.none} size={22} />}
        />
        <SpaceComponent width={24} />
        <OpacityButtton
          onPress={handleShowModal}
          children={<Octicons name="comment" size={22} />}
        />
        <SpaceComponent width={4} />
        <Text style={{ fontSize: 18, fontWeight: '700' }}>
          {item.commentsCount > 0 && item.commentsCount}
        </Text>
        <SpaceComponent width={24} />
        <OpacityButtton children={<Octicons name="share-android" size={22} />} />
        <CommentModal modalVisible={modalVisible} onClose={handleCloseModal} postID={postID} />
      </RowComponent>
      {item.reactionsCount > 0 && <Text>Có {item.reactionsCount} lượt thích bài viết này</Text>}
    </View>
  )
}

export default PostFooter
