import Navigation from './src/navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token)
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  // onNotification: function (notification) {
  //   // console.log('NOTIFICATION:', notification)
  //   const { screen, id, type } = notification.data
  //   if (type === NOTIFICATION_TYPE.CONVENTION) {
  //     navigate(screen, { conventionID: id })
  //   }
  //   // process the notification
  //   console.log('notification info: ', notification)

  //   // (required) Called when a remote is received or opened, or local notification is opened
  //   // notification.finish('finish notification')
  // },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action)
    console.log('NOTIFICATION:', notification)

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err)
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true
})

import messaging from '@react-native-firebase/messaging'
import { startLocalNotification } from './src/notification'
import notifee, {
  AndroidForegroundServiceType,
  AndroidImportance,
  EventType
} from '@notifee/react-native'
import { useEffect } from 'react'
import { handleStartNotify } from './src/notification/notifee'
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
  }
}

// Lắng nghe thông báo khi ứng dụng đang ở foreground
const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
  console.log('Foreground Message:', remoteMessage.data.title)
  handleStartNotify(remoteMessage) //***** */
})

const unsubcribeBackground = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Received background message:', remoteMessage.data.title)
  handleStartNotify(remoteMessage)
})

// Lắng nghe sự kiện khi người dùng nhấn vào thông báo (Foreground)
const unsubscribeEventForeground = notifee.onForegroundEvent(({ type, detail }) => {
  // if (type === EventType.PRESS) {
  //   console.log('Foreground Pressed:', detail.notification.data)
  // }
  console.log('foreground pressed')
})

// Lắng nghe thông báo khi ứng dụng ở background hoặc killed
const unsubscribeEventBackground = notifee.onBackgroundEvent(async ({ type, detail }) => {
  // if (type === EventType.PRESS) {
  //   console.log('Background Pressed:', detail.notification.data)
  //   // Mở màn hình hoặc thực hiện hành động khác
  // }
  console.log('background pressed, ', type)
})

// Hủy các sự kiện khi unmount

const App = () => {
  // useEffect(() => {
  //   // Lắng nghe sự kiện nhấn vào thông báo khi ứng dụng đang foreground
  //   const unsubscribeForeground = notifee.onForegroundEvent(({ type, detail }) => {
  //     if (type === EventType.PRESS) {
  //       const data = detail.notification.data
  //       console.log(`Điều hướng đến với itemId: ${data}`)
  //       // Thực hiện điều hướng hoặc logic khác
  //     }
  //   })

  //   // Lắng nghe sự kiện nhấn vào thông báo khi ứng dụng ở background
  //   const unsubscribeBackground = notifee.onBackgroundEvent(({ type, detail }) => {
  //     if (type === EventType.PRESS) {
  //       const data = detail.notification.data
  //       console.log(`Background Press - Navigate to  with itemId: ${data}`)
  //       // Xử lý điều hướng hoặc logic khác
  //     }
  //   })

  // }, [])

  // Đăng ký một headless task cho Firebase Messaging
  requestUserPermission()

  useEffect(() => {
    // Yêu cầu quyền thông báo (nếu chưa cấp quyền)
    messaging()
      .requestPermission()
      .then(() => {
        console.log('Permission granted!')
      })
      .catch((err) => {
        console.log('Permission denied:', err)
      })

    // // Lắng nghe thông báo khi ứng dụng đang ở foreground
    // const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
    //   console.log('Foreground Message:', remoteMessage)
    //   handleStartNotify(remoteMessage) //***** */
    // })

    // const unsubcribeBackground = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //   console.log('Received background message:', remoteMessage)
    //   handleStartNotify(remoteMessage)

    // })

    // // Lắng nghe sự kiện khi người dùng nhấn vào thông báo (Foreground)
    // const unsubscribeEventForeground = notifee.onForegroundEvent(({ type, detail }) => {
    //   if (type === EventType.PRESS) {
    //     console.log('Foreground Pressed:', detail.notification.data)
    //   }
    // })

    // // Lắng nghe thông báo khi ứng dụng ở background hoặc killed
    // const unsubscribeEventBackground = notifee.onBackgroundEvent(async ({ type, detail }) => {
    //   if (type === EventType.PRESS) {
    //     console.log('Background Pressed:', detail.notification.data)
    //     // Mở màn hình hoặc thực hiện hành động khác
    //   }
    // })

    // // Hủy các sự kiện khi unmount
  }, [])

  return (
    <GestureHandlerRootView>
      <Navigation />
    </GestureHandlerRootView>
  )
}

export default App
