import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'
import { OpacityButtton } from '../../components/ButtonComponent'
import PushNotification from 'react-native-push-notification'
import { PermissionsAndroid } from 'react-native'
import SocketClient from '../../socket'
import { useCustomContext } from '../../store'
import ImageCropPicker from 'react-native-image-crop-picker'

const NotificationScreen = ({ navigation }) => {
  const [users, setUsers] = useState([])
  const [state, dispatch] = useCustomContext()

  const doSomeThing = async () => {
    const data = await API.getAllUserAPI()
    if (data) {
      setUsers(data)
    }
  }
  const requestPermission = async () => {
    await PermissionsAndroid.request('android.permission.USE_EXACT_ALARM')
    await PermissionsAndroid.request('android.permission.BIND_JOB_SERVICE')
    await PermissionsAndroid.request('android.permission.ACCESS_FINE_LOCATION')
    await PermissionsAndroid.request('android.permission.ACCESS_COARSE_LOCATION')
    await PermissionsAndroid.request('android.permission.ACCESS_BACKGROUND_LOCATION')
    await PermissionsAndroid.request('android.permission.ACCESS_WIFI_STATE')
  }
  useEffect(() => {
    SocketClient.runSocketClient(state._id, navigation)
    doSomeThing()
    requestPermission()

    // PushNotification.deleteChannel('123')
    const result = PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS')
  }, [])

  useEffect(() => {
    const a = []

    const handleA = async (b) => {
      console.log('start b: ', b)
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((res) => {
          return res
        })
        .then((value) => {
          console.log('push 1')
          b.push(1)
        })
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((res) => res)
        .then((value) => {
          console.log('push 2')
          b.push(2)
        })
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((res) => res)
        .then((value) => {
          console.log('push 3')
          b.push(3)
        })

      console.log('end b: ', b)
    }

    const handleC = async (c) => {
      console.log('start c: ', c)
      await handleA(c)
      console.log('end c: ', c)
    }

    handleC(a)
  }, [])

  const handleUserProfile = (id) => {
    console.log('id: ', id)
    navigation.navigate('ProfileScreen', { userID: id })
  }

  const handleOpenLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      mediaType: 'any'
    }).then((image) => {
      image.forEach((item) => console.log(item))
    })
  }

  return (
    <View>
      {users.map((item, index) => (
        <OpacityButtton
          style={{ backgroundColor: '#ccc', marginBottom: 20 }}
          key={index}
          title={item.userName}
          onPress={() => handleUserProfile(item._id)}
        />
      ))}
    </View>
  )
}

export default NotificationScreen
