import { View, Text, TextInput, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import GoBackComponent from '../../../components/GoBackComponent'
import { OpacityButtton } from '../../../components/ButtonComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import AvatarComponent from '../../../components/AvatarComponent'
import { API } from '../../../api'
import { RESPONSE_STATUS } from '../../../utils/Constants'

const BioScreen = ({ navigation, route }) => {
  const { user } = route.params
  const [inputValue, setInputValue] = useState(user.bio)

  const handleInputChange = (newValue) => {
    console.log('new value: ', newValue)
    setInputValue(newValue)
  }

  const handleUpdateBio = () => {
    API.updateUserBioAPI(user._id, inputValue).then((data) => {
      console.log('response data: ', data)
      if (data === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Cập nhật tiểu sử thành công', ToastAndroid.SHORT)
        navigation.goBack()
      } else {
        ToastAndroid.show('Xảy ra lỗi, vui lòng thử lại!', ToastAndroid.SHORT)
        navigation.goBack()
      }
    })
  }

  return (
    <View>
      <GoBackComponent color={'blue'}>
        <RowComponent alignItems style={{flex:1, marginHorizontal:8, justifyContent: 'space-between' }}>
          <Text>Chỉnh sửa tiểu sử</Text>
          <OpacityButtton title={'Lưu'} textColor={'blue'} textSize={18} onPress={handleUpdateBio} />
        </RowComponent>
      </GoBackComponent>
      <SpaceComponent height={8} />
      <View style={{ marginLeft: 12 }}>
        <RowComponent>
          <AvatarComponent source={API.getFileUrl(user.avatar)} />
          <SpaceComponent width={8} />
          <View>
            <Text>{user.userName}</Text>
            <SpaceComponent height={4} />
            <Text>Công khai</Text>
          </View>
        </RowComponent>
        <SpaceComponent height={8} />
        <Text>
          Bạn có thể thêm một đoạn tiểu sử ngắn để giới thiệu cho mọi người biết thêm về bản thân
        </Text>
        <SpaceComponent height={8} />
        <TextInput
          placeholder="Thêm tiểu sử..."
          value={inputValue}
          onChangeText={handleInputChange}
        />
      </View>
    </View>
  )
}

export default BioScreen
