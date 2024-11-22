import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import SpaceComponent from '../SpaceComponent'
import ColumnComponent from '../ColumnComponent'

const NewPostBox = ({ navigation }) => {
  const handleCreateNewPost = () => {
    navigation.navigate('NewPostScreen')
  }

  return (
    <ColumnComponent style={styles.container} onPress={handleCreateNewPost}>
      <View>
        <SpaceComponent height={12} />
        <Text style={{ fontWeight: 'bold' }}>NewPostBox</Text>
        <TextInput onFocus={handleCreateNewPost} placeholder="Ngày hôm nay của bạn thế nào..." />
      </View>
    </ColumnComponent>
  )
}

export default NewPostBox

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingLeft: 20,
    marginTop: 12
  }
})
