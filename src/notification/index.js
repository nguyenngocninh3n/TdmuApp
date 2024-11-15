import PushNotification from 'react-native-push-notification'
import { navigationRef } from '../store'

const startLocalNotification = ({ conventionID, title, message, senderAvatar, senderID, data }) => {
  const currentNavigation = navigationRef.current.getCurrentRoute()
  const isOnConvention = currentNavigation.name === 'ChattingScreen' && currentNavigation.params.conventionID === conventionID
  console.log('is on convention', isOnConvention)
  console.log('params received: ', conventionID, ' , ', title, ' , ', message, ' , ', senderAvatar, ' , ', senderID, ' , ', data)
  !isOnConvention && PushNotification.channelExists(conventionID, function (isExist) {
    if (!isExist) {
      console.log('channel not exist: ')
      PushNotification.createChannel(
        {
          channelId: conventionID, // (required)
          channelName: conventionID + senderID, // (required)
          channelDescription: 'Notification for Local message', // (optional) default: undefined.
          //   group: 'group', // (optional) add group to message
          //   groupSummary: true, //  (optional) set this notification to be the group summary for a group of notifications, default: false
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => {
          // console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
          PushNotification.localNotification({
            channelId: conventionID, //this must be same with channelid in createchannel
            title,
            message,
            data: data,
            largeIcon: senderAvatar,
            group: conventionID,
            groupSummary: true,
            bigLargeIcon:senderAvatar
          })
        }
      )
    } else {
      console.log('channel is existed')
      PushNotification.localNotification({
        channelId: conventionID, //this must be same with channelid in createchannel
        title,
        message,
        data: data,
        group: conventionID,
        groupSummary: true,
        bigLargeIcon: senderAvatar,
        smallIcon: senderAvatar,
        ticker: senderAvatar,
        // picture: senderAvatar
        largeIcon: senderAvatar,
      })
    }
  })
}

const test_startLocalNotification = ({ conventionID, title, message, senderID, navigation }) => {
  PushNotification.createChannel(
    {
      channelId: conventionID, // (required)
      channelName: conventionID + senderID, // (required)
      channelDescription: 'Notification for Local message', // (optional) default: undefined.
      //   group: 'group', // (optional) add group to message
      //   groupSummary: true, //  (optional) set this notification to be the group summary for a group of notifications, default: false
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => {
      // console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      PushNotification.localNotification({
        channelId: conventionID, //this must be same with channelid in createchannel
        title,
        message,
        data: JSON.stringify({ screen: 'TargetScreen', someParam: 'value' }),
        group: conventionID,
        groupSummary: true,
        userInfo: { screen: 'TargetScreen', someParam: 'value' },
      })
    }
  )
}

export { startLocalNotification }
