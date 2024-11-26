import { View, Text } from 'react-native'
import React from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import { SCOPE } from '../../../utils/Constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { navigationRef } from '../../../store'

const groupScope = {
  [SCOPE.PUBLIC]: 'Nhóm công khai',
  [SCOPE.PRIVATE]: 'Nhóm riêng tư'
}

const HeaderGroup = ({ group, onShowModal }) => {
  console.log('header group re-render')
  return (
    <View style={{ marginHorizontal: 12 }}>
      <Text style={{ height: 100, width: '100%', textAlign: 'center', fontSize: 24 }}>Avatar</Text>
      <SpaceComponent height={16} />
      <Text style={{ fontSize: 24 }}>{group.name}</Text>
      <SpaceComponent height={16} />
      <Text>{group.bio}</Text>
      <SpaceComponent height={16} />
      <RowComponent>
        {group.scope === SCOPE.PUBLIC ? (
          <Ionicons name="earth" size={22} />
        ) : (
          <Entypo name="lock" size={22} />
        )}
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 15 }}>{groupScope[group.scope]}</Text>
        <SpaceComponent width={32} />
        <Text>{group.memberLength} thành viên</Text>
        <OpacityButtton left style={{ flex: 1 }} onPress={onShowModal}>
          <Ionicons name="settings-outline" style={{ textAlign: 'right' }} size={22} />
        </OpacityButtton>
        <SpaceComponent width={8} />
      </RowComponent>
    </View>
  )
}

export default HeaderGroup
