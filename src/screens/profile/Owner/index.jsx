/* eslint-disable react-native/no-inline-styles */
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import GlobalStyle from '../../../assets/css/GlobalStyle'
import Colors from '../../../utils/Colors'
import OwnerBar from '../Components/OwnerBar'
import { useCustomContext } from '../../../store'
import { API } from '../../../api'
import FlatListPost from '../../../components/FlatListPost'
import SpaceComponent from '../../../components/SpaceComponent'

const ListPost = ({ userID }) => {
  const [postsData, setPostsData] = useState({})
  useEffect(() => {
    API.getUserPostsAPI(userID).then((data) => {
      console.log('posts data: ', postsData)
      setPostsData(data)
    })
  }, [])

  return <FlatListPost data={postsData} />
}

const OwnerProfile = ({ navigation }) => {
  const [state, dispatch] = useCustomContext()
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>
        <Header user={state}>
          <OwnerBar />
        </Header>
        <View style={styles.postContainer}>
        <SpaceComponent height={32} />
          <ListPost userID={state._id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OwnerProfile

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
