import { View, Text, TextInput } from 'react-native'
import React from 'react'
import SearchComponent from '../../components/SearchComponent'
import GoBackComponent from '../../components/GoBackComponent'

const SearchScreen = ({ navigation }) => {
  const handleSearch = (value) => {
    navigation.navigate('SearchResultScreen', { search: value })
  }

  return (
    <View>
      <SearchComponent title={'Tìm kiếm'} margin={4} onSearch={handleSearch} />
    </View>
  )
}

export default SearchScreen
