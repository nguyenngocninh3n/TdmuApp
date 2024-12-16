import { Modal, Pressable, StyleSheet, View } from 'react-native'

import CreatePollScreen from '../../screens/convenition/Vote'

const PollModal = ({ modalVisible, onCancle, onSubmit }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onCancle()
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={onCancle}>
        <View style={styles.modalContainer}>
          <CreatePollScreen
            onSendMessage={onSubmit}
            onCancel={onCancle}
          />
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#bbb',
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 32,
    marginHorizontal: 12,
    paddingVertical: 8,
    paddingLeft: 16
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

export default PollModal
