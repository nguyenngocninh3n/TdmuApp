import BackgroundFetch from 'react-native-background-fetch'
import SocketClient from './index.js'
const runBackgroundFetch = (socket) => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // Lấy dữ liệu mỗi 15 phút
      stopOnTerminate: false, // Không dừng khi ứng dụng bị kill
      startOnBoot: true // Bắt đầu khi máy khởi động lại
    },
    async (taskId) => {
      console.log('[BackgroundFetch] task started')
      // Thực thi kết nối lại WebSocket hoặc gửi thông báo
      SocketClient.runSocketClient()
      BackgroundFetch.finish(taskId)
    },
    (error) => {
      console.log('[BackgroundFetch] failed to start', error)
    }
  )
}

export { runBackgroundFetch }
