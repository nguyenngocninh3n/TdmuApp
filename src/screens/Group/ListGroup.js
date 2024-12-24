import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import { RESPONSE_STATUS, SCOPE } from '../../utils/Constants'
import SpaceComponent from '../../components/SpaceComponent'
import { navigationRef } from '../../store'
import RowComponent from '../../components/RowComponent'
import AvatarComponent from '../../components/AvatarComponent'
import GoBackComponent from '../../components/GoBackComponent'
import { OpacityButtton } from '../../components/ButtonComponent'

const ListGroupScreen = ({ navigation, route }) => {
  const userID = route.params.userID
  console.log('Listgroupscreen re-render: ', userID)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    // API.getAllgroupAPI().then((response) => {
    //   if (response.status === RESPONSE_STATUS.SUCCESS) {
    //     setGroups(response.data)
    //   }
    // })

    API.getGroupsByUserIDAPI(userID).then((response) => {
      console.log('response getGroupsByUserIDApi: ', response)
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setGroups(response.data)
      }
    })
  }, [])

  const handleClickAddGroup = () => navigationRef.navigate('NewGroupScreen')
  const handleNavigateGroup = (groupID) => navigationRef.navigate('GroupScreen', {groupID})

  return (
    <View style={{ flex: 1 }}>
      {/* <Text onPress={handleClickAddGroup}>Create New Group</Text> */}
      <GoBackComponent title={'Nhóm đã tham gia'} hasBorder />
      <SpaceComponent height={24} />
      <FlatList
        data={groups}
        keyExtractor={(item, index) => item._id}
        style={{ flex: 1, marginHorizontal: 16 }}
        renderItem={({ item, index }) => (
          <RowComponent style={{ backgroundColor: '#eee', alignItems:'flex-start' }}>
            <AvatarComponent onPress={()=> handleNavigateGroup(item._id)} style={{ borderRadius: 10 }} source={API.getFileUrl(item.avatar)} />
            <SpaceComponent width={16} />
            <View>
              <OpacityButtton title={item.name} onPress={()=> handleNavigateGroup(item._id)} textStyle={{ fontSize: 18, fontWeight: '600', color: '#111' }} />
              <SpaceComponent height={8} />
              <RowComponent>
                <Text>{item.scope === SCOPE.PUBLIC ? 'Nhóm công khai' : 'Nhóm riêng tư'}</Text>
                <SpaceComponent width={8} />
                <Text>{item.memberLength} thành viên</Text>
              </RowComponent>
              <SpaceComponent height={6} />
              <OpacityButtton textColor={'#21f'} title={'Đã tham gia'} bgColor={'#25e2'} />
            </View>
          </RowComponent>
        )}
      />
    </View>
  )
}

export default ListGroupScreen
