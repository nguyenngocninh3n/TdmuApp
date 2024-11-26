import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import { RESPONSE_STATUS } from '../../utils/Constants'
import SpaceComponent from '../../components/SpaceComponent'
import { navigationRef } from '../../store'

const ListGroupScreen = ({navigation}) => {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    API.getAllgroupAPI().then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setGroups(response.data)
      }
    })
  }, [])

  const handleClickAddGroup = () => navigationRef.navigate('NewGroupScreen')

  return (
    <View>
        <Text onPress={handleClickAddGroup}>Create New Group</Text>
      <FlatList
        data={groups}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item, index }) => (
          <View key={item._id}>
            <Text onPress={() => navigationRef.navigate('GroupScreen', {groupID: item._id})}>{item.name}</Text>
            <SpaceComponent height={16} />
          </View>
        )}
      />
    </View>
  )
}

export default ListGroupScreen