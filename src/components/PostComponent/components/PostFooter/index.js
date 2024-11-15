import React from 'react'
import RowComponent from '../../../RowComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { OpacityButtton } from '../../../ButtonComponent'
import { Button, Pressable } from 'react-native'
import SpaceComponent from '../../../SpaceComponent'
const reaction = {
  none: 'heart',
  react: 'heart-fill'
}
const PostFooter = () => {
  return (
    <RowComponent>
      <OpacityButtton children={<Octicons name={reaction.none} size={22} />} />
      <SpaceComponent width={32} />
      <OpacityButtton children={<Octicons name="comment" size={22} />} />
      <SpaceComponent width={32} />
      <OpacityButtton children={<Octicons name="share-android" size={22} />} />
    </RowComponent>
  )
}

export default PostFooter
