import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Story from '../../components/Stories'
import Colors from '../../utils/Colors'
import NewPostBox from '../../components/NewPostBox'
import FlatListPostNewFeed from '../../components/FlatListPostNewFeed'
import { useCustomContext } from '../../store'
const HomeScreen = ({ navigation }) => {
  const [state, dispatch] = useCustomContext()
  return (
    <ScrollView>
      <View>
        {/* <SubHeader navigation={navigation} user={user} /> */}
        <Story />
        <NewPostBox navigation={navigation} />
        {state && <FlatListPostNewFeed />}
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
