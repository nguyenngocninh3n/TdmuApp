import { ImageBackground, Text, View } from 'react-native'
import { useMeeting } from '@videosdk.live/react-native-sdk'
import ParticipantList from '../ParticipanList'
import ControlsContainer from '../ControlContainer'
import { API } from '../../../api'
import { useEffect } from 'react'
import SocketClient from '../../../socket'

export default function MeetingView({ ownerID, targetID, ownerInfo, targetInfo, reply }) {
  // Get `participants` from useMeeting Hook
  const { join, leave, toggleWebcam, toggleMic, participants, meetingId } = useMeeting({})
  const participantsArrId = [...participants.keys()]

  useEffect(() => {
    if (meetingId && !reply) {
      SocketClient.socket.emit('call', {
        targetID,
        senderID: ownerID,
        senderName: ownerInfo.userName,
        senderAvatar: ownerInfo.avatar,
        meetingId,
        members: targetInfo.members
      })
    }
  }, [meetingId])

  return (
    <ImageBackground source={{ uri: API.getFileUrl(targetInfo.avatar) }} style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 20 }}>
        {targetInfo.name}
      </Text>
      <ParticipantList participants={participantsArrId} />
      <ControlsContainer join={join} leave={leave} toggleWebcam={toggleWebcam} toggleMic={toggleMic} />
    </ImageBackground>
  )
}
