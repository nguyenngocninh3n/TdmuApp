import AntDesign from 'react-native-vector-icons/AntDesign'
import HomeScreen from '../screens/home'
import NotificationScreen from '../screens/Notificaton'
import OwnerProfile from '../screens/Profile/Owner'

const TabData = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    icon: ({ focused, color, size }) => <AntDesign name="home" focused={focused} color={color ?? '#ccc'} size={24} />
  },
  {
    name: 'OwnerProfile',
    component: OwnerProfile,
    icon: ({ focused, color, size }) => <AntDesign name="user" focused={focused} color={color ?? '#ccc'} size={24} />
  },
  {
    name: 'NotificationScreen',
    component: NotificationScreen,
    icon: ({ focused, color, size }) => <AntDesign name="tablet1" focused={focused} color={color ?? '#ccc'} size={24} />
  }
]

export default TabData
