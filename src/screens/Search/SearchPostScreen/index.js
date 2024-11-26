import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import { API } from '../../../api'
import { useCustomContext } from '../../../store'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import SearchComponent from '../../../components/SearchComponent'
import WrappedFlatListPost from '../../../components/WrappedFlatlistPost'

const renderHeader = (search, onSearch) => {
  return <SearchComponent title={'Tìm kiếm...'} value={search} onSearch={onSearch} />
}

const SearchPostScreen = ({ navigation, route }) => {
  const search = route.params.search ?? ''
  const [state, dispatch] = useCustomContext()
  const [postData, setPostData] = useState([])
  const [searchResult, setSearchResult] = useState('')
  const handleSearch = (value) => setSearchResult(value)

  useEffect(() => {
    setSearchResult(search)
  }, [search])

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => renderHeader(search, handleSearch)
    })
  }, [])

  useEffect(() => {
    console.log('search value: ', search)
    API.searchPostAPI(state._id, search).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        response.data && setPostData(response.data)
      }
    })
  }, [])

  return (
    <View>
      <Text>SearchPostScreen</Text>
      <SpaceComponent height={16} />
      <WrappedFlatListPost data={postData} ownerID={state._id} />
    </View>
  )
}

export default SearchPostScreen
