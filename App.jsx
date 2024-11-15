import Navigation from './src/navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'
import { navigate } from './src/store'
import { NOTIFICATION_TYPE } from './src/utils/Constants'

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    // console.log('TOKEN:', token)
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    // console.log('NOTIFICATION:', notification)
    const { screen, id, type } = notification.data
    if (type === NOTIFICATION_TYPE.CONVENTION) {
      navigate(screen, { conventionID: id })
    }
    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData)
  },

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

const App = () => {
  // useEffect(() => {
  //   const onAppStateChange = async (nextAppState) => {
  //     if (nextAppState === 'active') {
  //       console.log('App is now in the foreground')
  //     }
  //   }

  //   const initializeBackgroundFetch = async () => {
  //     const onFetch = async (taskId) => {
  //       console.log('Background fetch event received:', taskId)

  //       // Thực hiện công việc của bạn ở đây (Ví dụ: gọi API, đồng bộ dữ liệu...)
  //       try {
  //         const result = await fetchDataFromAPI()
  //         console.log(result)
  //       } catch (error) {
  //         console.error('Error fetching data', error)
  //       }

  //       // Gọi finish để hoàn thành tác vụ
  //       BackgroundFetch.finish(taskId)
  //     }

  //     const onTimeout = async (taskId) => {
  //       console.log('Background fetch task timed-out:', taskId)
  //       BackgroundFetch.finish(taskId)
  //     }

  //     BackgroundFetch.configure(
  //       {
  //         minimumFetchInterval: 15, // Tần suất gọi task (trong phút)
  //         stopOnTerminate: false, // Dù ứng dụng bị tắt, service vẫn chạy
  //         startOnBoot: true, // Khởi động lại service sau khi khởi động lại máy
  //         enableHeadless: true // Chạy khi ứng dụng không có giao diện
  //       },
  //       onFetch,
  //       onTimeout
  //     )

  //     // Lắng nghe sự kiện thay đổi trạng thái ứng dụng
  //     AppState.addEventListener('change', onAppStateChange)
  //   }

  //   initializeBackgroundFetch()

  //   return () => {
  //     // Dọn dẹp khi component bị unmount
  //     AppState.removeEventListener('change', onAppStateChange)
  //   }
  // }, [])

  const fetchDataFromAPI = async () => {
    // Gọi API hoặc thực hiện các tác vụ khác ở đây
    return 'Data fetched from API in background'
  }

  return (
    <GestureHandlerRootView>
      <Navigation />
    </GestureHandlerRootView>
  )
}

export default App
