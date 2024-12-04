import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Story from '../../components/Stories'
import Colors from '../../utils/Colors'
import NewPostBox from '../../components/NewPostBox'
import { useCustomContext } from '../../store'
const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({})

  const [state, dispatch] = useCustomContext()
  console.log('state in home screen: ', state)
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
