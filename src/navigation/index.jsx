import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthNavigation from './auth'
import MainNavigation from './main'
import auth from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'
import ChattingScreen from '../screens/convenition/chatting'
import { navigationRef, Provider } from '../store'
import NewPost from '../screens/Post/NewPost'
import ProfileScreen from '../screens/Profile'
import DetailScreen from '../screens/convenition/Detail'
import FileViewing from '../screens/convenition/FileViewing'
import BackgroundConvention from '../screens/convenition/BackgroundConvention'
import AkaScreen from '../screens/convenition/AkaScreen'
import MemberScreen from '../screens/convenition/Member'
import SearchConventionScreen from '../screens/convenition/SearchConvention'
import ConvenitionScreen from '../screens/convenition/home'
import CreateGroup from '../screens/convenition/CreateGroup'
import ConventionName from '../screens/convenition/ConventionName'
import EditPost from '../screens/Post/EditPost'
import FriendScreen from '../screens/Friend'
const Stack = createNativeStackNavigator()

const Navigation = () => {
  const [user, setUser] = useState()
  const onListenAuthStateChanged = (state) => setUser(state)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onListenAuthStateChanged)
    return subscriber
  }, [])

  return (
    <Provider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <Stack.Screen name="auth" component={AuthNavigation} />
          ) : (
            <>
              <Stack.Screen name="main" component={MainNavigation} />
              {/* PROFILE */}
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="FriendScreen" component={FriendScreen} />

              {/* POST */}
              <Stack.Screen name="EditPostScreen" component={EditPost} />
              <Stack.Screen name="NewPostScreen" component={NewPost} />

              {/* CONVENTION */}
              <Stack.Screen name="ConventionScreen" component={ConvenitionScreen} />
              <Stack.Screen name="ChattingScreen" component={ChattingScreen} />
              <Stack.Screen name="DetailScreen" component={DetailScreen} />
              <Stack.Screen name="FileViewingScreen" component={FileViewing} />
              <Stack.Screen name="MemberScreen" component={MemberScreen} />
              <Stack.Screen name="AkaScreen" component={AkaScreen} />
              <Stack.Screen name="ConventionNameScreen" component={ConventionName} />
              <Stack.Screen name="SearchConventionScreen" component={SearchConventionScreen} />
              <Stack.Screen name="BackgroundConventionScreen" component={BackgroundConvention} />
              <Stack.Screen name="CreateGroupScreen" component={CreateGroup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default Navigation
