import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'

const getPostCommentsAPI = async (postID) => {
  const response = await axios.get(`${SERVER_POST}/comment/post/${postID}`)
  return response.data
}

const storeCommentAPI = async (data) => {
  const response = await axios.post(`${SERVER_POST}/comment/store`, data)
  return response.data
}

const editCommentAPI = async (commentID, data) => {
  const response = await axios.put(`${SERVER_POST}/comment/${commentID}/update`, data)
  return response.data
}

const deleteCommentAPI = async (commentID) => {
  const response = await axios.delete(`${SERVER_POST}/comment/${commentID}/delete`)
  return response.data
}

const reactCommentAPI = async (commentID, userID) => {
  const response = await axios.put(`${SERVER_POST}/comment/${commentID}/react`, {userID: userID} )
  return response.data
}

const commentAPI = {
  getPostCommentsAPI,
  storeCommentAPI,
  editCommentAPI,
  deleteCommentAPI,
  reactCommentAPI
}

export default commentAPI
