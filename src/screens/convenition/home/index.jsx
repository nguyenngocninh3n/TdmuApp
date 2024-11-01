import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import ShortChatingComponent from './components/ShortChatComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { getAuth } from '@react-native-firebase/auth'
import { TokenClass } from 'typescript'

const SearchComponent = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput placeholder="type here..." style={styles.searchInput} />
    </View>
  )
}

const ConvenitionScreen = ({ navigation }) => {
  const [conventions, setConventions] = useState([])

  const getOwnerConventions = () => {
    firestore()
      .collection('conventions')
      .where('uids', 'array-contains', '111532028022054678321')
      .onSnapshot((data) => {
        let arr = []
        data.forEach((item) => {
          arr.push(item.data())
        })
        setConventions(arr)
      })
  }

  useEffect(() => {
    getOwnerConventions()
  }, [])

  const addData = () => {
    const docID = Math.ceil(Math.random().toFixed(15) * Math.pow(10, 15)).toString()
    firestore()
      .collection('conventions')
      .doc(docID)
      .set({ ...conventions[0] })
      .then('add new data successfully')
      .catch((error) => console.log('error: ', error))
      .finally(() => console.log('fininsh'))
  }

  return (
    <View>
      <Text>This is convenition screen</Text>
      <SearchComponent />
      {conventions?.map((item, index) => (
        <View key={index}>
          <ShortChatingComponent convention={item} navigation={navigation} />
          <SpaceComponent height={5} />
        </View>
      ))}
      <Button onPress={() => console.log('gia tri conventions: ', conventions)} title="In log" />
      <Button onPress={addData} title="add data" />
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

/*
 user: {
  conventionID: 12345,
  avatar: 'https://tdmuapp/images/1111123',
  uids: [user1_ID, user2_ID, user3_ID],
  dateModidied: timestamp,
  member: [
    {
      uid: 1111,
      name: 'Nguyễn Một',
      aka: zai Một,
      dateModified: timestamp
    },
    {
      uid: 2222,
      name: 'Nguyễn Hai',
      aka: gái Hai,
      dateModified: timestamp
    }
  ],
  data: [
    {
      uid: 1111,
      type: 'text',
      content: 'Xin chào mình là Một!'
      dateModified: timestamp
    }
  ]
}
*/
