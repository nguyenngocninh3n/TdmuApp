import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalStyle from '../../../assets/css/GlobalStyle'
import Header from '../Components/Header'
import UserBar from '../Components/UserBar'
import Colors from '../../../utils/Colors'
import { API } from '../../../api'
const UserProfile = ({ navigation, ownerID, userID }) => {
  const [user, setUser] = useState({})
  console.log('user id in userprofile: ', userID)
  const getUser = async () => {
    console.log('userID: ', userID)
    const data = await API.getUserByIdAPI({ uid: userID })
    if (data) {
      setUser(data)
    }
  }
  useEffect(() => {
    getUser()
  }, [ userID])
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header user={user}>
          <UserBar navigation={navigation} ownerID={ownerID} userID={userID} />
        </Header>
        <View style={styles.postContainer}>
          {/* <FlatList
                scrollEnabled={false}
                data={PostData}
                horizontal={false}
                renderItem={({ item }) => (
                  <View style={{ width: '100%', flex: 1 }} key={item.ownerID}>
                    <PostHeader data={item} navigation={navigation} user={user} />
                    <GetImage source={item.image} style={styles.postImg} />
                    <PostFooter data={item} />
                  </View>
                )}
              /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },

  postContainer: {
    backgroundColor: Colors.white
  },
  postImg: {
    width: '100%',
    height: 200,
    paddingLeft: 200,
    paddingRight: 200
  }
})

export default UserProfile
