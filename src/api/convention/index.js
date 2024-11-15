import axios from 'axios'
import { MESSAGE_TYPE, SERVER_POST } from '../../utils/Constants'
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
  console.log('response sendMessageAPI: ', response.data)
  const customData = { ...response.data, senderName, senderAvatar }
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
const getOwnerConventions = async (ownerID) => {
  const response = await axios.get(`${SERVER_POST}/convention/owner/${ownerID}`)
  return response.data
}


const ConventionAPI = {
  getConventionID,
  getConventionIDs,
  getConventionByIdAPI,
  sendMessageAPI,
  createConventionAPI,
  getOwnerConventions
}

export default ConventionAPI
