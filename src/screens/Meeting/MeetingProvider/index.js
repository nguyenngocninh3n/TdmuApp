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

const handleCreateMeetingId = async (tokenParam, targetID) => {
  console.log('handle create meeting id: ', tokenParam)
  const id = await createMeeting({ tokenParam, targetID })
  console.log('id: ', id)
  return id
}

const MeetingProviderScreen = ({ navigation, route }) => {
  const [meetingId, setMeetingId] = useState()
  const [token, setToken] = useState()

  // const targetInfo = route.params?.targetInfo ?? {}
  // const ownerInfo = route.params?.ownerInfo ?? {}
  const {targetID, targetInfo, ownerInfo} = route.params

  const fetchMeetingIdAndToken = async () => {
    //Fetch the token and meetingId and update it in the state
    const newToken = await handleGetToken()
    const newMeetingId = await handleCreateMeetingId(newToken, targetID)
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
    const checkAudioPermission = await checkPermission('audio').then((value) =>
      console.log('check audio: ', value)
    ) //For getting audio permission
    const checkVideoPermission = await checkPermission('video').then((value) =>
      console.log('check video: ', value)
    ) //For getting video permission
    const checkAudioVideoPermission = await checkPermission('audio_video').then((value) =>
      console.log('check audio - video: ', value)
    ) //For getting both audio and video permissions
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
      requestAudioVideoPermission().then(() => {
        fetchMeetingIdAndToken()
      })
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
        webcamEnabled: false,
        participantId:ownerInfo._id
      }}
      // Pass the generated token
      token={token}
      joinWithoutInteraction={true}
    >
      <MeetingView targetInfo={targetInfo} ownerInfo={ownerInfo} />
    </MeetingProvider>
  ) : (
    // <JoinScreen getMeetingId={fetchMeetingIdAndToken} />
    <></>
  )
}

export default MeetingProviderScreen
