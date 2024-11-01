import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import SubHeader from '../../components/Header/SubHeader'
import Story from '../../components/Stories'
import Post from '../../components/Post'
import Colors from '../../utils/Colors'
const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({})

  
  // useEffect(() => {
  //   firestore()
  //     .collection('users')
  //     .doc(auth().currentUser.uid)
  //     .get()
  //     .then((documentSnapshot) => {
  //       if (documentSnapshot.exists) {
  //         setUser(documentSnapshot.data())
  //       }
  //     })
  // }, [])

  return (
    <ScrollView >
      <View >
        {/* <SubHeader navigation={navigation} user={user} /> */}
        <Story />
        {/* <Post navigation={navigation} /> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: Colors.background
  }
})

export default HomeScreen
