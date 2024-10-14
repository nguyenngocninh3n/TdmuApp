import { Button, StyleSheet, Text, View } from 'react-native'
import { signInWithGoogle } from './signinMethod'

const LoginScreen = () => {
  return (
    <View style={styles.loginBackground}>
      <Text>This is login screen</Text>
      <Button onPress={signInWithGoogle} title="sign in" />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  loginBackground: {
    backgroundColor: '#ef1',
    height: 100,
    width: 100
  }
})
