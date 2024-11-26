import { Modal, StyleSheet, Text, View } from 'react-native'
import SpaceComponent from '../components/SpaceComponent'
import { OpacityButtton } from '../components/ButtonComponent'
import RowComponent from '../components/RowComponent'

const PopUpModal = ({ modalVisible, title, subtitle, onCancle, onSubmit }) => {
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
        <View style={{ borderWidth:1, borderColor:'#aaa', borderRadius:24}}>
          <View>
            <Text style={styles.modalTitle}>{title}</Text>
            <SpaceComponent height={12} />
            <Text style={{fontSize:14, textAlign:'left', marginHorizontal:24}}>{subtitle}</Text>
            <SpaceComponent height={24} />
            <RowComponent>
              <OpacityButtton onPress={onCancle} style={{flex:1}} textStyle={styles.modalBtnText} title={'Hủy'} />
              <OpacityButtton  onPress={onSubmit} style={{flex:1}} textStyle={styles.modalBtnText} title={'Xác nhận'} />
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
    backgroundColor: '#fff',
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
    marginTop: 16,
    marginHorizontal: 16,
    color: '#661',
    fontSize: 17,
    fontWeight: '500'
  },
  modalBtnText: {
    color: 'blue',
    fontWeight: '400',
    fontSize: 16
  }
})

export default PopUpModal
