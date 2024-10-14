import ConvenitionScreen from '../screens/convenition/home'
import HomeScreen from '../screens/home'
import ProfileScreen from '../screens/profile'
import AntDesign from 'react-native-vector-icons/AntDesign'
const TabData = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    icon: () => <AntDesign name="home" size={24} />
  },
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
    icon: () => <AntDesign name="user" size={24} />
  },
  {
    name: 'ConvenitionScreen',
    component: ConvenitionScreen,
    icon: () => <AntDesign name="message1" size={24} />
  }
]

export default TabData
