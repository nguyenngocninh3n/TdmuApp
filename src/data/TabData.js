import AntDesign from 'react-native-vector-icons/AntDesign'
import HomeScreen from '../screens/home'
import NotificationScreen from '../screens/Notificaton'
import OwnerProfile from '../screens/Profile/Owner'

const TabData = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    icon: () => <AntDesign name="home" size={24} />
  },
  {
    name: 'OwnerProfile',
    component: OwnerProfile,
    icon: () => <AntDesign name="user" size={24} />
  },
  {
    name: 'NotificationScreen',
    component: NotificationScreen,
    icon: () => <AntDesign name="tablet1" size={24} />
  }
]

export default TabData
