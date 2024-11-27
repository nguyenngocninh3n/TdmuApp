import { View, Text, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import { API } from '../../../api'
import { navigationRef, useCustomContext } from '../../../store'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import SearchComponent from '../../../components/SearchComponent'
import WrappedFlatListPost from '../../../components/WrappedFlatlistPost'
import { useFocusEffect } from '@react-navigation/native'

const SearchPostScreen = ({ navigation, route }) => {
  const [state, dispatch] = useCustomContext()
  const [postData, setPostData] = useState([])
  const { search } = route.params
  console.log('search post screen re-render: ', search)


  useFocusEffect(useCallback(() => {
    API.searchPostAPI(state._id, search).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        response.data && setPostData(response.data)
      }
    })
    return () => setPostData([])
  },[search]))

  return (
    <View>
      <SpaceComponent height={16} />
      <WrappedFlatListPost data={postData} ownerID={state._id} />
    </View>
  )
}

export default SearchPostScreen
