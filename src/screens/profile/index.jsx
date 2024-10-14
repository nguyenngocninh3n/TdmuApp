import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Button, Text, View } from 'react-native'
import { signOutWithGoogle } from '../auth/signinMethod'

const ProfileScreen = () => {
  return (
    <View>
      <Text>This is profile screen</Text>
      <Button title="log current user" onPress={() => console.log(GoogleSignin.getCurrentUser())} />
      <Button title="logout" onPress={signOutWithGoogle} />
    </View>
  )
}

export default ProfileScreen
