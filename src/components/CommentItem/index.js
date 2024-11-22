import {
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
import AvatarComponent from '../AvatarComponent'
import ColumnComponent from '../ColumnComponent'
import RowComponent from '../RowComponent'
import SpaceComponent from '../SpaceComponent'
import { helper } from '../../utils/helpers'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import BottomModal from '../../modals/BottomModal'
import { OpacityButtton } from '../ButtonComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import { navigationRef } from '../../store'

const CommentItem = React.memo(
  ({ item, parentName, ownerID, onEdit, onDelete, onReact, onReply, onClose }) => {
    console.log('re-render comment item: ', item.content)

    const [modalVisible, setModalVisible] = useState(false)
    const handleShowModal = () => setModalVisible(true)
    const handleCloseModal = () => setModalVisible(false)

    const handleEdit = () => onEdit(item)
    const handleDelete = () => onDelete(item)
    const handleReact = () => onReact(item._id)
    const handleReply = () => onReply(item)
    const handleNavigate = () => {
      onClose()
      navigationRef.navigate('ProfileScreen', { userID: item.parentUserID })
    }

    return (
      <View>
        <SpaceComponent height={item.parentID ? 0 : 12} />
        <RowComponent
          style={{ alignItems: 'flex-start', marginLeft: item.parentID !== null ? 32 : 0 }}
        >
          <AvatarComponent source={API.getFileUrl(item.avatar)} size={28} />
          <SpaceComponent width={8} />
          <View style={{ flex: 1 }}>
            <ColumnComponent style={styles.wrapperComment} onLongPress={handleShowModal}>
              <View>
                <RowComponent>
                  <Text style={{ fontSize: 13 }}>{item.userName}</Text>
                  <SpaceComponent width={8} />
                  <Text style={{ fontSize: 12 }}>
                    {helper.DateTimeHelper.displayTimeDescendingFromDate(item.createdAt)}
                  </Text>
                </RowComponent>
                <SpaceComponent height={4} />
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, color: '#000' }}>
                    <Text onPress={handleNavigate} style={{ fontSize: 15, color: '#11fa' }}>
                      {item.parentUserName}{' '}
                    </Text>
                    {item.content}
                  </Text>
                </View>
              </View>
            </ColumnComponent>
            <RowComponent>
              <SpaceComponent width={14} />
              {item.reactions.findIndex((item) => item === ownerID) === -1 ? (
                <OpacityButtton title={'Thích'} onPress={handleReact} />
              ) : (
                <OpacityButtton
                  textStyle={{ fontWeght: '700' }}
                  submit
                  title={'Đã thích'}
                  onPress={handleReact}
                />
              )}
              <SpaceComponent width={16} />
              <OpacityButtton
                textStyle={{ fontWeght: '700' }}
                title={'Trả lời'}
                onPress={handleReply}
              />
            </RowComponent>
          </View>
          <SpaceComponent width={16} />
          {item.reactions.length > 0 && (
            <View style={{ width: 32, alignItems: 'center' }}>
              <Octicons name={'heart'} size={18} />
              <SpaceComponent height={4} />
              <Text>{item.reactions.length}</Text>
            </View>
          )}
          <BottomModal
            modalVisible={modalVisible}
            onClose={handleCloseModal}
            onDelete={handleDelete}
            onReact={handleReact}
            onEdit={handleEdit}
            onReply={handleReply}
            ownerID={ownerID}
            userID={item.userID}
            content={item.content}
          />
        </RowComponent>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  wrapperComment: {
    backgroundColor: '#eee',
    borderRadius: 16,
    marginRight: 20,
    paddingHorizontal: 24,
    paddingVertical: 4
  }
})

export default CommentItem
