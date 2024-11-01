import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthNavigation from './auth'
import MainNavigation from './main'
import auth from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'
import ChatingScreen from '../screens/convenition/chating'
import { Provider } from '../store'
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
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <Stack.Screen name="auth" component={AuthNavigation} />
          ) : (
            <>
              <Stack.Screen name="main" component={MainNavigation} />
              <Stack.Screen name="ChatingScreen" component={ChatingScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default Navigation
