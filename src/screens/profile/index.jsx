import { useEffect } from 'react'
import { useCustomContext } from '../../store'
import UserProfile from './User'

const ProfileScreen = ({ navigation, route }) => {
  const userID = route?.params?.userID
  const [state, dispatch] = useCustomContext()
  const isOwnerProfile = !userID || userID === state._id
  console.log('check isowner:  value', isOwnerProfile)
  useEffect(() => {
    if (isOwnerProfile) {
      console.log('isowner: ', state._id)
      navigation.navigate('OwnerProfile', {ownerID: state._id, userID: state._id})
    }
  }, [])
  if (isOwnerProfile) {
    return <></>
  } else {
    return <UserProfile navigation={navigation} ownerID={state._id} userID={userID} />
  }
}

export default ProfileScreen
