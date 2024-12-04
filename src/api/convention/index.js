import axios from 'axios'
import { MESSAGE_ACTION, MESSAGE_TYPE, RESPONSE_STATUS, SERVER_POST } from '../../utils/Constants'
import SocketClient from '../../socket'
const getConventionID = async (ownerID, userID) => {
  const conventionID = await axios.get(
    `${SERVER_POST}/convention/conventionID?ownerID=${ownerID}&userID=${userID}`
  )
  return conventionID.data
}

const getConventionIDs = async (ownerID) => {
  const conventionIDs = await axios.get(
    `${SERVER_POST}/convention/conventionIDs?ownerID=${ownerID}`
  )
  return conventionIDs.data
}

const getConventionByIdAPI = async (conventionId) => {
  const convention = await axios.get(`${SERVER_POST}/convention/${conventionId}`)
  return convention.data
}

const sendMessageAPI = async ({ conventionID, data, senderName, senderAvatar }) => {
  const response = await axios.post(`${SERVER_POST}/convention/${conventionID}`, data)
  const customData = { ...response.data, senderName, senderAvatar, notify: response.data.notify || data.notify, action: MESSAGE_ACTION.ADD }
  SocketClient.emitConvention({ conventionID, ...customData })
  return response.data
}

const createConventionAPI = async ({ data, senderName, senderAvatar }) => {
  const response = await axios.post(`${SERVER_POST}/convention/store`, data)
  const conventionID = response.data._id
  SocketClient.emitConventionJoinRoom(conventionID).then(() => {
    const senderData = response.data.data.at(-1)
    const customData = { ...senderData, senderName, senderAvatar }
    SocketClient.emitConventionStored({
      uids: response.data.uids,
      conventionID: response.data._id,
      data: customData
    })
    setTimeout(() => {
      SocketClient.emitConvention({ conventionID: conventionID, data: customData })
    }, 1000)
  })
  return response.data
}

const createGroupConvention = async data => {
  const response = await axios.post(`${SERVER_POST}/convention/group/store`, data )
  return response.data
}


const addMemberToGroup = async (groupID, data) => {
  const response = await axios.post(`${SERVER_POST}/convention/group/${groupID}/add`, data )
  return response.data
}

const logoutGroupAPI = async (conventionID, userID, member) => {
  const response = await axios.post(`${SERVER_POST}/convention/group/${conventionID}/logout/${userID}`, member)
  return response.data
}

const getOwnerConventions = async (ownerID) => {
  const response = await axios.get(`${SERVER_POST}/convention/owner/${ownerID}`)
  return response.data
}

const updateMessage = async (conventionID, messageID, data) => {
  const response = await axios.post(
    `${SERVER_POST}/convention/${conventionID}/message/${messageID}`,
    { data }
  )
  if (response.data === RESPONSE_STATUS.SUCCESS) {
    const customData = { conventionID, messageID, action: data.type, message:data.message }
    SocketClient.emitConvention(customData)
  }
}


const ConventionAPI = {
  getConventionID,
  getConventionIDs,
  getConventionByIdAPI,
  sendMessageAPI,
  createConventionAPI,
  createGroupConvention,
  addMemberToGroup,
  logoutGroupAPI,
  getOwnerConventions,
  updateMessage
}

export default ConventionAPI
