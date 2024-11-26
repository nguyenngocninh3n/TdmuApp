import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../../api'
import { useCustomContext } from '../../../store'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import UserRowComponent from '../../../components/UserRowComponent'

const SearchUserScreen = ({ navigation, route }) => {
  const { search } = route.params
  const [state, dispatch] = useCustomContext()
  const [userData, setUserData] = useState([])

  useEffect(() => {
    API.searchUserAPI(state._id, search).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        response.data && setUserData(response.data)
      }
    })
  }, [search])

  return (
    <View>
      <Text>SearchUserScreen</Text>
      <FlatList
        data={userData}
        renderItem={({ item, index }) => (
          <UserRowComponent avatar={API.getFileUrl(item.avatar)} name={item.userName} />
        )}
      />
    </View>
  )
}

export default SearchUserScreen