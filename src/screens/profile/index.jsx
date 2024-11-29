import { useEffect } from 'react'
import {  useCustomContext } from '../../store'
import { API } from '../../api'
import auth from '@react-native-firebase/auth'
const ProfileScreen = ({ navigation, route }) => {
  console.log('route params in profile screen: ', route.params?.userID)
  const userID = route?.params?.userID
  const [state, dispatch] = useCustomContext()
  const isOwnerProfile = !userID || userID === state?._id || userID === 'undefined'
  useEffect(() => {
    if (!state) {
      
      API.getUserByIdAPI({ uid: auth().currentUser.uid }).then((data) => {
        if (isOwnerProfile || userID === data._id) {
          navigation.navigate('OwnerProfileScreen', { ownerID: data._id, userID: data._id })
        } else {
          navigation.navigate('UserProfileScreen', { ownerID: data._id, userID: userID })
        }
      })
    } else if (isOwnerProfile) {
      navigation.navigate('OwnerProfileScreen', { ownerID: state._id, userID: state._id })
    } else {
      navigation.navigate('UserProfileScreen', { ownerID: state._id, userID: userID })
    }
  }, [])

  return (<></>)
}

export default ProfileScreen
