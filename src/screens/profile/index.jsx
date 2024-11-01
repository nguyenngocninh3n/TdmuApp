import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Button, Text, View } from 'react-native'
import { signOutWithGoogle } from '../auth/signinMethod'
import useCustomContext from '../../store/hooks'

const ProfileScreen = () => {
  const [state, dispatch] = useCustomContext()
  return (
    <View>
      <Text>This is profile screen</Text>
      <Button title="log current user" onPress={() => console.log(GoogleSignin.getCurrentUser())} />
      <Button title="logout" onPress={signOutWithGoogle} />
      <Button title="log store user: " onPress={() => console.log(state)} />
    </View>
  )
}

export default ProfileScreen
