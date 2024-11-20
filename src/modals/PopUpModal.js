import { Modal, StyleSheet, Text, View } from 'react-native'
import SpaceComponent from '../components/SpaceComponent'
import { OpacityButtton } from '../components/ButtonComponent'
import RowComponent from '../components/RowComponent'

const PopUpModal = ({ modalVisible, onCancle, onSubmit }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onCancle
      }}
    >
      <View style={styles.pressableContainer}>
        <View style={{ borderStartColor: '#000' }}>
          <View>
            <Text style={styles.modalTitle}>Chuyển bài viết này vào thùng rác?</Text>
            <SpaceComponent height={24} />
            <RowComponent>
              <OpacityButtton onPress={onCancle} style={{ flex: 1, }} title={'Hủy'} />
              <OpacityButtton submit onPress={onSubmit} style={{ flex: 1 }} title={'Xác nhận'} />
            </RowComponent>
            <SpaceComponent height={16} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  pressableContainer: {
    backgroundColor: '#eee',
    marginTop: '50%',
    marginHorizontal: 40,
    borderRadius:20
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
    right: 0
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

export default PopUpModal
