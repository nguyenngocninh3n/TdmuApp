import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import SpaceComponent from '../SpaceComponent'
import GoBackIcon from '../GoBackComponent/GoBackIcon'
import RowComponent from '../RowComponent'
import { OpacityButtton } from '../ButtonComponent'
import Octicons from 'react-native-vector-icons/Octicons'

const SearchCoponent = ({ onSearch, onCallback, unsearch, iconSize }) => {
  const [searchInput, setSearchInput] = useState('')

  const handleTextInputChange = (value) => {
    setSearchInput(value)
    onCallback(value)
  }

  const handleSearch = () => {
    onSearch(searchInput)
  }

  return (
    <RowComponent alignItems>
      <GoBackIcon color={'blue'} size={iconSize} />
      <SpaceComponent width={8} />
      <TextInput
        placeholder="Nhập nội dung tìm kiếm..."
        value={searchInput}
        onChangeText={handleTextInputChange}
        style={{
          flex: 1,
          borderBottomColor: '#ccc',
          borderBottomWidth: 1
        }}
      />
      <SpaceComponent width={16} />
      {!unsearch && (
        <OpacityButtton width={38} height={32} onPress={handleSearch}>
          <Octicons name="search" size={32} color={'blue'} />
        </OpacityButtton>
      )}
    </RowComponent>
  )
}

export default SearchCoponent
