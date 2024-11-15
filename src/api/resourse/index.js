import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'

const getFile = async (uri) => {
  return (await axios.get(uri)).data
}

const getFileUrl = uri => {
 return `${SERVER_POST}/${uri}`
}

const getConventionFilesByID = async (conventionID, type) => {
  console.log('conventionID: ', conventionID, ' ', type)
  const requestString = `${SERVER_POST}/resource/convention/${conventionID}?fileType=${type}`
  console.log('requeststr: ', requestString)
  const data = await axios.get(requestString)
  console.log('data in getconveintiofile by id: ', data.data)
  return data.data
}

const ResourseAPI = {
  getFile,
  getFileUrl,
  getConventionFilesByID
}

export default ResourseAPI
