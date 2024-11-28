import { MediaStream, RTCView, useParticipant, useMeeting } from '@videosdk.live/react-native-sdk'
import { Text, View } from 'react-native'
import SpaceComponent from '../../../components/SpaceComponent'
import AvatarComponent from '../../../components/AvatarComponent'
import { API } from '../../../api'
import { useEffect, useState } from 'react'

export default function ParticipantView({ participantId, targetID, ownerInfo, join }) {
  const { webcamStream, webcamOn } = useParticipant(participantId)

  return webcamOn && webcamStream ? (
    <RTCView
      streamURL={new MediaStream([webcamStream.track]).toURL()}
      objectFit={'cover'}
      style={{
        height: 300,
        marginVertical: 8,
        marginHorizontal: 8
      }}
    />
  ) : (
    <View
      style={{
        backgroundColor: '#ccc',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <AvatarComponent
        size={120}
        style={{ margin: 0, padding: 0 }}
        source={API.getFileUrl(ownerInfo.avatar)}
      />
      <Text>{ownerInfo.userName}</Text>
      <SpaceComponent height={16} />
    </View>
  )
}
