import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import RowComponent from '../../components/RowComponent'
import AvatarComponent from '../../components/AvatarComponent'
import SpaceComponent from '../../components/SpaceComponent'
import { useCustomContext } from '../../store'
import { OpacityButtton } from '../../components/ButtonComponent'
import { FRIEND_STATUS, RESPONSE_STATUS } from '../../utils/Constants'
import SearchComponent from '../../components/SearchComponent'

const FriendItem = ({ item, onPress, onRemove, ownerID }) => {
  const [title, setTitle] = useState()
  const handleClickItem = () => onPress(item._id)

  return (
    <RowComponent alignItems style={{ marginBottom: 16 }}>
      <AvatarComponent size={48} source={API.getFileUrl(item.avatar)} onPress={handleClickItem} />
      <SpaceComponent width={16} />
      <View style={{ flex: 1 }}>
        <Text onPress={handleClickItem} style={{ fontWeight: '500', fontSize: 17 }}>
          {item.userName}
        </Text>
        <SpaceComponent height={4} />
      </View>
    </RowComponent>
  )
}

const CustomButton = ({ title, onPress }) => {
  return (
    <OpacityButtton
      bgColor={'#ccc4'}
      underlay={'#ccca'}
      style={styles.buttonContainer}
      title={title}
      onPress={onPress}
    />
  )
}

const ListFriendScreen = ({ navigation, route }) => {
  const [state, dispatch] = useCustomContext()
  const [friends, setFriends] = useState([])

  useEffect(() => {
    API.getListFriend({ userID: state._id }).then((data) => {
      if (data.status === RESPONSE_STATUS.SUCCESS) {
        setFriends(data.data)
      }
    })
  }, [])

  const handlePressItem = (userID) => navigation.navigate('ProfileScreen', { userID })
  const onSuggestFriend = () => navigation.navigate('SuggestFriendScreen', { userID: state._id })
  const onPendingFriend = () => navigation.navigate('PendingFriendScreen', { userID: state._id })
  const onAccepting = () => navigation.navigate('AcceptingFriendScreen', { userID: state._id })

  // FILTER
  const [searchQuery, setSearchQuery] = useState('')
  const filteredFriends = searchQuery
    ? friends.filter((friend) => friend.userName.toLowerCase().includes(searchQuery.toLowerCase()))
    : friends

  const handleSearchChange = (value) => setSearchQuery(value)

  return (
    <View style={{ paddingHorizontal: 12, backgroundColor: '#fff', flex: 1 }}>
      <SpaceComponent height={8} />
      <RowComponent>
        <CustomButton title={'Gợi ý'} onPress={onSuggestFriend} />
        <SpaceComponent width={4} />
        <CustomButton title={'Lời mời kết bạn'} onPress={onAccepting} />
        <SpaceComponent width={4} />
        <CustomButton title={'Đã gửi yêu cầu'} onPress={onPendingFriend} />
      </RowComponent>
      {friends?.length === 0 ? (
        <Text style={styles.emtyDataText}>Bạn chưa kết bạn với ai</Text>
      ) : (
        <Text style={styles.fullyDataText}>Danh sách bạn bè</Text>
      )}
      <SpaceComponent height={16} />
      <SearchComponent onCallback={handleSearchChange} iconSize={24} unsearch unGoback />
      <SpaceComponent height={16} />
      <FlatList
        data={filteredFriends}
        style={{ backgroundColor: '#fff' }}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={<SpaceComponent height={8} />}
        renderItem={({ item, index }) => (
          <FriendItem ownerID={state._id} item={item} onPress={handlePressItem} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  emtyDataText: {
    fontWeight: '900',
    fontSize: 20,
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 100,
    color: '#3336'
  },
  fullyDataText: {
    marginTop:32,
    fontWeight: '600',
    fontSize: 20,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#33cc'
  }
})

export default ListFriendScreen
