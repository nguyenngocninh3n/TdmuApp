import { Text, View } from 'react-native'
import RowComponent from '../../../../components/RowComponent'

const ShortChatingComponent = ({ convention, navigation }) => {
  const { members, data } = convention ?? []
  const membersMap = new Map()
  members.forEach(item => {
    membersMap.set(item.uid, item)
  })

  const lastChat = data.at(-1)
  return (
    <RowComponent onPress={() => navigation.navigate('ChatingScreen', { conventionID: convention.conventionID })}>
      <Text>avatar here</Text>
      <View>
        <Text>{convention.conventionName}</Text>
        <RowComponent>
          <Text>{lastChat.content}</Text>
          <Text>{lastChat.dateModified.toString()} </Text>
        </RowComponent>
      </View>
    </RowComponent>
  )
}
export default ShortChatingComponent
