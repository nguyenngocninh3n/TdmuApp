import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RowComponent from '../../../RowComponent'
import AvatarComponent from '../../../AvatarComponent'
import SpaceComponent from '../../../SpaceComponent'
import ColumnComponent from '../../../ColumnComponent'
import { helper } from '../../../../utils/helpers'

const PostHeader = ({ createdAt, name, avatar }) => {
  return (
    <RowComponent alignItems>
      <AvatarComponent source={avatar} />
      <SpaceComponent width={12} />
      <ColumnComponent>
        <Text style={styles.userName}>{name}</Text>
        <Text>{helper.DateTimeHelper.displayTimeDescendingFromDate(createdAt)}</Text>
      </ColumnComponent>
    </RowComponent>
  )
}

export default PostHeader

const styles = StyleSheet.create({
  userName: {
    fontSize: 16,
    fontWeight: '700'
  }
})
