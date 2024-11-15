import { View, SafeAreaView, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import React, { useRef } from 'react'
import { useState } from 'react'
import RNFS from 'react-native-fs'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AvatarComponent from '../../../components/AvatarComponent'
import GlobalStyle from '../../../assets/css/GlobalStyle'
import OpacityButtton from '../../../components/ButtonComponent/OpacityButton'

import { useCustomContext } from '../../../store'
import ImageLibrary from '../../../components/ImageLibrary'
import SpaceComponent from '../../../components/SpaceComponent'
import PostInput from '../components/PostInput'
import { POST_ATTACHMENT, RESPONSE_STATUS } from '../../../utils/Constants'
import MixedViewing from '../../../components/MixedViewing'
import { API } from '../../../api'

const NewPost = ({ navigation }) => {
  console.log('newpost re-render')
  const [state, dispatch] = useCustomContext()
  const [atttachments, setAttachments] = useState([])
  const postInputRef = useRef({ value: '' })

  const handleChosenFiles = (data) => {
    setAttachments(data)
  }

  const handlePost = async () => {
    const customAttachments = []
    for (const item of atttachments) {
      const data = await RNFS.readFile(item.uri.replace('file://', ''), 'base64')
      customAttachments.push({
        source: data,
        type: item.type
      })
    }
    const newPostData = {
      userID: state._id,
      attachments: customAttachments,
      content: postInputRef.current.value
    }
    API.storePostAPI(newPostData).then((result) => {
      if (result === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Thêm bài viết thành công', ToastAndroid.LONG)
        navigation.goBack()
      }
      else {
        ToastAndroid.show('Lỗi khi thêm bài viết', ToastAndroid.LONG)
      }
    })
  }

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" color="#13f" size={30} />
        </TouchableOpacity>
        <OpacityButtton
          onPress={handlePost}
          activeOpacity={0.6}
          title="Đăng"
          textStyle={{ fontSize: 24, marginRight: 20, color: 'blue' }}
        />
      </View>
      <View style={styles.inputContainer}>
        <AvatarComponent source={state.avatar} />
        <PostInput ref={postInputRef} />
      </View>
      <View style={{ flexDirection: 'row-reverse' }}>
        <SpaceComponent width={16} />
        <ImageLibrary callback={handleChosenFiles} type={POST_ATTACHMENT.MIX} />
      </View>
      <SpaceComponent height={48} />
      <MixedViewing attachments={atttachments} />
    </SafeAreaView>
  )
}

export default NewPost

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d8D9DB'
  },
  inputContainer: {
    margin: 20,
    flexDirection: 'row'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  imgPost: {
    width: '100%',
    height: '100%'
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32
  }
})
