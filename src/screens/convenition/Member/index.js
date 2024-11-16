import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import { API } from '../../../api'
import GoBackComponent from '../../../components/GoBackComponent'

const MemberScreen = ({ navigation, route }) => {
  const members = route.params.members

  const handleClickMember = (userID) => {
    navigation.navigate('ProfileScreen', { userID: userID })
  }

  return (
    <View style={{ marginHorizontal: 16 }}>
      <GoBackComponent />
      <SpaceComponent height={32} />
      <Text style={{textAlign:'center', fontWeight:'500', fontSize:18, color: 'blue', marginBottom:16}}>Danh sách thành viên</Text>
      {members.map((item, index) => (
        <RowComponent alignItems key={index} style={{ marginBottom: 16 }}>
          <AvatarComponent size={48} source={API.getFileUrl(item.avatar)} />
          <SpaceComponent width={16} />
          <RowComponent onPress={() => handleClickMember(item._id)}>
            <Text style={{ fontWeight: '700', fontSize: 16 }}>{item.userName}</Text>
            {item.role && <Text>{item.role}</Text>}
          </RowComponent>
        </RowComponent>
      ))}
    </View>
  )
}

export default MemberScreen
