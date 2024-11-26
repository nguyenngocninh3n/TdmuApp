/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Colors from '../../../utils/Colors'
import OwnerBar from '../Components/OwnerBar'

import ProfileBody from '../Components/ProfileBody'
import { useCustomContext } from '../../../store'

const OwnerProfile = ({ navigation, route }) => {
  const [state, dispatch] = useCustomContext()
  return (
    <ScrollView>
      <Header user={state} ownerID={state._id} navigation={navigation}>
        <OwnerBar />
      </Header>
      <ProfileBody navigation={navigation} ownerID={state._id} userID={state._id} />
    </ScrollView>
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
    backgroundColor: Colors.white,
    height: 500
  },
  postImg: {
    width: '100%',
    height: 200,
    paddingLeft: 200,
    paddingRight: 200
  }
})
