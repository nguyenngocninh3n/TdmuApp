import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Story from '../../components/Stories'
import Colors from '../../utils/Colors'
import NewPostBox from '../../components/NewPostBox'
const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({})

  return (
    <ScrollView >
      <View >
        {/* <SubHeader navigation={navigation} user={user} /> */}
        <Story />
        <NewPostBox navigation={navigation} />
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
