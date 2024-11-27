import React, { useState } from 'react'
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  RTCView,
  MediaStream
} from '@videosdk.live/react-native-sdk'
import MeetingView from './MeetingView'

const CallScreen = () => {
  return (
    <MeetingProvider
      config={{
        meetingId: 'undefined',
        micEnabled: true,
        webcamEnabled: true,
        name: "Ninh's Org"
      }}
      token="undefined"
    >
      <MeetingView />
    </MeetingProvider>
  )
}
export default CallScreen
