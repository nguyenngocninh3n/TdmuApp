import { View, Text, Pressable, StyleSheet, TextInput, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { API } from '../../../api'
import GoBackComponent from '../../../components/GoBackComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { MESSAGE_NOTIFY_STATUS, MESSAGE_NOTIFY_TYPE, MESSAGE_TYPE } from '../../../utils/Constants'

const DetailScreen = ({ navigation, route }) => {
  const { conventionID, name, avatar, members, chatData, type, ownerID, conventionName } =
    route.params
  console.log('members: ', )
  const [modalVisible, setModalVisible] = useState(false)
  const [chatName, setChatName] = useState(conventionName)
  const onCloseModal = () => setModalVisible(false)
  const onShowModal = () => setModalVisible(true)
  const onUpdate = (value) => {
    const data = {
      senderID: ownerID,
      type: MESSAGE_TYPE.NOTIFY,
      newState: value,
      userID: ownerID,
      notify: {
        type: MESSAGE_NOTIFY_TYPE.CHANGE_CONVENTION_NAME,
        changedID: ownerID,
        value: value
      },
      customMessage: `${members[ownerID].userName} đã đổi tên nhóm thành ${value}`
    }
    API.sendMessageAPI({
      conventionID,
      data: data,
      senderName: members[ownerID].userName,
      senderAvatar: members[ownerID].avatar
    })
    setChatName(value)
  }

  const handleClickFileViewing = () => {
    navigation.navigate('FileViewingScreen', { conventionID })
  }

  const handleClickAvtarConvention = () => {
    navigation.navigate('BackgroundConventionScreen', { conventionID, avatar })
  }

  const handleClickConventionName = () => {
    onShowModal()
  }

  const handleClickAka = () => {
    navigation.navigate('AkaScreen', { conventionID, members })
  }

  const handleClickMember = () => {
    const customMembers = Object.values(members).map((value) => value)
    navigation.navigate('MemberScreen', { members: customMembers })
  }

  const handleClickSearch = () => {
    navigation.navigate('SearchConventionScreen', {
      chatData,
      conventionID,
      members: Object.values(members).map((value) => value)
    })
  }

  const handleClickProfile = () => {
    navigation.navigate('ProfileScreen', {
      userID: Object.values(members)
        .filter((item) => item._id !== ownerID)
        .at(0)._id
    })
  }

  return (
    <View style={{ marginHorizontal: 16 }}>
      <GoBackComponent />
      <View style={{ alignItems: 'center' }}>
        <AvatarComponent source={API.getFileUrl(avatar)} size={140} />
        <SpaceComponent height={8} />
        <Text style={{ fontSize: 24 }}>{name}</Text>
      </View>
      <SpaceComponent height={32} />

      {/* PROFILE */}
      {type && (
        <RowComponent alignItems onPress={handleClickProfile}>
          <Ionicons name="person" size={24} />
          <SpaceComponent width={8} />
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Trang cá nhân</Text>
        </RowComponent>
      )}

      {/* NAME */}
      {!type && (
        <RowComponent alignItems onPress={handleClickConventionName}>
          <Ionicons name="text" size={24} />
          <SpaceComponent width={8} />
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Tên cuộc trò chuyện</Text>
        </RowComponent>
      )}
      <SpaceComponent height={20} />

      {/* AVATAR */}
      <RowComponent alignItems onPress={handleClickAvtarConvention}>
        <Ionicons name="image-outline" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Avatar</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* MEMBERS */}
      <RowComponent alignItems onPress={handleClickMember}>
        <MaterialIcons name="people" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Thành viên</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* AKA */}
      <RowComponent alignItems onPress={handleClickAka}>
        <Ionicons name="text" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Biệt danh</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* SEARCH */}
      <RowComponent alignItems onPress={handleClickSearch}>
        <Ionicons name="search-outline" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Tìm kiếm trong cuộc trò chuyện</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* IMAGE & VIDEO */}
      <RowComponent alignItems onPress={handleClickFileViewing}>
        <MaterialIcons name="photo-library" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Ảnh và video</Text>
      </RowComponent>

      {/* CUSTOM MODAL */}
      <CustomModal
        modalVisible={modalVisible}
        name={conventionName}
        onClose={onCloseModal}
        onUpdate={onUpdate}
      />
    </View>
  )
}

const CustomModal = ({ modalVisible, onClose, onUpdate, name }) => {
  const [inputValue, setInputValue] = useState(name)

  const handleInputChange = (value) => {
    console.log('new value: ', value)
    setInputValue(value)
  }
  const handleCloseModal = () => onClose(false)

  const handleUpdate = () => {
    handleCloseModal()
    onUpdate(inputValue)
  }

  useEffect(() => {
    setInputValue(name)
  }, [])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onClose(!modalVisible)
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          <SpaceComponent height={8} />
          <Text style={styles.modalTitle}>Thay đổi tên nhóm</Text>
          <SpaceComponent height={16} />
          <RowComponent alignItems>
            <SpaceComponent width={8} />
            <TextInput
              style={styles.modalTextInput}
              placeholder="Thêm biệt danh..."
              value={inputValue}
              focusable={true}
              onChangeText={handleInputChange}
            />
          </RowComponent>
          <SpaceComponent height={32} />
          <RowComponent
            alignItems
            style={{ marginVertical: 10, marginHorizontal: 32, justifyContent: 'space-between' }}
          >
            <OpacityButtton
              title={'Hủy'}
              textStyle={styles.modalBtnText}
              onPress={handleCloseModal}
            />
            <RowComponent>
              <OpacityButtton
                title={'Lưu'}
                textStyle={styles.modalBtnText}
                onPress={handleUpdate}
              />
            </RowComponent>
          </RowComponent>
          <SpaceComponent height={8} />
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: '50%',
    marginHorizontal: 40
  },
  modalTitle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize:17,
    color: '#000',
    fontWeight: '500'
  },
  modalTextInput: { borderBottomColor: '#ccc', flex: 1, borderBottomWidth: 1, paddingBottom:2},
  modalBtnText: {
    color: 'blue',
    fontWeight: '400',
    fontSize: 16
  }
})

export default DetailScreen
