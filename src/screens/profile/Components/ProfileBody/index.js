import { View, Text } from 'react-native'
import React, { useState } from 'react'
import RowComponent from '../../../../components/RowComponent'
import { OpacityButtton } from '../../../../components/ButtonComponent'
import SpaceComponent from '../../../../components/SpaceComponent'
import FlatListPost from '../../../../components/FlatListPost'
import FriendScreen from '../../../Friend'
import NewPostBox from '../../../../components/NewPostBox'


const ProfileBody = ({ navigation, userID, ownerID }) => {
  const handleClickFriend = () => navigation.navigate('FriendScreen', { userID: userID })
  const handleClickImage = () => {}
  const handleClickVideo = () => {}

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <RowComponent style={{ justifyContent: 'space-around' }}>
        <OpacityButtton title={'Bạn bè'} onPress={handleClickFriend} />
        <OpacityButtton title={'Ảnh'} onPress={handleClickImage} />
        <OpacityButtton title={'Video'} onPress={handleClickVideo} />
      </RowComponent>
      {ownerID === userID && <NewPostBox navigation={navigation} />}
      <SpaceComponent height={8} />

    </View>
  )
}

export default ProfileBody
