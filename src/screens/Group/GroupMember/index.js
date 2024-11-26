import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchComponent from '../../../components/SearchComponent'
import GoBackComponent from '../../../components/GoBackComponent'
import { API } from '../../../api'
import { MEMBER_ROLE, RESPONSE_STATUS } from '../../../utils/Constants'
import SpaceComponent from '../../../components/SpaceComponent'
import groupStype from '../groupStyle'
import UserRowComponent from '../../../components/UserRowComponent'
import RowComponent from '../../../components/RowComponent'
import FlatlistMembers from './component/FlatlistMembers'
import { useCustomContext } from '../../../store'

const CustomItem = ({ item, onOption }) => {

}

const GroupMemberScreen = ({ navigation, route }) => {
  console.log('group member screen re-render')
  const { groupID, groupName } = route.params
  const [groupMembers, setGroupMembers] = useState([])

  useEffect(() => {
    API.getGroupMembersByIDAPI(groupID).then((response) => {
      console.log('response: ', response)
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        setGroupMembers(response.data)
      }
    })

   
  }, [groupID])


  return (
    <View>
      <GoBackComponent bgColor={'#2fa'} textColor={'#333'} title={'Thành viên'} />
      <View style={groupStype.container}>
        <FlatlistMembers data={groupMembers} navigation={navigation} groupID={groupID} groupName={groupName} />
      </View>
    </View>
  )
}

export default GroupMemberScreen
