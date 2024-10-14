import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabData from '../../data/TabData'
// import AntDesign from 'react-native-vector-icons/AntDesign'
const Tab = createBottomTabNavigator()
const MainNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {TabData.map((item) => (
        <Tab.Screen
          name={item.name}
          component={item.component}
          key={item.name}
          options={{ tabBarShowLabel: false, tabBarIcon: item.icon }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default MainNavigation
