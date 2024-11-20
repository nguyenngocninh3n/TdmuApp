import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RowComponent from '../../../components/RowComponent'
import { API } from '../../../api'
import { useCustomContext } from '../../../store'
import { FRIEND_STATUS, MEMBER_ROLE, MESSAGE_TYPE } from '../../../utils/Constants'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import GoBackIcon from '../../../components/GoBackComponent/GoBackIcon'
import { OpacityButtton } from '../../../components/ButtonComponent'

const CreateGroup = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFriends, setSelectedFriends] = useState([])
  const [friends, setFriends] = useState([])
  const [state, dispatch] = useCustomContext()
  useEffect(() => {
    API.getListFriend({ userID: state._id }).then((data) => {
      if (data) {
        const listFriend = data.data.filter((item) => item.status === FRIEND_STATUS.FRIEND)
        setFriends(listFriend)
      }
    })
  }, [])
  console.log('create group re-render')

  // Lọc danh sách bạn bè theo từ khóa tìm kiếm
  const filteredFriends = searchQuery
    ? friends.filter((friend) => friend.userName.toLowerCase().includes(searchQuery.toLowerCase()))
    : friends

  // Toggle trạng thái chọn bạn bè
  const toggleSelectFriend = (selected) => {
    setSelectedFriends(
      (prev) =>
        prev.includes(selected)
          ? prev.filter((item) => item !== selected ) // Bỏ chọn
          : [...prev, selected] // Thêm vào danh sách chọn
    )
  }

  const handleCreateGroup = () => {
    const members = selectedFriends.map(item => {
      const customData = {
        _id: item._id,
        userName: item.userName,
        avatar: item.userAvatar,
        role: MEMBER_ROLE.MEMBER
      }
      return customData
    })
    members.push({
      _id: state._id,
      userName: state.userName,
      avatar: state.avatar,
      role: MEMBER_ROLE.ADMIN
    })
    const uids = selectedFriends.map(item => item._id)
    uids.push(state._id)
    const type = 'group'
    const message = {
      senderID: state._id,
      message: `${state.userName} đã tạo nhóm`,
      type: MESSAGE_TYPE.NOTIFY
    }
    const newData = {members, uids, type, message}

    API.createGroupConvention(newData)
  }

  // Render một item bạn bè
  const renderFriendItem = ({ item }) => {
    const isSelected = selectedFriends.includes(item)
    return (
      <RowComponent
        alignItems
        key={item._id}
        style={{ justifyContent: 'space-between' }}
        onPress={() => toggleSelectFriend(item)}
      >
        <RowComponent alignItems>
          <AvatarComponent source={API.getFileUrl(item.userAvatar)} size={48} />
          <SpaceComponent width={16} />
          <Text style={styles.friendName}>{item.userName}</Text>
        </RowComponent>
        <FontAwesome color={'blue'} name={isSelected ? 'check-circle' : 'circle-thin'} size={24} />
      </RowComponent>
    )
  }

  return (
    <View style={styles.container}>
      <RowComponent alignItems style={styles.goBackContainer}>
        <GoBackIcon size={24} />
        {selectedFriends.length >= 2 && (
          <OpacityButtton onPress={handleCreateGroup} title={'Tạo'} textColor={'blue'} textSize={16} />
        )}
      </RowComponent>
      <View style={styles.groupActionContainer}>
        <RowComponent>
          <Text>Tên nhóm:</Text>
          <SpaceComponent width={24} />
          <TextInput placeholder="Nhập tên nhóm..." />
        </RowComponent>
        <TextInput
          style={styles.searchBar}
          placeholder="Tìm kiếm bạn bè..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item._id}
          renderItem={renderFriendItem}
          contentContainerStyle={styles.friendList}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  groupActionContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9'
  },

  goBackContainer: {
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal:8,
    height:48
  },

  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff'
  },
  friendList: {
    paddingBottom: 16
  },

  friendName: {
    fontSize: 16
  }
})

export default CreateGroup
