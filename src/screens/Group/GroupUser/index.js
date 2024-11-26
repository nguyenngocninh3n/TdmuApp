import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import GoBackComponent from '../../../components/GoBackComponent'
import AvatarComponent from '../../../components/AvatarComponent'
import { API } from '../../../api'
import SpaceComponent from '../../../components/SpaceComponent'
import { helper } from '../../../utils/helpers'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import { OpacityButtton } from '../../../components/ButtonComponent'

const GroupUserScreen = ({ navigation, route }) => {
  const { userID, groupID, groupName } = route.params
  const [groupUser, setGroupUser] = useState({})
  const handleViewProfile = () => navigation.navigate("ProfileScreen", {userID})
  useEffect(() => {
    API.getGroupMemberByUserIDAPI(groupID, userID).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS && response.data != null) {
        setGroupUser(response.data)
      }
    })
  }, [])

  return (
    <View>
      <GoBackComponent title={groupName} borderColor={'#ccc'} borderWidth={1} />
      <View style={styles.container}>
        <AvatarComponent style={styles.memberAvatar} source={API.getFileUrl(groupUser.avatar)} />
        <SpaceComponent height={16} />
        <Text style={styles.memberName}>{groupUser.userName}</Text>
        <SpaceComponent height={16} />
        <Text style={styles.text}>
          Thành viên của nhóm <Text style={[styles.text, styles.groupName]}>{groupName}</Text> từ{' '}
          {helper.DateTimeHelper.displayDayMonthYearFromDate(groupUser.createdAt)}
        </Text>
        <SpaceComponent height={16} />
        <OpacityButtton onPress={handleViewProfile} bgColor={'#21f'} borderRadius={20} padding={4} title={'Xem trang cá nhân'} textColor={'#fff'}/>
      </View>
      <View style={styles.container}>
        <Text style={{fontSize:20, color:'#333', fontWeight:600}}>Bài viết trong nhóm</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16
  },

  memberAvatar: {
    width: 150,
    height: 150
  },

  memberName: {
    fontSize: 24,
    color: '#666',
    fontWeight: '800',
    marginLeft:8,
    minWidth:150,
  },

  groupName: {
    fontWeight: '500',
    color: '#aaf'
  },
  text: {
    fontSize: 16
  }
})

export default GroupUserScreen
