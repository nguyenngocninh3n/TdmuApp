import axios from 'axios'
import { MESSAGE_TYPE, POST_ATTACHMENT, SERVER_POST } from '../../utils/Constants'

const searchPostAPI = async (userID, queryString) => {
  const response = await axios.get(`${SERVER_POST}/search/post/${userID}/${queryString}`)
  return response.data
}

const searchUserAPI = async (userID, queryString) => {
  const response = await axios.get(`${SERVER_POST}/search/user/${userID}/${queryString}`)
  return response.data
}
const searchGroupAPI = async (userID, queryString) => {
  const response = await axios.get(`${SERVER_POST}/search/group/${userID}/${queryString}`)
  return response.data
}

const searchImageAPI = async (userID, queryString) => {
  const response = await axios.get(`${SERVER_POST}/search/image/${userID}/${queryString}`)
  return response.data
}

const searchVideoAPI = async (userID, queryString) => {
  const response = await axios.get(`${SERVER_POST}/search/video/${userID}/${queryString}`)
  return response.data
}

const searchAPI = {
  searchPostAPI,
  searchUserAPI,
  searchGroupAPI,
  searchImageAPI,
  searchVideoAPI
}

export default searchAPI
