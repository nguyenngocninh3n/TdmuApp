import { useEffect } from 'react'
import { useCustomContext } from '../../store'
import UserProfile from './User'

const ProfileScreen = ({ navigation, route }) => {
  const userID = route?.params?.userID
  const [state, dispatch] = useCustomContext()
  const isOwnerProfile = !userID || userID === state._id
  useEffect(() => {
    if (isOwnerProfile) {
      navigation.navigate('OwnerProfile')
    }
  })
  if (isOwnerProfile) {
    return <></>
  } else {
    return <UserProfile navigation={navigation} ownerID={state._id} userID={userID} />
  }
}

export default ProfileScreen
