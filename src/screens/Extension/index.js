import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RowComponent from '../../components/RowComponent'
import SpaceComponent from '../../components/SpaceComponent'
import { WEBSITE } from '../../utils/Constants'
import { OpacityButtton } from '../../components/ButtonComponent'
import { navigate, useCustomContext } from '../../store'

const ExtensionScreen = ({ navigation }) => {
    const [state, dispatch] = useCustomContext()
  const handleToDkmh = () => navigate('WebViewScreen', { uri: WEBSITE.DKMH })
  const handleToElearning = () => navigate('WebViewScreen', {uri: WEBSITE.ELEARNING})
  const handleToFriend = () => navigate('ListFriendScreen', {userID: state._id})
  const handleToProfile = () => navigate('ProfileScreen', {userID: state._id, ownerID: state._id})
  const handleToNewPost = () => navigate('NewPostScreen')
  const handleToChatGPT = () => navigate('ChatGPTScreen')
  return (
    <View style={styles.container}>
      <RowComponent style={styles.rowContainer}>
        <OpacityButtton title={'Trang dkmh'} style={styles.itemContainer} onPress={handleToDkmh} />
        <OpacityButtton title={'Trang Elearning'} style={styles.itemContainer} onPress={handleToElearning} />
        <Text style={styles.itemContainer}>Danh sách website trường</Text>
      </RowComponent>
      <SpaceComponent height={16} />
      <RowComponent style={styles.rowContainer}>
        <OpacityButtton title={'Bạn bè'} style={styles.itemContainer} onPress={handleToFriend} />
        <Text style={styles.itemContainer}>Nhóm</Text>
        <Text style={styles.itemContainer}>Danh sách website trường</Text>
      </RowComponent>
      <SpaceComponent height={16} />
      <RowComponent style={styles.rowContainer}>
      <OpacityButtton title={'Chat GPT'} style={styles.itemContainer} onPress={handleToChatGPT} />
      <OpacityButtton title={'Trang cá nhân'} style={styles.itemContainer} onPress={handleToProfile} />
        <OpacityButtton title={'Đăng bài'} style={styles.itemContainer} onPress={handleToNewPost} />
      </RowComponent>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  rowContainer: {
    // flex: 1
    justifyContent: 'space-around'
  },
  itemContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc'
  }
})

export default ExtensionScreen
