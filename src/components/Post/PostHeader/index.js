/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import React, { useEffect, useState } from 'react'
import UserProfile from '../../../assets/images/post1.jpeg'
// import Modal from 'react-native-modal'
import firestore from '@react-native-firebase/firestore'
import { SafeAreaView } from 'react-native-safe-area-context'

import auth from '@react-native-firebase/auth'
import Colors from '../../../utils/Colors'

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

const GetImage = ({ source }) => {
  if (source === '' || source === null) {
    return
  } else {
    return <Image source={{ uri: source }} style={styles.userProfile} />
  }
}

const getDisplayTime = ({ timestamp }) => {
  let date_temp = new Date(timestamp)
  var date_string = ''

  if (Date.now() - timestamp <= 50400000) {
    let numHours = date_temp.getHours()
    let numMinutes = date_temp.getMinutes()

    let hours = numHours < 10 ? '0' + numHours.toString() : numHours.toString()
    let minutes = numMinutes < 10 ? '0' + numMinutes.toString() : numMinutes.toString()
    date_string = hours + ':' + minutes
  } else if (Date.now() - timestamp <= 50400000 * 7) {
    let day = date_temp.getDay() + 1
    date_string = 'Thứ ' + day
  } else if (date_temp.getFullYear() === new Date().getFullYear()) {
    date_string = date_temp.getDate().toString() + '/' + (date_temp.getMonth() + 1).toString()
  } else {
    date_string =
      date_temp.getDate().toString() +
      '/' +
      (date_temp.getMonth() + 1).toString() +
      '/' +
      date_temp.getFullYear().toString()
  }
  return date_string
}

const formatDate = (timestamp) => {
  return getDisplayTime({ timestamp: timestamp })
}

const toProfile = (navigation) => {}

const PostHeader = ({ data, navigation }) => {
  const [options_state, setOptions_state] = useState(false)

  const [user, setUser] = useState({})
  useEffect(() => {
    firestore()
      .collection('users')
      .doc(data.ownerID)
      .get()
      .then((documentSnapshot) => {
        // console.log('User exists: ', documentSnapshot.exists);
        if (documentSnapshot.exists) {
          // console.log('PostHeader - User exist: ');
          setUser(documentSnapshot.data())
        }
      })
  }, [])

  return (
    <View style={styles.postHeaderContainer}>
      <View style={styles.postTopSec}>
        <View style={styles.row}>
          <TouchableOpacity onPress={toProfile}>
            <GetImage source={user.avatar} />
          </TouchableOpacity>
          <View style={styles.userSection}>
            <TouchableOpacity onPress={toProfile}>
              <Text style={styles.username}>{user.name}</Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.days}>{formatDate(data.timestamp)}</Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setOptions_state(true)
            }}
          >
            <ShowOptions />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.caption}>{data.content}</Text>
      <GetOptions navigation={navigation} options_state={options_state} />
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
