import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabData from '../../data/TabData'
import { useEffect } from 'react'
import { actions, useCustomContext } from '../../store'
import { API } from '../../api'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Text } from 'react-native'
import Header from '../../components/Header'
import auth from '@react-native-firebase/auth'
import ListGroupScreen from '../../screens/Group/ListGroup'
import CallScreen from '../../screens/Call'
import VideoCallWrapperProvider from '../../screens/Call/VideoCallWrapperProvider'
import MeetingProviderScreen from '../../screens/Call copy/MeetingProvider'
// import AntDesign from 'react-native-vector-icons/AntDesign'
const Tab = createBottomTabNavigator()
const MainNavigation = ({navigation}) => {
  const [state, dispatch] = useCustomContext()
  useEffect(() => {
    ;(async () => {
      if (state == null) {
        const id = auth().currentUser.uid
        const user = await API.getUserByIdAPI({ uid: id })
        dispatch(actions.onLogin(user))
      }
    })()
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => {
          return <Header navigation={navigation} />
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
          options={{
            tabBarActiveTintColor: '#005AFF',
            tabBarShowLabel: false,
            tabBarIcon: item.icon
          }}
        />
      ))}
      <Tab.Screen name="ListGroupScreen" component={ListGroupScreen} />
      <Tab.Screen name="MeetingScreen" component={MeetingProviderScreen} />
      <Tab.Screen name="CallScreen" component={VideoCallWrapperProvider} />
    </Tab.Navigator>
  )
}

export default MainNavigation
