import { StyleSheet, Text, TextInput, View } from 'react-native'
import ShortChatingComponent from './components/ShortChatComponent'
import ChatData from '../../../data/ChatData'
import SpaceComponent from '../../../components/SpaceComponent'
import { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

const SearchComponent = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput placeholder="type here..." style={styles.searchInput} />
    </View>
  )
}

const ConvenitionScreen = ({ navigation }) => {
  useEffect(() => {
    firestore()
      .collection('conventions')
      .onSnapshot((data) => {
        if (data) {
          console.log(data)
        }
      })
  }, [])

  return (
    <View>
      <Text>This is convenition screen</Text>
      <SearchComponent />
      {ChatData.map((item, index) => (
        <View key={index}>
          <ShortChatingComponent data={item} navigation={navigation} />
          <SpaceComponent height={5} />
        </View>
      ))}
    </View>
  )
}

export default ConvenitionScreen

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#faa',
    marginHorizontal: 10
  },

  searchInput: {
    paddingVertical: 4,
    paddingLeft: 8,
    color: '#ffe',
    fontSize: 14
  }
})
