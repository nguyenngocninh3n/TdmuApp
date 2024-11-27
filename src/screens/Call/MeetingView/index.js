import { Text, View } from 'react-native'
import ControlsContainer from '../ControlContainer'
import ParticipantList from '../ParticianList'
import { useMeeting } from '@videosdk.live/react-native-sdk'

export default function MeetingView() {
  const { join, leave, toggleWebcam, toggleMic, participants, meetingId } = useMeeting({})
  const participantsArrId = [...participants.keys()]
  console.log('participantsArrID: ', participantsArrId)
  return (
    <View style={{ flex: 1 }}>
        {meetingId ? (
        <Text style={{fontSize: 18, padding: 12}}>Meeting Id :{meetingId}</Text>
      ) : null}
      <ParticipantList participants={participantsArrId} />
      <ControlsContainer
        join={join}
        leave={leave}
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
      />
    </View>
  )
}
