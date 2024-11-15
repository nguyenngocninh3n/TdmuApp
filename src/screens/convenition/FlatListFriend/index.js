import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../../api'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import AvatarComponent from '../../../components/AvatarComponent'
import { helper } from '../../../utils/helpers'
import { useCustomContext } from '../../../store'

const FriendItem = ({ _id, onPress }) => {
  const [data, setData] = useState({})
  useEffect(() => {
    API.getConventionUserFriend(_id).then((value) => {
      if (value) {
        setData(value)
      }
    })
  }, [])

  const handleClickItem = () => onPress(_id)

  return (
    <RowComponent onPress={handleClickItem}>
      <AvatarComponent source={API.getFileUrl(data?.avatar)} />
      <SpaceComponent width={8} />
      <View>
        <Text style={{ fontWeight: '500', fontSize: 16 }}>{data?.userName}</Text>
        <SpaceComponent height={4} />
        <RowComponent alignItems>
          <SpaceComponent width={16} />
          <Text style={{ fontSize: 16, fontWeight: '400', color: data?.active ? 'red' : '#aaa' }}>
            {data?.active
              ? 'Đang hoạt động'
              : helper.DateTimeHelper.displayActiveTimeFromDate(data?.updatedAt)}{' '}
          </Text>
        </RowComponent>
      </View>
    </RowComponent>
  )
}

const FlatListFriend = ({ navigation }) => {
  const [state, dispatch] = useCustomContext()
  const [friendData, setFriendData] = useState([])

  useEffect(() => {
    API.getListFriend({ userID: state._id }).then((data) => {
      setFriendData(data.data ?? [])
    })
  }, [])

  const handleClickFriendItem = async (userID) => navigation.navigate('ChattingScreen', { userID, conventionID: await API.getConventionID(state._id, userID) })
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' }}>
      <FlatList
        ItemSeparatorComponent={<SpaceComponent height={24} />}
        style={{ flexDirection: 'column', flex: 1 }}
        data={friendData}
        renderItem={({ item, index }) => (
          <FriendItem onPress={handleClickFriendItem} _id={item._id} />
        )}
      />
    </View>
  )
}
export default FlatListFriend
