import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchComponent from '../../../components/SearchComponent'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SearchPostScreen from '../SearchPostScreen'
import SearchUserScreen from '../SearchUserScreen'
import SearchGroupScreen from '../SearchGroupScreen'
import { navigationRef } from '../../../store'
import SearchFileScreen from '../SearchFileScreen'

const Tab = createMaterialTopTabNavigator()

const SearchResultScreen = ({ navigation, route }) => {
  const [search, setSearchResult] = useState('')
  const [isSearched, setIsSearched] = useState(false)
  const handleSearch = (value) => {
    const customValue = value.trim()
    setSearchResult(customValue)
    if (customValue !== '') {
      isSearched === false && setIsSearched(true)
      navigationRef.setParams({ search: customValue })
    }
  }

  const onGoBack = () => navigation.goBack()

  return (
    <View style={{ flex: 1 }}>
      <SearchComponent value={search} onGoBack={onGoBack} onSearch={handleSearch} />
      {isSearched && (
        <Tab.Navigator
          style={{ justifyContent: 'center', margin: 0, padding: 0, flex: 1 }}
          screenOptions={{
            tabBarLabelStyle: stypes.tabBarLabelStyle,
            tabBarItemStyle: stypes.tabBarStyle,
            tabBarStyle: stypes.tabBarContainer,
            lazy: true
          }}
          initialRouteName="SearchPostScreen"
          screenListeners={{ focus: () => navigationRef.setParams({ search: search }), blur: () => navigation.un }}
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
           <Tab.Screen
            options={{
              tabBarLabel: 'File phương tiện '
            }}
            name="SearchFileScreen"
            component={SearchFileScreen}
            initialParams={{ search }}
          />
        </Tab.Navigator>
      )}
    </View>
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
