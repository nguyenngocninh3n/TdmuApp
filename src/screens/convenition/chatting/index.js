/* eslint-disable react-native/no-inline-styles */
import { useEffect, useState, lazy } from 'react'
import { StyleSheet, View } from 'react-native'
import RowComponent from '../../../components/RowComponent'
import styles from './styles'
import { API } from '../../../api'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import ChatHeader from './components/ChatHeader'
import ChatInput from './components/ChatInput'
import { useCustomContext } from '../../../store'
import ChatList from './components/ChatList'

const ChattingScreen = ({ navigation, route }) => {
  let { userID } = route.params
  const [conventionID, setConventionID] = useState(route.params.conventionID)
  const [chatData, setChatData] = useState([])
  const [state, dispatch] = useCustomContext()
  const [members, setMembers] = useState(new Map())
  const [conventionInfo, setConventionInfo] = useState({})

  console.log('chatting screen re-render')

  const setDataForConvention = (data) => {
    setConventionID(data._id)
    setMembers(() => {
      const membersMap = new Map()
      data.members.forEach((item) => {
        membersMap.set(item._id, item)
      })
      return membersMap
    })
    const userData = data.members.filter((item) => item._id !== state._id).at(0)
    if (data.avatar) {
      if (data.name) setConventionInfo({type:data.type, name: data.name, avatar: data.avatar })
      else setConventionInfo({type:data.type, name: userData.aka || userData.userName, avatar: data.avatar })
    } else {
      if (data.name) setConventionInfo({type:data.type, name: data.name, avatar: userData.avatar })
      else setConventionInfo({type:data.type, name: userData.aka || userData.userName, avatar: userData.avatar })
    }
  }

  const getConventionByID = async () => {
    if (conventionID) {
      const data = await API.getConventionByIdAPI(conventionID)
      if (data) {
        setDataForConvention(data)
      }
    } else {
      const userData = await API.getUserByIdAPI({ uid: userID })
      setConventionInfo({type: 'private', name: userData.userName, avatar: userData.avatar })
    }
  }

  const handleSendMessage = async (message, type) => {
    const data = {
      senderID: state._id,
      type: type,
      userID,
      message: message
    }
    if (!conventionID) {
      const newData = await API.createConventionAPI({
        data: data,
        senderAvatar: state.avatar,
        senderName: state.userName
      })
      // setDataForConvention(newData)
    } else {
      const fetchData = await API.sendMessageAPI({
        conventionID: conventionID,
        data: data,
        senderAvatar: state.avatar,
        senderName: state.userName
      })
    }
  }

  useEffect(() => {
    getConventionByID(conventionID)
  }, [])

  const handleClickDetail = () => {
    navigation.navigate('DetailScreen', {
      name: conventionInfo.name,
      avatar: conventionInfo.avatar,
      type: conventionInfo.type,
      conventionID,
      members: Object.fromEntries(members),
      chatData,
      ownerID: state._id
    })
  }
  console.log('app re-render')

  return (
    <View style={styles.chatScreenContainer}>
      <RowComponent
        alignItems
        style={[
          localStyle.container,
          { justifyContent: 'space-between', marginLeft: 8, marginRight: 16 }
        ]}
      >
        <ChatHeader name={conventionInfo.name} avatar={API.getFileUrl(conventionInfo?.avatar)} />
        <SimpleLineIcons color={'blue'} name="exclamation" size={24} onPress={handleClickDetail} />
      </RowComponent>
      <ChatList conventionID={conventionID} ownerID={state._id} />
      <ChatInput onPress={handleSendMessage} />
    </View>
  )
}

const localStyle = StyleSheet.create({
  container: {
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    paddingVertical: 8
  }
})

export default ChattingScreen
