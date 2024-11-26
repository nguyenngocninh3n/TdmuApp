import React, { useCallback, useEffect, useState } from 'react'
import RowComponent from '../../../RowComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import { OpacityButtton } from '../../../ButtonComponent'
import SpaceComponent from '../../../SpaceComponent'
import CommentModal from '../../../../modals/CommentModal'
import { API } from '../../../../api'
import { useCustomContext } from '../../../../store'

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
    API.getReactionOfUserByTargetAPI(postID, ownerID).then((data) => {
      setReaction(data)
    }).catch(error => {
      console.log('Lỗi khi getReactionOfUserByTargetAPI ', error)
    })
  }, [])


  const handleUpdateReaction = useCallback(() => {
    const customData = {
      targetID: postID,
      userID: ownerID,
      userName: state.userName,
      avatar: state.avatar
    }
    API.updateReactionOfUserByTargetAPI(customData).then((data) => {
      setReaction(data)
    }).catch(error => {
      console.log('Lỗi khi getReactionOfUserByTargetAPI ', error)
    })
  }, [])

  return (
    <RowComponent>
      <OpacityButtton onPress={handleUpdateReaction} children={<Octicons name={reaction?.status ? icon.react : icon.none} size={22} />} />
      <SpaceComponent width={32} />
      <OpacityButtton onPress={handleShowModal} children={<Octicons name="comment" size={22} />} />
      <SpaceComponent width={32} />
      <OpacityButtton children={<Octicons name="share-android" size={22} />} />
      <CommentModal
        modalVisible={modalVisible}
        onClose={handleCloseModal}
        userInfo={item}
        postID={postID}
      />
    </RowComponent>
  )
}

export default PostFooter
