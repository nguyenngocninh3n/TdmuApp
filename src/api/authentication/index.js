import axios from 'axios'
import { SERVER_POST } from '../../utils/Constants'
const createUserApi = async ({ data }) => {
  const newUser = await axios.post(`${SERVER_POST}/user/create`, data)
  console.log('newuser in createuserapi:', newUser)
  return newUser.data
}

const AuthenApi = {
  createUserApi
}
export default AuthenApi
