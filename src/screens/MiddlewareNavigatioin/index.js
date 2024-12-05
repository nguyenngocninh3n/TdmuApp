import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TYPE_SCREEN } from '../../utils/Constants'
import ChattingScreen from '../convenition/chatting'
import { actions, useCustomContext } from '../../store'
import { API } from '../../api'

const MiddleWareNavigationScreen = ({ navigation, route }) => {
  const { screen, conventionID, ownerID } = route.params
  const [stateValue, dispatch] = useCustomContext()
  const [ownerInfo, setOwnerInfo] = useState()
  useEffect(() => {
    API.getUserByIdAPI({ uid: ownerID }).then((response) => {
      console.log('giá trị của user là: ', conventionID)
      setOwnerInfo(response)
    })
  }, [])

  return ownerInfo ? (
    <ChattingScreen
      navigation={navigation}
      route={{ params: { conventionID, ownerInfo } }}
    />
  ) : null
}

export default MiddleWareNavigationScreen
