/* eslint-disable react-native/no-inline-styles */
import { useEffect, useState, lazy } from 'react'
import { StyleSheet, View } from 'react-native'
import RowComponent from '../../../components/RowComponent'
import styles from './styles'
import { API } from '../../../api'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import ChatHeader from './components/ChatHeader'
import ChatInput from './components/ChatInput'
import SocketClient from '../../../socket'
import { useCustomContext } from '../../../store'
import { OpacityButtton } from '../../../components/ButtonComponent'
const ChatList = lazy(() => import('./components/ChatList'))

const ChattingScreen = ({ navigation, route }) => {
  let { userID } = route.params
  const [conventionID, setConventionID] = useState(route.params.conventionID)
  const [chatData, setChatData] = useState([])
  const [state, dispatch] = useCustomContext()
  const [members, setMembers] = useState(new Map())
  const [conventionInfo, setConventionInfo] = useState({})

  const setDataForConvention = (data) => {
    setConventionID(data._id)
    setChatData(data.data.reverse())
    setMembers(() => {
      const membersMap = new Map()
      data.members.forEach((item) => {
        membersMap.set(item._id, item)
      })
      setMembers(membersMap)
    })
    const userData = data.members.filter((item) => item._id !== state._id).at(0)
    if (data.avatar) {
      if (data.name) setConventionInfo({ name: data.name, avatar: data.avatar })
      else setConventionInfo({ name: userData.aka || userData.userName, avatar: data.avatar })
    } else {
      if (data.name) setConventionInfo({ name: data.name, avatar: userData.avatar })
      else setConventionInfo({ name: userData.aka || userData.userName, avatar: userData.avatar })
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
      setConventionInfo({ name: userData.userName, avatar: userData.avatar })
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
      setDataForConvention(newData)
    } else {
      const fetchData = await API.sendMessageAPI({
        conventionID: conventionID,
        data: data,
        senderAvatar: state.avatar,
        senderName: state.userName
      })
      const { _id, senderID, createdAt, updatedAt } = fetchData
      const newData = {
        _id,
        senderID,
        message: fetchData.message,
        type: fetchData.type,
        createdAt,
        updatedAt
      }
      setChatData((pre) => [newData, ...pre])
    }
  }

  useEffect(() => {
    getConventionByID(conventionID)
    SocketClient.socket.on('convention', (value) => {
      setChatData((pre) => {
        const { _id, senderID, message, type, createdAt, updatedAt } = value
        const newData = { _id, senderID, message, type, createdAt, updatedAt }
        return [newData, ...pre]
      })
    })
  }, [])


  const handleClickDetail = () => {
    navigation.navigate('DetailScreen', {
      name: conventionInfo.name,
      avatar: conventionInfo.avatar,
      conventionID,
      members: Object.fromEntries(members),
      chatData
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
      <ChatList
        chatData={chatData}
        members={members}
        ownerID={state._id}
      />
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
