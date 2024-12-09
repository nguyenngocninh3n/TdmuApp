import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native'
import axios from 'axios'

const CreatePollScreen = ({ navigation }) => {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '']) // Ít nhất 2 tùy chọn mặc định

  const handleAddOption = () => {
    if (options.length < 10) {
      setOptions([...options, '']) // Thêm 1 trường trống mới
    } else {
      Alert.alert('Giới hạn', 'Bạn chỉ có thể thêm tối đa 10 tùy chọn.')
    }
  }

  const handleOptionChange = (text, index) => {
    const updatedOptions = [...options]
    updatedOptions[index] = text
    setOptions(updatedOptions)
  }

  const handleSubmit = async () => {
    if (!question.trim()) {
      return Alert.alert('Lỗi', 'Vui lòng nhập câu hỏi.')
    }

    const filledOptions = options.filter((option) => option.trim())
    if (filledOptions.length < 2) {
      return Alert.alert('Lỗi', 'Cần ít nhất 2 tùy chọn.')
    }

    try {
      const response = await axios.post('https://your-api-url.com/polls', {
        question,
        options: filledOptions,
        userId: '12345' // Lấy từ thông tin người dùng đã đăng nhập
      })

      Alert.alert('Thành công', 'Bình chọn đã được tạo!')
      navigation.goBack() // Quay lại màn hình trước
    } catch (error) {
      console.error(error)
      Alert.alert('Lỗi', 'Không thể tạo bình chọn.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo bình chọn mới</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập câu hỏi của bạn"
        value={question}
        onChangeText={setQuestion}
      />

      <FlatList
        data={options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TextInput
            style={styles.input}
            placeholder={`Tùy chọn ${index + 1}`}
            value={item}
            onChangeText={(text) => handleOptionChange(text, index)}
          />
        )}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.addOptionButton} onPress={handleAddOption}>
            <Text style={styles.addOptionText}>+ Thêm tùy chọn</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Tạo bình chọn</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },
  addOptionButton: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center'
  },
  addOptionText: {
    color: '#fff',
    fontSize: 16
  },
  submitButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default CreatePollScreen
