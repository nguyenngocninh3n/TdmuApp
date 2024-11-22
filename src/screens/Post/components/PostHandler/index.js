import { View, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import SpaceComponent from '../../../../components/SpaceComponent'
import ImageLibrary from '../../../../components/ImageLibrary'
import MixedViewing from '../../../../components/MixedViewing'
import AvatarComponent from '../../../../components/AvatarComponent'
import PostInput from '../PostInput'
import { API } from '../../../../api'
import GlobalStyle from '../../../../assets/css/GlobalStyle'
import OpacityButtton from '../../../../components/ButtonComponent/OpacityButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RNFS from 'react-native-fs'
import { MESSAGE_TYPE, POST_ATTACHMENT } from '../../../../utils/Constants'
import { navigationRef, useCustomContext } from '../../../../store'
import DropDownRole from '../DropDownRole'
import RowComponent from '../../../../components/RowComponent'

const PostHandler = ({ postData, files, onSubmit, editable }) => {
  console.log('post handler re-render: ', postData.scope)
  const [state, dispatch] = useCustomContext()
  const [atttachments, setAttachments] = useState(files)
  const [scopePost, setScopePost] = useState(postData.scope)
  const postInputRef = useRef({ value: postData.content })

  useEffect(() => {
    if(files !== atttachments) {
      setAttachments(files)
    }
  }, [files])

  useEffect(() => {
      setScopePost(postData.scope)
  }, [postData])

  const handlePost = async () => {
    const customAttachments = []
    if (atttachments) {
      if (atttachments !== files) {
        for (const item of atttachments) {
          const data = await RNFS.readFile(item.customPath, 'base64')
          customAttachments.push({
            source: data,
            type: item.type
          })
        }
      } else {
        customAttachments.push(...atttachments)
      }
    }
    if (editable) {
      console.log('scope post  edit: ', scopePost)
      onSubmit(state._id, customAttachments, postInputRef.current.value, scopePost)
    } else {
      console.log('scope post not edit: ', scopePost)
      onSubmit(state._id, customAttachments, postInputRef.current.value, scopePost)
    }
  }

  const handleChosenFiles = useCallback((data) => {
    setAttachments(data)
  }, [])

  const handleChangeScope = useCallback((newValue) => {
    setScopePost(newValue)
  }, [])

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigationRef.goBack()}>
          <AntDesign name="leftcircleo" color="#13f" size={30} />
        </TouchableOpacity>
        <OpacityButtton
          onPress={handlePost}
          activeOpacity={0.6}
          title="Đăng"
          textStyle={{ fontSize: 22, marginRight: 20, color: 'blue' }}
        />
      </View>

      <RowComponent style={styles.inputContainer}>
        <AvatarComponent source={API.getFileUrl(state.avatar)} />
        <RowComponent>
          <SpaceComponent width={8} />
          <DropDownRole initValue={scopePost } callback={handleChangeScope} />
        </RowComponent>
      </RowComponent>
      <PostInput ref={postInputRef} value={postData.content} />
      <View style={{ flexDirection: 'row-reverse' }}>
        <SpaceComponent width={16} />
        <ImageLibrary callback={handleChosenFiles} type={POST_ATTACHMENT.MIX} />
      </View>
      <SpaceComponent height={48} />
      <MixedViewing attachments={atttachments ?? []} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#d8D9DB'
  },
  inputContainer: {
    margin: 20
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

export default PostHandler
