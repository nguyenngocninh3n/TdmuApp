import { Image } from 'react-native'
import React from 'react'

const ImageRenderComponent = ({ source, style, ...props }) => {
  return source ? <Image {...props} source={{ uri: source }} style={style} /> : <></>
}

export default ImageRenderComponent
