import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'

import { navigationRef } from '../../store'
import SpaceComponent from '../../components/SpaceComponent'
import RowComponent from '../../components/RowComponent'
import { OpacityButtton } from '../../components/ButtonComponent'
import ColumnComponent from '../../components/ColumnComponent'


const CommentModal = ({ modalVisible, onClose, ownerID, postID }) => {
  const handleCloseModal = () => onClose()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleCloseModal
      }}
    >
      <Pressable style={styles.pressableContainer} onPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          <Text>Comment modals</Text>
        </View>
      </Pressable>
    </Modal>
  )
}

export default CommentModal

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1112'
  },

  modalContainer: {
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#aaa',
    backgroundColor: '#eee',
    marginVertical: 8,
    paddingTop: 10,
    paddingLeft: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top:8
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    color: '#a2f',
    fontSize: 16,
    fontWeight: '500'
  }
})
