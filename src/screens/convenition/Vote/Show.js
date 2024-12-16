import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { API } from '../../../api'
import { useCustomContext } from '../../../store'
import { RESPONSE_STATUS } from '../../../utils/Constants'
import { OpacityButtton } from '../../../components/ButtonComponent'
import RowComponent from '../../../components/RowComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import PollingModal from '../../../modals/PollingModal'
import AvatarComponent from '../../../components/AvatarComponent'
import SocketClient from '../../../socket'

const CountItem = ({ length }) => {
  return (
    <View
      style={{
        width: 32,
        height: 32,
        backgroundColor: '#fff',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center'
      }}
    >
      <Text style={{ textAlign: 'center' }}>+{length - 1}</Text>
    </View>
  )
}

const PollScreen = React.memo(({ pollID, members, conventionID, postID }) => {
  const [poll, setPoll] = useState()
  const [selectedOption, setSelectedOption] = useState(null)
  const [state, dispatch] = useCustomContext()
  console.log('poll screen re-render: ', pollID)

  const [modalVisible, setModalVisible] = useState(false)
  const onShowModal = () => setModalVisible(true)
  const onCloseModal = () => setModalVisible(false)
  useEffect(() => {
    if (pollID) {
      API.getPoll(pollID)
        .then((response) => {
          console.log('response poll data: ', response)
          setPoll(response.data)
          if (response === RESPONSE_STATUS.SUCCESS) {
            const selectionID = response.data.results
              .filter((item) => item.userID === state._id)
              ?.at(0)?.optionID
            console.log('selectionID: ', selectionID)
            setSelectedOption(selectionID)
          }
        })
        .catch((error) => console.error(error))
    }
  }, [])

  useEffect(() => {
    console.info('listeners name: ', SocketClient.socket.listeners())
    SocketClient.socket.on('client_addPolling', (data) => {
      setPoll((pre) => ({
        ...pre,
        results: [...poll.results, data.data]
      }))
    })

    SocketClient.socket.on('client_updatePolling', (data) => {
      console.log('listen update Polling in client: ', data)
      setPoll((pre) => {
        if (pre) {
          if (pre.results.find((item) => JSON.stringify(item) !== JSON.stringify(data))) {
            const currentPoll = { ...pre }
            console.log('currrent poll: ', currentPoll)

            const filterIndex = currentPoll.results.findIndex(
              (item) => item.userID === data.data.userID
            )
            currentPoll.results[filterIndex] = data.data
            return currentPoll
          }
          return pre
        }
        return pre
      })
    })
  }, [])

  return !poll ? (
    <Text>loading...</Text>
  ) : (
    <View style={styles.container}>
      <Text style={styles.question}>{poll.question}</Text>
      <FlatList
        data={poll.options}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const chosens = poll.results.filter((result) => result.optionIDs.includes(item._id))
          const chosensLength = chosens.length
          const itemLength = (chosensLength / (members?.size || poll.results.length)) * 100
          console.log(
            'item length: ',
            itemLength,
            'chosenlength: ',
            chosensLength,
            ' pollingcount: ',
            poll.results.length
          )
          return (
            <View style={{ flex: 1 }}>
              <SpaceComponent height={12} />
              <RowComponent style={{ justifyContent: 'space-between', width: '90%' }}>
                <Text style={{ fontSize: 16 }}>{item.value}</Text>
                {chosensLength > 0 && (
                  <RowComponent>
                    <AvatarComponent
                      source={API.getFileUrl(members?.get(chosens.at(-1).userID)?.avatar)}
                      size={32}
                    />
                    {chosensLength > 1 && <CountItem length={chosensLength} />}
                  </RowComponent>
                )}
              </RowComponent>
              <SpaceComponent height={4} />
              <RowComponent
                style={{ backgroundColor: '#ddd', width: '90%', height: 12, borderRadius: 25 }}
              >
                <View
                  style={{
                    backgroundColor: 'blue',
                    width: itemLength + '%',
                    height: '100%',
                    borderRadius: 25
                  }}
                />
              </RowComponent>
            </View>
          )
        }}
      />
      <SpaceComponent height={24} />
      <OpacityButtton
        title={'Thay đổi bình chọn'}
        bgColor={'#fff'}
        style={{ borderRadius: 25 }}
        textColor={'#333'}
        textSize={17}
        textStyle={{ fontWeight: 'bold' }}
        onPress={onShowModal}
      />
      <PollingModal
        members={members}
        pollID={pollID}
        ownerID={state._id}
        poll={poll}
        modalVisible={modalVisible}
        onCancle={onCloseModal}
        conventionID={conventionID}
        postID={postID}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 4,
    marginHorizontal: 32,
    backgroundColor: '#acf5',
    borderRadius: 20
  },
  question: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 16
  },
  option: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8
  },
  selectedOption: {
    backgroundColor: 'blue'
  },
  optionText: {
    fontSize: 16
  },
  resultContainer: {
    marginTop: 24
  },
  resultBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  bar: {
    height: 10,
    backgroundColor: '#007bff',
    borderRadius: 5
  }
})

export default PollScreen
