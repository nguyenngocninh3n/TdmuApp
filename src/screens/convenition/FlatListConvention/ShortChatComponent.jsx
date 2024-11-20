import { Text, View } from 'react-native'
import RowComponent from '../../../components/RowComponent'
import { helper } from '../../../utils/helpers'
import AvatarComponent from '../../../components/AvatarComponent'
import { API } from '../../../api'
import SpaceComponent from '../../../components/SpaceComponent'
import { MESSAGE_TYPE } from '../../../utils/Constants'

const ShortChatingComponent = ({ convention, navigation, ownerID }) => {
  const { members, data } = convention
  const membersMap = new Map()
  members.forEach((item) => {
    membersMap.set(item._id, item)
  })

  const privateUserID = convention.uids.filter((item) => item !== ownerID).at(0)
  const privateUser = membersMap.get(privateUserID)
  const lastChat = data.at(-1)
  const lastTime = helper.DateTimeHelper.displayTimeDescendingFromDate(lastChat.createdAt)
  const avatar = convention.avatar ? convention.avatar : privateUser.avatar
  const chatName =
    convention.type === 'private' ? privateUser.aka || privateUser.userName : convention.name
  const messageOwner = membersMap.get(lastChat.senderID).userName
  var lastMessage = ''
  switch (lastChat.type) {
    case MESSAGE_TYPE.TEXT:
      lastMessage = messageOwner + ': ' + lastChat.message; break
    case MESSAGE_TYPE.NOTIFY:
      lastMessage = lastChat.message; break
    case MESSAGE_TYPE.IMAGE:
    case MESSAGE_TYPE.VIDEO: {
      lastMessage = messageOwner + ': ' + `đã gửi ${lastChat.message.split(',').length} ${lastChat.type.toLowerCase()}`
      break
    }
    default:
      lastMessage = lastChat.message
  }
  return (
    <RowComponent
      onPress={() => navigation.navigate('ChattingScreen', { conventionID: convention._id })}
    >
      <AvatarComponent source={API.getFileUrl(avatar)} />
      <SpaceComponent width={8} />
      <View>
        <Text style={{ fontWeight: '500', fontSize: 17 }}>{chatName}</Text>
        <RowComponent >
          <Text style={{fontWeight: '400', fontSize: 15}}>
            {lastMessage.trim()}
          </Text>
          <SpaceComponent width={16} />
          <Text style={{ fontSize: 15, fontWeight: '400' }}>{lastTime} </Text>
        </RowComponent>
      </View>
    </RowComponent>
  )
}
export default ShortChatingComponent
