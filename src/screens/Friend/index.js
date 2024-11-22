import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import RowComponent from '../../components/RowComponent'
import AvatarComponent from '../../components/AvatarComponent'
import SpaceComponent from '../../components/SpaceComponent'
import { RESPONSE_STATUS } from '../../utils/Constants'
import GoBackComponent from '../../components/GoBackComponent'
import SearchCoponent from '../../components/SearchComponent'

const FriendItem = ({ item, onPress }) => {
  const handleClickItem = () => onPress(item._id)
  return (
    <RowComponent alignItems style={{ marginBottom: 16 }} onPress={handleClickItem}>
      <AvatarComponent size={48} source={API.getFileUrl(item.avatar)} />
      <SpaceComponent width={16} />
      <RowComponent alignItems >
        <Text style={{ fontWeight: '500', fontSize: 17 }}>{item.userName}</Text>
        <SpaceComponent width={8} />
      </RowComponent>
    </RowComponent>
  )
}

const FriendScreen = ({ navigation, route }) => {
  const { userID } = route.params
  const [friends, setFriends] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    API.getListFriend({ userID: userID }).then((data) => {
      if (data.status === RESPONSE_STATUS.SUCCESS) {
        console.log('gia tri data là: ', data)
        setFriends(data.data)
      }
    })
  }, [])

  const filteredFriends = searchQuery
    ? friends.filter((friend) => friend.userName.toLowerCase().includes(searchQuery.toLowerCase()))
    : friends

  const handleSearchChange = (value) => setSearchQuery(value)
  const handlePressItem = (userID) => navigation.navigate('ProfileScreen', {userID})

  return (
    <View style={{ marginHorizontal: 12 }}>
      <SearchCoponent onCallback={handleSearchChange} unsearch iconSize={24} />
      <SpaceComponent height={16} />
      <FlatList
        data={filteredFriends}
        renderItem={({ item, index }) => <FriendItem onPress={handlePressItem} item={item} key={item._id} />}
      />
    </View>
  )
}

export default FriendScreen
