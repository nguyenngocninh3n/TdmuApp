import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'

const getStatusFriend = async ({ ownerID, userID }) => {
  const requestStr = `${SERVER_POST}/friend/status?ownerID=${ownerID}&userID=${userID}`
  const response = await axios.get(requestStr)
  return response.data
}

const getListFriend = async ({ userID }) => {
  const response = await axios.get(`${SERVER_POST}/friend/list/${userID}`)
  return response.data
}

const updateStatusFriend = async ({ ownerID, userID, status }) => {
  const response = await axios.post(
    `${SERVER_POST}/friend/status/update?ownerID=${ownerID}&userID=${userID}&status=${status}`
  )
  return response.data
}

const friendAPI = {
  getStatusFriend,
  getListFriend,
  updateStatusFriend
}

export default friendAPI
