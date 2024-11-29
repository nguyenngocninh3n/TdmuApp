import notifee, { AndroidImportance, EventType } from '@notifee/react-native'
// import messaging from '@react-native-firebase/messaging'
import { API } from '../api'


async function createNotificationChannel({ channelID }) {
  const isExist = await notifee.getChannel(channelID)
  if (!isExist) {
    await notifee.createChannel({
      id: channelID,
      name: 'Default Channel',
      // groupId: groupID,

      importance: AndroidImportance.HIGH // Mức độ cao, hiển thị ngay lập tức
    })
  }
}

async function displayNotification({
  messageFCM,
  channelID,
  senderID,
  senderAvatar,
  title,
  body,
  channelType
}) {
  await notifee.displayNotification({
    title: messageFCM.notification?.title ?? title,
    body: messageFCM.notification?.body ?? body,
    id:channelID,
    android: {
      channelId: channelID,
      importance: AndroidImportance.HIGH,
      //   groupSumary: true,
      //   groupID: groupID,
      pressActions: {
        id: 1
      },
      largeIcon: API.getFileUrl(senderAvatar)
    },
    data: {
      title,
      body,
      senderID,
      channelType
    }
  })
}

async function handleStartNotify(remoteMessage) {

  const { channelID, senderID, senderName, senderAvatar, title, body, channelType } =
    remoteMessage.data
  await createNotificationChannel({ channelID })
  await displayNotification({
    messageFCM: remoteMessage,
    channelID,
    senderID,
    senderAvatar,
    title,
    body,
    channelType
  })
}

export {
  createNotificationChannel,
  displayNotification,
  handleStartNotify
}
