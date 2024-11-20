import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'

import { navigationRef } from '../../store'
import SpaceComponent from '../../components/SpaceComponent'
import RowComponent from '../../components/RowComponent'
import ColumnComponent from '../../components/ColumnComponent'
import PopUpModal from '../PopUpModal'
import { API } from '../../api'
import { RESPONSE_STATUS } from '../../utils/Constants'

const SelectionItem = ({ title, onPress, iconName, iconSize }) => {
  return (
    <ColumnComponent>
      <RowComponent alignItems onPress={onPress}>
        <Octicons name={iconName} size={iconSize ?? 24} />
        <SpaceComponent width={8} />
        <TouchableOpacity onPress={onPress}>
          <Text style={{ paddingVertical: 8, color: '#000', fontSize: 16, fontWeight: '400' }}>
            {title}
          </Text>
        </TouchableOpacity>
      </RowComponent>
      <SpaceComponent height={8} />
    </ColumnComponent>
  )
}

const NormalOption = ({ selectOption, onEdit, ownerPostID, ownerID, onClose }) => {
  const handle = {
    REMOVE: () => selectOption(REMOVE),
    EDIT: () => {
      onClose()
      onEdit()
    },
    ROLE: () => {
      onClose()
      onEdit()
    }
  }

  return (
    <View style={{ backgroundColor: '#eee' }}>
      <SpaceComponent height={12} />
      <View style={{ backgroundColor: '#fff', paddingLeft: 16 }}>
        {ownerID === ownerPostID && (
          <View>
            <SpaceComponent height={8} />
            <SelectionItem iconName={'pencil'} title={'Chỉnh sửa bài viết'} onPress={handle.EDIT} />
            <SelectionItem
              iconName={'lock'}
              title={'Chỉnh sửa quyền riêng tư'}
              onPress={handle.EDIT}
            />
            <SelectionItem
              iconName={'trash'}
              title={'Chuyển bài viết vào thùng rác'}
              onPress={handle.REMOVE}
            />
          </View>
        )}
        <SpaceComponent height={200} />
      </View>
    </View>
  )
}

const RemoveOption = ({ changeOption, onClose, postID }) => {
  console.log('post iD in remove option: ', postID)
  const [modalVisible, setModalVisible] = useState(true)

  const handleCloseModal = () => {
    setModalVisible(false)
    changeOption()
  }
  const handleShowModal = () => {
    setModalVisible(true)
  }

  const handleSubmit = () => {
    API.trashPostAPI(postID).then((data) => {
      if (data === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Đã chuyển bài viết vào thùng rác!', ToastAndroid.LONG)
      } else if (data === RESPONSE_STATUS.ERROR) {
        ToastAndroid.show('Lỗi khi chuyển bài viết vào thùng rác!!!', ToastAndroid.LONG)
      }
      handleCloseModal()
      onClose()
    })
  }
  return <PopUpModal onSubmit={handleSubmit} modalVisible={modalVisible} onCancle={handleCloseModal} />
}

const NORMAL = 'MORMAL'
const REMOVE = 'REMOVE'

const PostModal = ({ modalVisible, onClose, ownerID, ownerPostID, postID }) => {
  const [option, setOption] = useState(NORMAL)

  const handleCloseModal = () => {
    handleSelect(NORMAL)
    onClose()
  }

  const handleSelect = (value) => setOption(value)
  const handleEdit = () => navigationRef.navigate('EditPostScreen', { postID })

  console.log('postModal re-render: ', ownerID, ' ', ownerPostID)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleCloseModal
      }}
    >
      <Pressable style={styles.pressableContainer} onPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          {option === NORMAL ? (
            <NormalOption ownerID={ownerID} ownerPostID={ownerPostID} onClose={handleCloseModal} onEdit={handleEdit} selectOption={handleSelect} />
          ) : (
            <RemoveOption postID={postID}  onClose={handleCloseModal} changeOption={() => handleSelect(NORMAL)} />
          )}
        </View>
      </Pressable>
    </Modal>
  )
}

export default PostModal

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1116'
  },

  modalContainer: {
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#aaa',
    backgroundColor: '#eee',
    marginVertical: 8,
    paddingTop: 10,
    paddingLeft: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    color: '#a2f',
    fontSize: 16,
    fontWeight: '500'
  }
})
