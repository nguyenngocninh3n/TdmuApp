import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchComponent from '../../../components/SearchComponent'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SearchPostScreen from '../SearchPostScreen'
import SearchUserScreen from '../SearchUserScreen'
import SearchGroupScreen from '../SearchGroupScreen'

const Tab = createMaterialTopTabNavigator()

const SearchResultScreen = ({ navigation, route }) => {
  console.log('search result re-render: ', route.params)
  const { search } = route.params

  return (
    <Tab.Navigator
      style={{ justifyContent: 'center', margin: 0, padding: 0 }}
      screenOptions={{
        tabBarLabelStyle: stypes.tabBarLabelStyle,
        tabBarItemStyle: stypes.tabBarStyle,
        tabBarStyle: stypes.tabBarContainer
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Bài viết'
        }}
        name="SearchPostScreen"
        component={SearchPostScreen}
        initialParams={{ search }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Người dùng'
        }}
        name="SearchUserScreen"
        component={SearchUserScreen}
        initialParams={{ search }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Nhóm'
        }}
        name="SearchGroupScreen"
        component={SearchGroupScreen}
        initialParams={{ search }}
      />
    </Tab.Navigator>
  )
}

const stypes = StyleSheet.create({
  tabBarStyle: {
    margin: 0,
    paddingTop: 8,
    marginBottom: 8,
    height: 32,
    justifyContent: 'flex-start'
  },
  tabBarLabelStyle: {
    textTransform: 'none'
  },
  tabBarContainer: {}
})

export default SearchResultScreen
