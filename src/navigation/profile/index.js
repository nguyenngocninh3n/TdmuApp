import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import IntroduceScreen from '../../screens/Profile/IntroduceScreen'
const ProfileTab = createMaterialTopTabNavigator()

const ProfileTopTabNavigator = () => {
  return (
    <ProfileTab.Navigator
    
    >
      <ProfileTab.Screen
      key={'introduceScreen'}
        name="IntroduceScreen"
        component={IntroduceScreen}
      />
    </ProfileTab.Navigator>
  )
}

export default ProfileTopTabNavigator
