import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import axios from 'axios'

const example = {
  _id: 'pollId1',
  question: 'Bạn thích loại trái cây nào?',
  options: [
    { id: '1', text: 'Táo', votes: 0 },
    { id: '2', text: 'Chuối', votes: 0 },
    { id: '3', text: 'Cam', votes: 0 }
  ],
  createdBy: 'userId1',
  createdAt: '2024-12-07T10:00:00Z'
}


const PollScreen = () => {
  const [poll, setPoll] = useState(null) // Lưu thông tin poll
  const [selectedOption, setSelectedOption] = useState(null) // Lựa chọn của người dùng
  const [loading, setLoading] = useState(true)

  // Lấy poll từ API
  useEffect(() => {
    axios
      .get('https://your-api-url.com/polls/1') // Thay URL bằng API thực tế
      .then((response) => {
        setPoll(response.data)
        setLoading(false)
      })
      .catch((error) => console.error(error))
  }, [])

  const handleVote = (optionId) => {
    setSelectedOption(optionId)

    // Gửi lựa chọn đến API
    axios
      .patch(`https://your-api-url.com/polls/${poll._id}/vote`, { optionId })
      .then(() => {
        // Cập nhật số phiếu
        const updatedOptions = poll.options.map((option) =>
          option.id === optionId ? { ...option, votes: option.votes + 1 } : option
        )
        setPoll({ ...poll, options: updatedOptions })
      })
      .catch((error) => console.error(error))
  }

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{poll.question}</Text>
      <FlatList
        data={poll.options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.option, selectedOption === item.id && styles.selectedOption]}
            onPress={() => handleVote(item.id)}
          >
            <Text style={styles.optionText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.resultContainer}>
        {poll.options.map((option) => (
          <View key={option.id} style={styles.resultBar}>
            <Text>{option.text}</Text>
            <View
              style={[
                styles.bar,
                {
                  width: `${
                    (option.votes / poll.options.reduce((acc, opt) => acc + opt.votes, 0)) * 100
                  }%`
                }
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  option: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8
  },
  selectedOption: {
    backgroundColor: '#d1e7dd'
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
