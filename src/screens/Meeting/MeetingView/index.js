import { View } from 'react-native'
import { useMeeting } from '@videosdk.live/react-native-sdk'
import ParticipantList from '../ParticipanList'
import ControlsContainer from '../ControlContainer'

export default function MeetingView() {
  // Get `participants` from useMeeting Hook
  const { join, leave, toggleWebcam, toggleMic, participants } = useMeeting({})
  const participantsArrId = [...participants.keys()]

  return (
    <View style={{ flex: 1 }}>
      <ParticipantList participants={participantsArrId} />
      <ControlsContainer
        join={join}
       
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
      />
    </View>
  )
}
