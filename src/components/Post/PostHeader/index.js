/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import React, { useState } from 'react'
// import Modal from 'react-native-modal'

import Colors from '../../../utils/Colors'
import RowComponent from '../../RowComponent'
import AvatarComponent from '../../AvatarComponent'
import DateTimeComponent from '../../DateTimeComponent'
const onDeletePost = async () => {}

const ShowOptions = () => {}

const GetOptions = ({ navigation, options_state }) => {
  return (
    <SafeAreaView style={{ flexDirection: 'column', justifyContent: 'center' }}>
      <Modal
        style={{
          flexDirection: 'column',
          marginLeft: 0,
          marginBottom: 0,
          justifyContent: 'flex-start',
          height: '80%',
          width: '100%',
          marginTop: 300,
          backgroundColor: '#fff'
        }}
        onBackdropPress={() => {
          // setOptions_state(false)
        }}
        onBackButtonPress={() => {
          // setOptions_state(false)
        }}
        isVisible={options_state}
      >
        <View style={styles.optionContainer_item}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditPost', { dataPost: {}/*data*/ })
            }}
          >
            <Text style={styles.optionText}>Sửa bài viết</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer_item}>
          <TouchableOpacity onPress={onDeletePost}>
            <Text style={styles.optionText}>Xóa bài viết</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  )
}


const toProfile = (navigation) => {}

const PostHeader = ({ data, navigation }) => {
  const [options_state, setOptions_state] = useState(false)
  const [user, setUser] = useState({})

  return (
    <View style={styles.postHeaderContainer}>
      <View style={styles.postTopSec}>
        <RowComponent>
          <AvatarComponent source={user.avatar} />
          <View style={styles.userSection}>
            <Text>owner post name</Text>
            <DateTimeComponent timestamp={111} />
          </View>
        </RowComponent>
      </View>
      <Text style={styles.caption}>{data.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  postHeaderContainer: {
    padding: 16
  },

  optionContainer_item: {
    width: '100%',
    borderColor: '#eee',
    paddingLeft: 10,
    justifyContent: 'center',
    height: 50,
    borderWidth: 1
  },
  optionText: {
    fontWeight: '700',
    fontSize: 18
  },

  userProfile: {
    height: 40,
    width: 40,
    borderRadius: 50
  },

  row: {
    flexDirection: 'row'
  },

  postTopSec: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    fontSize: 16,
    color: Colors.textColor,
    marginBottom: 2
  },
  userSection: {
    marginLeft: 12
  },
  days: {
    fontSize: 14,
    color: Colors.textGrey
  },
  dot: {
    fontSize: 14,
    color: Colors.textGrey,
    paddingHorizontal: 8
  },
  userIcon: {
    marginTop: 3
  },
  headerIcons: {
    marginRight: 20
  },
  caption: {
    color: Colors.grey,
    fontSize: 15,
    marginTop: 10
  }
})

export default PostHeader
