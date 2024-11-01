import { Button, StyleSheet, Text, View } from 'react-native'
import { signInWithGoogle } from './signinMethod'
import useCustomContext from '../../store/hooks'
import { actions } from '../../store/action'

const LoginScreen = () => {
  const [state, dispatch] = useCustomContext()

  async function handleLogin() {
    const userLogin = await signInWithGoogle()
    console.log('after login: user: ', userLogin)
    dispatch(actions.onLogin(userLogin))
  }

  return (
    <View style={styles.loginBackground}>
      <Text>This is login screen</Text>
      <Button onPress={handleLogin} title="sign in" />
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
