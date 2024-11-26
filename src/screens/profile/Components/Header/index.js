import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

import { useCustomContext } from '../../../../store'
import AvatarComponent from '../../../../components/AvatarComponent'
import ColumnComponent from '../../../../components/ColumnComponent'
import RowComponent from '../../../../components/RowComponent'
import GlobalStyle from '../../../../assets/css/GlobalStyle'
import { API } from '../../../../api'
import SpaceComponent from '../../../../components/SpaceComponent'
import { OpacityButtton } from '../../../../components/ButtonComponent'

const BoxInfor = ({ title, value }) => {
  return (
    <ColumnComponent style={styles.userInfoItem}>
      <Text style={styles.userInfoTitle}>{value}</Text>
      <Text style={styles.userInfoSubTitle}>{title}</Text>
    </ColumnComponent>
  )
}
const Header = ({ navigation, children, user, ownerID }) => {
  const [oldScreen, setOldScreen] = useState('')
  const isOwner = user._id === ownerID
  console.log('isOwner: ', isOwner)
  const handleUpdateBio = () => {
    navigation.navigate('BioScreen', {user})
  }
  return (
    <View>
      {/* AVATAR AND NAME */}
      <View style={styles.container}>
        <AvatarComponent source={API.getFileUrl(user.avatar)} style={styles.userImg} />
        <Text style={styles.userName}>{user.userName}</Text>
        <OpacityButtton
          title={isOwner ? user.bio || 'Thêm tiểu sử...' : user.bio || ''}
          onPress={isOwner ? handleUpdateBio : null}
        />
      </View>
      {/* BAR */}
      {children}
      {/* FOLLOWER AND FOLLOWING
      <RowComponent style={styles.userInfoWrapper}>
        <BoxInfor title="Posts" value={10} />
        <BoxInfor title="Follower" value={12} />
        <BoxInfor title="Following" value={15} />
      </RowComponent> */}
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
    height: 120,
    width: 120
  },
  userName: {
    fontSize: 22,
    fontWeight: '400',
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
