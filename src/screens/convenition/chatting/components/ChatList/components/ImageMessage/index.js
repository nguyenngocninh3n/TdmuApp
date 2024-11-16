import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import EnhancedImageViewing from 'react-native-image-viewing'
import { helper } from '../../../../../../../utils/helpers'
import { API } from '../../../../../../../api'
import ChatAvatar from '../ChatAvatar'

const ImageMessage = React.memo(({ message, owner, time, messageTime, avatar }) => {
  const [imageList, setImageList] = useState(() => {
    return message.split(',').map((item) => ({ uri: API.getFileUrl(item) }))
  })

  const [imageViewState, setImageViewState] = useState(false)
  const [imageViewIndex, setImageViewIndex] = useState(0)
  const formatTime = time ? helper.DateTimeHelper.displayTimeDescendingFromDate(time) : null

  const handleClickImage = (id) => {
    setImageViewIndex(id)
    setImageViewState(true)
  }

  return (
    <View style={{ flexDirection: owner ? 'row-reverse' : 'row' }}>
      {time && <Text style={{ textAlign: 'center' }}>{formatTime}</Text>}
      {!owner && <ChatAvatar avatar={avatar} size={30} />}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: owner ? 'flex-end' : 'flex-start',
          flexWrap: 'wrap',
          maxWidth: '78%'
        }}
      >
        {message.split(',').map((item, index) => (
          <TouchableOpacity
            key={'message image' + index}
            onPress={() => handleClickImage(index)}
            style={{
              width: `${message.split(',').length < 3 ? 75 / message.split(',').length : 25}%`,
              height: 100,
              marginLeft: 12,
              marginBottom: 12
            }}
          >
            <Image source={imageList.at(index)} width={'100%'} height={'100%'} />
          </TouchableOpacity>
        ))}
      </View>

      <EnhancedImageViewing
        images={imageList}
        keyExtractor={(img, index) => index}
        imageIndex={imageViewIndex}
        onImageIndexChange={(id) => setImageViewIndex(id)}
        visible={imageViewState}
        swipeToCloseEnabled
        onRequestClose={() => setImageViewState(false)}
      />
    </View>
  )
})

export default ImageMessage
