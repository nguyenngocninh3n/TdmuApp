import { FlatList, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ShortChatingComponent from './ShortChatComponent'
import { useCustomContext } from '../../../store'
import { API } from '../../../api'
import SpaceComponent from '../../../components/SpaceComponent'
import { useFocusEffect } from '@react-navigation/native'

const FlatListConvention = ({ navigation }) => {
  const [state, dispatch] = useCustomContext()
  const [conventions, setConventions] = useState([])

  useFocusEffect(
    useCallback(() => {
      API.getOwnerConventions(state._id).then((data) => {
        data.length && setConventions(data ?? [])
      })
    }, [])
  )

  useEffect(() => {
    API.getOwnerConventions(state._id).then((data) => {
      data.length && setConventions(data ?? [])
    })
  }, [])

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' }}>
      <FlatList
        style={{ flexDirection: 'column', flex: 1 }}
        data={conventions}
        ItemSeparatorComponent={<SpaceComponent height={16} />}
        renderItem={({ item, index }) => (
          <ShortChatingComponent convention={item} navigation={navigation} ownerID={state._id} />
        )}
      />
    </View>
  )
}

export default FlatListConvention
