import { Text, View } from 'react-native'
import ControlsContainer from '../ControlContainer'
import ParticipantList from '../ParticianList'
import { MediaStream, useMeeting } from '@videosdk.live/react-native-sdk'
import JoinScreen from '../JoinScreen'
import { useEffect } from 'react'
import ParticipantView from '../ParticianView'
import AvatarComponent from '../../../components/AvatarComponent'
import { API } from '../../../api'
import ColumnComponent from '../../../components/ColumnComponent'
import SpaceComponent from '../../../components/SpaceComponent'

export default function MeetingView({targetInfo, ownerInfo, targetID}) {
  const { join, leave, toggleWebcam, toggleMic, participants, meetingId, enableWebcam, disableWebcam } = useMeeting({})
  const participantsArrId = [...participants.keys()]
  console.log('participantsArrID: ', participantsArrId, ' ', meetingId)

  const handleToggleWebCam = () => {
    console.log('toggle webcam: ')
    toggleWebcam()
  }

  
  useEffect(() => {
    console.log('webcam status: ')
    join()
  }, [])

  // useEffect(() => { join()}, [])
  return (
    <View style={{ flex: 1 }}>
       <ColumnComponent style={{justifyContent: 'center', alignItems:'center'}} >
        <AvatarComponent size={120} style={{margin:0, padding:0}} source={API.getFileUrl(targetInfo.avatar)} />
        <Text>{targetInfo.name}</Text>
        <SpaceComponent height={16} />
       </ColumnComponent>
      <ParticipantList participants={participantsArrId} join={join} targetID={targetID} ownerInfo={ownerInfo} />
      <ControlsContainer
        join={join}
        leave={leave}
        toggleWebcam={handleToggleWebCam}
        toggleMic={toggleMic}
      />
    </View>
  )
}
