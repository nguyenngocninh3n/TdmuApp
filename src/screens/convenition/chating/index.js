/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { useEffect, useState } from 'react'
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].reverse()
// const data = [1, 2, 3, 4]
const ownerID = '111532028022054678321'

const OwnerMessage = ({ item }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 60, backgroundColor: '#ddd' }}>
        <Text style={{ textAlign: 'center' }}>
          {item.content} và {item.dateModified.toString()}
        </Text>
      </View>
      <SpaceComponent height={20} />
    </View>
  )
}

const UserMessage = ({ item }) => {
  return (
    <RowComponent>
      <View>
        <Button title="avatar" />
      </View>
      <View style={{ flex: 1 }}>
        <Text>{item.content}</Text>
        <Text>{item.dateModified.toString()}</Text>
      </View>
    </RowComponent>
  )
}

const ChatingScreen = ({ navigation, route }) => {
  const { conventionID } = route.params
  const [convention, setConvention] = useState([])
  const [chatData, setChatData] = useState([])

  const getConventionByID = () => {
    firestore()
      .collection('conventions')
      .doc(conventionID)
      .onSnapshot((snapShot) => {
        if (snapShot.exists) {
          setConvention(snapShot.data())
          setChatData(snapShot.data().data)
        }
      })
  }

  const ChatItem = ({ item, index }) => {
    console.log('item: ', item)
    // message from owner
    if (item.uid === ownerID) {
      return <OwnerMessage item={item} />
    }
    // first message from anyone -> having avata
    else if (index === 0) {
      return <UserMessage item={item} />
    }
    // multi message from anyone => having avatar, not time
    else if (item.uid === chatData.at(index - 1).uid) {
      return <UserMessage item={item} />
    } else {
      // single message from anyone => having avatar & time
      return <UserMessage item={item} />
    }
  }

  useEffect(() => {
    getConventionByID()
  }, [])

  return (
    <View style={styles.chatScreenContainer}>
      <View style={{ height: 100 }}>
        <Text>This is chating screen</Text>
        <Button onPress={() => navigation.goBack()} title="go back" />
      </View>
      <FlatList
        style={styles.chatFlatlistContainer}
        inverted
        initialNumToRender={10}
        data={chatData}
        renderItem={({ item, index }) => <ChatItem item={item} index={index} />}
      />
      <RowComponent style={styles.chatInputContainer}>
        <TextInput style={styles.chatInput} multiline placeholder="Gửi tin nhắn..." />
        <TouchableOpacity style={styles.chatInputIcon}>
          <MaterialIcons name="send" color={'blue'} size={30} />
        </TouchableOpacity>
      </RowComponent>
    </View>
  )
}

export default ChatingScreen
