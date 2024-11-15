import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { useCustomContext } from '../../../../store'
import AvatarComponent from '../../../../components/AvatarComponent'
import ColumnComponent from '../../../../components/ColumnComponent'
import RowComponent from '../../../../components/RowComponent'
import GlobalStyle from '../../../../assets/css/GlobalStyle'
import { API } from '../../../../api'

const BoxInfor = ({ title, value }) => {
  return (
    <ColumnComponent style={styles.userInfoItem}>
      <Text style={styles.userInfoTitle}>{value}</Text>
      <Text style={styles.userInfoSubTitle}>{title}</Text>
    </ColumnComponent>
  )
}
const Header = ({ navigation, children, user }) => {
  const [oldScreen, setOldScreen] = useState('')
  return (
    <View>
      {/* AVATAR AND NAME */}
      <View style={styles.container}>
        <AvatarComponent source={API.getFileUrl(user.avatar)} style={styles.userImg} />
        <Text style={styles.userName}>{user.userName}</Text>
      </View>
      {/* BAR */}
      {children}
      {/* FOLLOWER AND FOLLOWING */}
      <RowComponent style={styles.userInfoWrapper}>
        <BoxInfor title="Posts" value={10} />
        <BoxInfor title="Follower" value={12} />
        <BoxInfor title="Following" value={15} />
      </RowComponent>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  userImg: {
    marginTop: 48,
    height: 150,
    width: 150
  },
  userName: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0f5fff',
    marginTop: 10,
    marginBottom: 10
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10
  },

  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10
  },
  userInfoItem: {
    justifyContent: 'center'
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  }
})
