import { View, Text } from 'react-native'
import React from 'react'

const IntroduceScreen = ({navigation, route}) => {
  return (
    <View style={{flex:1, backgroundColor:'#050'}}>
      <Text style={{width:100, height:200}}>IntroduceScreen</Text>
    </View>
  )
}

export default IntroduceScreen