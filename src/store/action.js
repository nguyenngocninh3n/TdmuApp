import { LOGIN, LOGOUT } from './constants'
const onLogin = (payload) => {
  return {
    type: LOGIN,
    payload
  }
}

const onLogout = (payload) => {
  return {
    type: LOGOUT,
    payload
  }
}

export const actions = { onLogin, onLogout }
