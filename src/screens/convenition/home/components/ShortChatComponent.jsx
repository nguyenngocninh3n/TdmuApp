import { Text, View } from 'react-native'
import RowComponent from '../../../../components/RowComponent'

const ShortChatingComponent = ({ data, navigation }) => {
  console.log(data)
  return (
    <RowComponent onPress={() => navigation.navigate('ChatingScreen')}>
      <Text>{data.userName}</Text>
      <View>
        <Text>User name</Text>
        <RowComponent>
          <Text>{data.data.at(-1).message}</Text>
          <Text>Time </Text>
        </RowComponent>
      </View>
    </RowComponent>
  )
}
export default ShortChatingComponent
