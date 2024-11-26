import { View, Text } from 'react-native'
import React, { useState } from 'react'
import RowComponent from '../../../../components/RowComponent'
import { OpacityButtton } from '../../../../components/ButtonComponent'
import SpaceComponent from '../../../../components/SpaceComponent'
import FlatListPost from '../../../../components/FlatListPost'
import FriendScreen from '../../../Friend'
import NewPostBox from '../../../../components/NewPostBox'

const ITEM = {
  POST: 'POST',
  FRIEND: 'FRIEND',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEo'
}

const ProfileBody = ({ navigation, userID, ownerID }) => {
  const [selectedItem, setSelectedItem] = useState(ITEM.POST)

  const handleClickFriend = () => navigation.navigate('FriendScreen', { userID: userID })


  const handleChosePost = () => {
    setSelectedItem(ITEM.POST)
  }

  const handleChoseFriend = () => {
    setSelectedItem(ITEM.FRIEND)
  }

  const handleChoseImage = () => {
    setSelectedItem(ITEM.IMAGE)
  }

  const handleChoseVideo = () => {
    setSelectedItem(ITEM.VIDEO)
  }

  return (
    <View style={{backgroundColor:'#fff'}}>
      <RowComponent>
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <OpacityButtton title={'Bài viết'} onPress={handleChosePost} />
        </View>
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <OpacityButtton title={'Bạn bè'} onPress={handleChoseFriend} />
        </View>
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <OpacityButtton title={'Ảnh'} onPress={handleChoseImage} />
        </View>
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <OpacityButtton title={'Video'} onPress={handleChoseVideo} />
        </View>
      </RowComponent>
      {
        ownerID === userID && <NewPostBox navigation={navigation} />
      }
      <SpaceComponent height={8} />
      
      {selectedItem === ITEM.POST ? (
        <FlatListPost ownerID={ownerID} userID={userID} />
      ) : selectedItem === ITEM.FRIEND ? (
        <FriendScreen navigation={navigation} ownerID={ownerID} userID={userID} />
      ) : selectedItem === ITEM.IMAGE ? (
        <Text>Image</Text>
      ) : (
        <Text>Video</Text>
      )}
    </View>
  )
}

export default ProfileBody
