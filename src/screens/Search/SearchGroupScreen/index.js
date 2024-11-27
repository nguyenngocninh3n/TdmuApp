import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import UserRowComponent from '../../../components/UserRowComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import groupStype from '../../Group/groupStyle'
import { API } from '../../../api'
import { useCustomContext } from '../../../store'
import { useFocusEffect } from '@react-navigation/native'
import { RESPONSE_STATUS } from '../../../utils/Constants'

const SearchGroupScreen = ({navigation, route}) => {
  const { search } = route.params
  const [state, dispatch] = useCustomContext()
  const [userData, setUserData] = useState([])

  console.log('search groupscreen re-render: ', search)

  useFocusEffect(
    useCallback(() => {
      API.searchGroupAPI(state._id, search).then((response) => {
        if (response.status === RESPONSE_STATUS.SUCCESS) {
          response.data && setUserData(response.data)
        }
      })
      return () => setUserData([])
    }, [search])
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
            name={item.name}
          />
        )}
      />
    </View>
  )
}

export default SearchGroupScreen