import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import { API } from '../../../api'

const MemberScreen = ({ navigation, route }) => {
  const members = route.params.members

  const handleClickMember = (userID) => {
    navigation.navigate('ProfileScreen', { userID: userID })
  }

  return (
    <View style={{ marginHorizontal: 16 }}>
      <SpaceComponent height={50} />
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
