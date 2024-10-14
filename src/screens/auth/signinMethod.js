import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const configGoogleMethod = async () => {
  GoogleSignin.configure({
    webClientId: '77194624099-c6bfhn2iencledrpov9b8169nfl2f157.apps.googleusercontent.com'
  })
}

const signOutWithGoogle = async () => {
  await configGoogleMethod()
  GoogleSignin.signOut()
    .then((result) => {
      console.log('log out success', result)
      auth().signOut()
    })
    .catch((error) => console.log('error when sign out', error))
}

async function signInWithGoogle() {
  //config google signin method
  await configGoogleMethod()

  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

  // Get the users ID token
  let idToken = ''
  await GoogleSignin.signIn().then((data) => (idToken = data.data.idToken))

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  await auth()
    .signInWithCredential(googleCredential)
    .then((value) => {
      console.log('Login success')
    })
    .catch((error) => console.log('error when sigin with credential: ', error))
}

export { signInWithGoogle, signOutWithGoogle }
