import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native'
import { signInWithGoogle } from './signinMethod'

import { actions, useCustomContext } from '../../store'
import SpaceComponent from '../../components/SpaceComponent'

const LoginScreen = () => {
  const [state, dispatch] = useCustomContext()

  async function handleLogin() {
    const userLogin = await signInWithGoogle()
    console.log('user login in login screen: ', userLogin)
    if(userLogin === 'cancel') {
      console.log('Cancel')
    }
    else if (userLogin) {
      ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.LONG)
      dispatch(actions.onLogin(userLogin))
    } else {
      ToastAndroid.show('Tài khoản không có trong dữ liệu của trường!', ToastAndroid.LONG)
    }
  }

  return (
    <View style={styles.container}>
      <SpaceComponent height={64} />
      <Image style={styles.image} source={require('../../assets/images/logo_tdmu.png')} />
      <Text style={{textAlign:'center', fontStyle:'italic'}}>Ứng dụng dành riêng cho sinh viên</Text>
      <Text style={{textAlign:'center', fontStyle:'italic'}}>trường đại học Thủ Dầu Một</Text>
      <SpaceComponent height={200} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Đăng nhập bằng email trường</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1
    backgroundColor: '#fff',
    flex: 1
  },
  image: {
    alignSelf: 'center'
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 8
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff'
  }
})
