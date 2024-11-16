import { View, Text } from 'react-native'
import React from 'react'
import VideoComponent from '../../../../../../../components/VideoComponent'
import { API } from '../../../../../../../api'
import ChatAvatar from '../ChatAvatar'
import { helper } from '../../../../../../../utils/helpers'

const VideoMessage = React.memo(({ message, owner, style, time, messageTime, avatar }) => {
  const formatTime = time ? helper.DateTimeHelper.displayTimeDescendingFromDate(time) : null
  return (
    <View style={{ flexDirection: owner ? 'row-reverse' : 'row' }}>
      {time && <Text style={{ textAlign: 'center' }}>{formatTime}</Text>}
      {!owner && <ChatAvatar avatar={avatar} size={30} />}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: owner ? 'flex-end' : 'flex-start',
          flexWrap: 'wrap',
          maxWidth: '74%'
        }}
      >
        {message.split(',').map((item, index) => (
          <VideoComponent
            key={'video' + index}
            source={API.getFileUrl(item)}
            width={`${message.split(',').length < 3 ? 100 / message.split(',').length : 33}%`}
            height={200}
          />
        ))}
      </View>
    </View>
  )
})

export default VideoMessage
