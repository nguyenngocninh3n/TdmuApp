import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { API } from '../../../api'
import { navigationRef, useCustomContext } from '../../../store'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import UserRowComponent from '../../../components/UserRowComponent'
import { useFocusEffect } from '@react-navigation/native'
import groupStype from '../../Group/groupStyle'
import SpaceComponent from '../../../components/SpaceComponent'

const SearchUserScreen = ({ navigation, route }) => {
  const { search } = route.params
  const [state, dispatch] = useCustomContext()
  const [userData, setUserData] = useState([])

  console.log('search user screen re-render: ', search)

  useFocusEffect(
    useCallback(() => {
      API.searchUserAPI(state._id, search).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          response.data && setUserData(response.data)
        }
      })
      return () => setUserData([])
    }, [])
  )

  const handlePressItem = (item) => navigation.navigate('ProfileScreen', { userID: item._id })

  return (
    <View style={groupStype.container}>
      <FlatList
        data={userData}
        ItemSeparatorComponent={<SpaceComponent height={16} />}
        renderItem={({ item, index }) => (
          <UserRowComponent
            onPress={() => handlePressItem(item)}
            avatar={API.getFileUrl(item.avatar)}
            name={item.userName}
          />
        )}
      />
    </View>
  )
}

export default SearchUserScreen
