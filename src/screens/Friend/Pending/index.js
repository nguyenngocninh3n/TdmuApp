import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../../api'
import RowComponent from '../../../components/RowComponent'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import { useCustomContext } from '../../../store'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { FRIEND_STATUS, RESPONSE_STATUS } from '../../../utils/Constants'
import GoBackComponent from '../../../components/GoBackComponent'

const FriendItem = ({ item, onPress, onRemove, ownerID }) => {
  const [title, setTitle] = useState()
  const handleClickItem = () => onPress(item._id)
  const handleCancleRequest = () => {
    const params = {
      ownerID,
      userID: item._id,
      status: FRIEND_STATUS.CANCELING
    }
    API.updateStatusFriend({ ...params }).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setTitle('Đã hủy yêu cầu')
      }
    })
  }

  return (
    <RowComponent alignItems style={{ marginBottom: 16 }}>
      <AvatarComponent size={64} source={API.getFileUrl(item.avatar)} onPress={handleClickItem} />
      <SpaceComponent width={16} />
      <View style={{ flex: 1 }}>
        <Text onPress={handleClickItem} style={{ fontWeight: '500', fontSize: 17 }}>
          {item.userName}
        </Text>
        <SpaceComponent height={4} />
        <RowComponent style={{ flex: 1 }}>
          <OpacityButtton
            title={title ?? 'Hủy yêu cầu'}
            textColor={'#333'}
            borderRadius={10}
            underlay={'#ccc'}
            bgColor={'#ccc6'}
            style={{ flex: 1 }}
            onPress={handleCancleRequest}
          />
        </RowComponent>
      </View>
    </RowComponent>
  )
}

const handleAddFriend = async (ownerID, userID) => {
  const response = await API.updateStatusFriend({
    ownerID,
    userID,
    status: FRIEND_STATUS.PENDING
  })
  return response
}

const handleRemoveSuggest = async (ownerID, userID) => {
  const response = await API.removeSuggestFriend({
    ownerID,
    userID
  })
  return response
}

const PendingFriendScreen = ({ navigation, route }) => {
  const [state, dispatch] = useCustomContext()
  const [suggests, setSuggests] = useState([])

  useEffect(() => {
    API.getPendingFriend(state._id).then((data) => {
      console.log('data: ', data)
      if (data.status === RESPONSE_STATUS.SUCCESS) {
        setSuggests(data.data.data)
      }
    })
  }, [])

  const handlePressItem = (userID) => navigation.navigate('ProfileScreen', { userID })

  return (
    <View style={{ marginHorizontal: 12 }}>
      <GoBackComponent title={'Lời mời đã gửi'} />
      <SpaceComponent height={24} />
      {suggests.length === 0 && <Text>Danh sách rỗng</Text>}
      <FlatList
        data={suggests}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={<SpaceComponent height={8} />}
        renderItem={({ item, index }) => (
          <FriendItem ownerID={state._id} item={item} onPress={handlePressItem} />
        )}
      />
    </View>
  )
}

export default PendingFriendScreen
