import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Alert
} from 'react-native'
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
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import RNFS from 'react-native-fs'
import {
  MESSAGE_TYPE,
  POLL_TYPE,
  POST_ATTACHMENT,
  RESPONSE_STATUS,
  SCOPE
} from '../../../../utils/Constants'
import { navigationRef, useCustomContext } from '../../../../store'
import DropDownRole from '../DropDownRole'
import RowComponent from '../../../../components/RowComponent'
import PollModal from '../../../../modals/PollModal'
import PollScreen from '../../../convenition/Vote/Show'
import CreatePollScreen from '../../../convenition/Vote'

const PostHandler = ({ postData, files, onSubmit, editable, groupID }) => {
  console.log('post handler re-render: ', SCOPE.PUBLIC)
  const [state, dispatch] = useCustomContext()
  const [atttachments, setAttachments] = useState(files)
  const [scopePost, setScopePost] = useState(SCOPE.PUBLIC)
  const postInputRef = useRef({ value: postData.content })

  useEffect(() => {
    if (files !== atttachments) {
      setAttachments(files)
    }
  }, [files])

  useEffect(() => {
    if (postData.scope) {
      setScopePost(postData.scope)
    }
  }, [postData])

  const handlePost = async (pollID) => {
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
      onSubmit(state._id, customAttachments, postInputRef.current.value, scopePost, pollID)
    } else {
      console.log('scope post not edit: ', scopePost)
      onSubmit(state._id, customAttachments, postInputRef.current.value, scopePost, pollID)
    }
  }

  const handleChosenFiles = useCallback((data) => setAttachments(data), [])

  const handleChangeScope = useCallback((newValue) => setScopePost(newValue), [])

  // THIS IS POLL ACTION
  const [pollModalVisible, setPollModalVisible] = useState(false)
  const onShowPollModal = () => setPollModalVisible(true)
  const onHideShowModal = () => setPollModalVisible(false)

  const [pollInfo, setPollInfo] = useState()
  const onPollChange = (obj) => setPollInfo((pre) => ({ ...pre, ...obj }))
  const onPollClear = () => setPollInfo(null)
  const handleCreatePollAndPost = async () => {
    console.log('pollInfo: ', pollInfo)
    if (!pollInfo?.question?.trim()) {
      return Alert.alert('Lỗi', 'Vui lòng nhập câu hỏi.')
    }

    const filledOptions = pollInfo?.options?.filter((option) => option?.trim()) ?? []
    if (pollInfo?.options?.length < 2) {
      return Alert.alert('Lỗi', 'Cần ít nhất 2 tùy chọn.')
    } else if (filledOptions.length < pollInfo?.options?.length) {
      return Alert.alert('Lỗi', 'Tùy chọn không được rỗng.')
    }

    const customData = {
      targetID: null,
      userID: state._id,
      question: pollInfo.question,
      options: filledOptions,
      result: [],
      type: POLL_TYPE.POST
    }
    API.createPoll(customData).then((response) => {
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        handlePost(response.data._id)
      } else {
        Alert.alert('Lỗi', response.data)
      }
    })
  }
  const handleCheckBeforeSubmit = () => {
    if (onShowPollModal) {
      handleCreatePollAndPost()
    } else {
      handlePost()
    }
  }

  return (
    <ScrollView style={GlobalStyle.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigationRef.goBack()}>
          <AntDesign name="leftcircleo" color="#13f" size={30} />
        </TouchableOpacity>
        <OpacityButtton
          onPress={handleCheckBeforeSubmit}
          activeOpacity={0.6}
          title="Đăng"
          textStyle={{ fontSize: 22, marginRight: 20, color: 'blue' }}
        />
      </View>

      <RowComponent style={styles.inputContainer}>
        <AvatarComponent source={API.getFileUrl(state.avatar)} />
        <RowComponent>
          <SpaceComponent width={8} />
          {!groupID ? (
            <DropDownRole initValue={scopePost} callback={handleChangeScope} />
          ) : (
            <Text style={{ fontSize: 20 }}>{state.userName}</Text>
          )}
        </RowComponent>
      </RowComponent>
      <PostInput ref={postInputRef} value={postData.content} />
      <View style={{ flexDirection: 'row-reverse' }}>
        <SpaceComponent width={16} />
        <ImageLibrary callback={handleChosenFiles} type={POST_ATTACHMENT.MIX} />
        <SpaceComponent width={4} />
        {!postData?.pollID && (
          <EvilIcons
            style={{ paddingBottom: 8 }}
            name="chart"
            size={46}
            color={'blue'}
            onPress={onShowPollModal}
          />
        )}
      </View>
      <SpaceComponent height={48} />
      <MixedViewing attachments={atttachments ?? []} />
      {pollModalVisible && (
        <CreatePollScreen
          onCancel={onHideShowModal}
          onPollClear={onPollClear}
          submitState
          onPollChange={onPollChange}
        />
      )}
    </ScrollView>
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
