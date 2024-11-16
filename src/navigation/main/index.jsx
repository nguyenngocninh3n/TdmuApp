import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabData from '../../data/TabData'
import { useEffect } from 'react'
import { actions, useCustomContext } from '../../store'
import { API } from '../../api'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Text } from 'react-native'
import Header from '../../components/Header'

// import AntDesign from 'react-native-vector-icons/AntDesign'
const Tab = createBottomTabNavigator()
const MainNavigation = () => {
  const [state, dispatch] = useCustomContext()
  useEffect(() => {
    ;(async () => {
      if (state == null) {
        const id = GoogleSignin.getCurrentUser().user.id
        const user = await API.getUserByIdAPI({ uid: id })
        dispatch(actions.onLogin(user))
      }
    })()
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => {
          return <Header />
        },
        headerBackgroundContainerStyle: { backgroundColor: '#fff' },
        headerBackground: '#fff',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleContainerStyle: { backgroundColor: '#fff' }
      }}
    >
      {TabData.map((item) => (
        <Tab.Screen
          name={item.name}
          component={item.component}
          key={item.name}
          options={{ tabBarActiveTintColor: '#005AFF', tabBarShowLabel: false, tabBarIcon: item.icon }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default MainNavigation
