import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpaceComponent from '../SpaceComponent'
import GoBackIcon from '../GoBackComponent/GoBackIcon'
import RowComponent from '../RowComponent'
import { OpacityButtton } from '../ButtonComponent'
import Octicons from 'react-native-vector-icons/Octicons'

const SearchComponent = ({ unGoback, onSearch, onCallback, onGoBack, padding, margin, title, value, unsearch, iconSize }) => {
  const [searchInput, setSearchInput] = useState('')

  const handleTextInputChange = (value) => {
    setSearchInput(value)
    onCallback && onCallback(value)
  }

  const handleSearch = () => {
    onSearch(searchInput)
  }
  useEffect(() => {handleTextInputChange(value)}, [])

  return (
    <RowComponent alignItems style={{padding, margin}}>
      {!unGoback && <GoBackIcon color={'blue'} size={iconSize} onNavigate={onGoBack} />}
      <SpaceComponent width={8} />
      <TextInput
        placeholder={title ?? 'Nhập nội dung tìm kiếm...'}
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

export default SearchComponent
