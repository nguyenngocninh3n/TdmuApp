import React, { useEffect, useState } from 'react'
import { OpacityButtton } from '../../../../components/ButtonComponent'
import RowComponent from '../../../../components/RowComponent'
import { StyleSheet } from 'react-native'
import SpaceComponent from '../../../../components/SpaceComponent'
import { API } from '../../../../api'
import { FRIEND_STATUS } from '../../../../utils/Constants'

const CustomButton = ({ title, onPress }) => {
  return (
    <OpacityButtton
      style={styles.userBtn}
      textStyle={styles.userBtnTxt}
      title={title}
      onPress={onPress}
    />
  )
}

const handleCLick = {
  addFriend: async ({ ownerID, userID }) => {
    const response = await API.updateStatusFriend({
      ownerID,
      userID,
      status: FRIEND_STATUS.PENDING
    })
    console.log('respone add friend in userbar: ', response)
  },

  acceptFriend: async ({ ownerID, userID }) => {
    const response = await API.updateStatusFriend({
      ownerID: ownerID,
      userID: userID,
      status: FRIEND_STATUS.ACCEPTING
    })
    console.log('respone accept friend in userbar: ', response)
  },

  refuseFriend: async ({ ownerID, userID }) => {
    const response = await API.updateStatusFriend({
      ownerID,
      userID,
      status: FRIEND_STATUS.REFUSING
    })
    console.log('respone refuse friend in userbar: ', response)
  }
}

const FriendStatusButton = ({ status, ownerID, userID }) => {
  switch (status) {
    case FRIEND_STATUS.NONE:
      return (
        <CustomButton
          title={'Thêm bạn bè'}
          onPress={() => handleCLick.addFriend({ ownerID, userID })}
        />
      )
    case FRIEND_STATUS.PENDING:
      return <CustomButton title={'Đã gửi lời mời kết bạn'} />
    case FRIEND_STATUS.ACCEPTING:
      return (
        <CustomButton
          title={'Đồng ý kết bạn'}
          onPress={() => handleCLick.acceptFriend({ ownerID, userID })}
        />
      )
    case FRIEND_STATUS.FRIEND:
      return <CustomButton title={'Bạn bè'} />
    default:
      return <CustomButton title={'Thêm bạn bè'} />
  }
}
const UserBar = ({ navigation, ownerID, userID }) => {
  const [statusFriend, setStatusFriend] = useState()
  const handleChat = async () => {
    const conventionID = await API.getConventionID(ownerID, userID)
    navigation.navigate('ChattingScreen', { conventionID, userID })
  }

  useEffect(() => {
    API.getStatusFriend({ ownerID, userID }).then((data) => {
      setStatusFriend(data.status)
    })
  }, [])

  return (
    <RowComponent style={styles.userBtnWrapper}>
      <FriendStatusButton status={statusFriend} ownerID={ownerID} userID={userID} />
      <SpaceComponent width={20} />
      <OpacityButtton
        onPress={handleChat}
        title="Nhắn tin"
        style={{ backgroundColor: '#af2', padding: 10 }}
        textStyle={styles.userBtnTxt}
      />
    </RowComponent>
  )
}

export default UserBar

const styles = StyleSheet.create({
  userBtnWrapper: {
    justifyContent: 'center',
    marginBottom: 10
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userBtnTxt: {
    // color: '#2e64e5'
    color: 'blue'
  }
})
