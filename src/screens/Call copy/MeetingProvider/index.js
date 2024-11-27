// importing
import { MeetingProvider, useMediaDevice } from '@videosdk.live/react-native-sdk'
import MeetingView from '../MeetingView'
import { useEffect, useState } from 'react'
import { getMeetingId, createMeeting, getToken } from '../videocall'
import JoinScreen from '../JoinScreen'

const handleGetToken = async () => {
    const value = getToken()
    console.log('token: ', value)
  return value
}
const handleGetMeetingId = async (tokenParam) => {
  const id = await getMeetingId(tokenParam)
  console.log('id: ', id)
  return id
}

const handleCreateMeetingId = async (tokenParam) => {
  console.log('handle create meeting id: ',tokenParam)
    const id = await createMeeting({tokenParam})
  console.log('id: ', id)
  return id
}

const MeetingProviderScreen = () => {
  const [meetingId, setMeetingId] = useState()
  const [token, setToken] = useState()

  const fetchMeetingIdAndToken = async (id) => {
    //Fetch the token and meetingId and update it in the state
    const newToken = await handleGetToken()
    const newMeetingId = await handleCreateMeetingId(newToken)
    console.log('token and id: ', newToken, ' ', newMeetingId)
    setToken(newToken)
    setMeetingId(newMeetingId)
  }

  const {
    checkPermission,
    checkBlueToothPermission,
    requestPermission,
    requestBluetoothPermission,
    getCameras,
    getDevices,
    getAudioDeviceList
  } = useMediaDevice()

  const checkMediaPermission = async () => {
    //These methods return a Promise that resolve to a Map<string, boolean> object.
    const checkAudioPermission = await checkPermission('audio') //For getting audio permission
    const checkVideoPermission = await checkPermission('video') //For getting video permission
    const checkAudioVideoPermission = await checkPermission('audio_video') //For getting both audio and video permissions
    const checkBTPermission = await checkBlueToothPermission()
  }

  const requestAudioVideoPermission = async () => {
    try {
      //These methods return a Promise that resolve to a Map<string, boolean> object.
      const requestAudioPermission = await requestPermission('audio') //For Requesting Audio Permission
      const requestVideoPermission = await requestPermission('video') //For Requesting Video Permission
      const requestAudioVideoPermission = await requestPermission('audio_video') //For Requesting Audio and Video Permissions

      // Applicable only to Android; not required for iOS
      const checkBTPermission = await requestBluetoothPermission() //For requesting Bluetooth Permission.
    } catch (ex) {
      console.log('Error in requestPermission ', ex)
    }
  }

  useEffect(() => {
    //Load the token and generate a meeting id and pass it to the Meeting Provider
    checkMediaPermission().then((data) => {
      requestAudioVideoPermission()
    })
  }, [])

  // Init Meeting Provider
  return token && meetingId ? (
    <MeetingProvider
      config={{
        // Pass the generated meeting id
        meetingId: meetingId,
        name: 'NAME HERE',
        micEnabled: true,
        webcamEnabled: true
      }}
      // Pass the generated token
      token={token}
      joinWithoutInteraction={true}
    >
      <MeetingView />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingId={fetchMeetingIdAndToken} />

  )
}

export default MeetingProviderScreen
