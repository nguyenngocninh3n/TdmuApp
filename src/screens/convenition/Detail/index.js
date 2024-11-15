import { View, Text } from 'react-native'
import React from 'react'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { API } from '../../../api'
import MemberScreen from '../Member'

const DetailScreen = ({ navigation, route }) => {
  const { conventionID, name, avatar, members, chatData } = route.params

  const handleClickFileViewing = () => {
    navigation.navigate('FileViewingScreen', { conventionID })
  }

  const handleClickAvtarConvention = () => {
    navigation.navigate('BackgroundConventionScreen', { conventionID, avatar })
  }

  const handleClickAka = () => {
    navigation.navigate('AkaScreen', { conventionID, members })
  }

  const handleClickMember = () => {
    const customMembers = Object.values(members).map(value => value)
    console.log('customMember: ', customMembers)
    navigation.navigate('MemberScreen', { members: customMembers })
  }

  const handleClickSearch = () => {
    navigation.navigate('SearchConventionScreen', {chatData, conventionID, members: Object.values(members).map(value => value)})
  }

  return (
    <View style={{ marginHorizontal: 16 }}>
      <SpaceComponent height={48} />
      <View style={{ alignItems: 'center' }}>
        <AvatarComponent source={API.getFileUrl(avatar)} size={140} />
        <SpaceComponent height={8} />
        <Text style={{ fontSize: 24 }}>{name}</Text>
      </View>
      <SpaceComponent height={32} />

      {/* AVATAR */}
      <RowComponent alignItems onPress={handleClickAvtarConvention}>
        <Ionicons name="image-outline" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Avatar</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* MEMBERS */}
      <RowComponent alignItems onPress={handleClickMember}>
        <MaterialIcons name="people" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Thành viên</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* AKA */}
      <RowComponent alignItems onPress={handleClickAka}>
        <Ionicons name="text" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Biệt danh</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* SEARCH */}
      <RowComponent alignItems onPress={handleClickSearch}>
        <Ionicons name="search-outline" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Tìm kiếm trong cuộc trò chuyện</Text>
      </RowComponent>
      <SpaceComponent height={20} />

      {/* IMAGE & VIDEO */}
      <RowComponent alignItems onPress={handleClickFileViewing}>
        <MaterialIcons name="photo-library" size={24} />
        <SpaceComponent width={8} />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Ảnh và video</Text>
      </RowComponent>
    </View>
  )
}

export default DetailScreen
