import { View, Text, TextInput } from 'react-native'
import React from 'react'
import RowComponent from '../RowComponent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SpaceComponent from '../SpaceComponent'
import { OpacityButtton } from '../ButtonComponent'
import { navigate } from '../../store'
const Header = ({ navigation }) => {
  const handleClickConvention = () => {
    navigate('ConventionScreen')
  }

  const handleClickSearch = () => {
    navigation.navigate('SearchScreen')
  }

  return (
    <RowComponent
      alignItems
      style={{
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 12
      }}
    >
      <Text>Avatar</Text>
      <RowComponent>
        <OpacityButtton
          onPress={handleClickSearch}
          children={<AntDesign name="search1" size={24} />}
        />
        <SpaceComponent width={24} />
        <OpacityButtton
          onPress={handleClickConvention}
          children={<AntDesign name="message1" size={24} />}
        />
      </RowComponent>
    </RowComponent>
  )
}

export default Header
