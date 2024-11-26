import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import SpaceComponent from '../SpaceComponent'
import ColumnComponent from '../ColumnComponent'
import AvatarComponent from '../AvatarComponent'
import { navigationRef, useCustomContext } from '../../store'
import { API } from '../../api'
import RowComponent from '../RowComponent'

const NewPostBox = ({ navigation, title, groupID }) => {
  const handleCreateNewPost = () => {
    navigationRef.navigate('NewPostScreen', {groupID})
  }
  const [state, dispatch] = useCustomContext()

  return (
    <RowComponent style={styles.container} onPress={handleCreateNewPost}>
      <AvatarComponent source={API.getFileUrl(state?.avatar)} size={36} />
      <SpaceComponent width={8} />
      <TextInput
        style={styles.textInput}
        onFocus={handleCreateNewPost}
        placeholder={title ?? 'Hãy viết gì đó...'}
      />
      <SpaceComponent width={8} />
    </RowComponent>
  )
}

export default NewPostBox

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    paddingLeft: 24,
    paddingVertical: 12
  },

  textInput: {
    flex: 1,
    padding: 2,
    paddingLeft: 16,
    marginRight: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc'
  }
})
