import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabData from '../../data/TabData'
import Header from '../../components/Header'
import ListGroupScreen from '../../screens/Group/ListGroup'
import MeetingProviderScreen from '../../screens/Meeting/MeetingProvider'
import StoryScreen from '../../screens/Story'
// import AntDesign from 'react-native-vector-icons/AntDesign'
const Tab = createBottomTabNavigator()
const MainNavigation = ({ navigation }) => {

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
      <Tab.Screen name="StoryScreen" component={StoryScreen} />
    </Tab.Navigator>
  )
}

export default MainNavigation
