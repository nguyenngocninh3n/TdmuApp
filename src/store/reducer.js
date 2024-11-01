import {LOGIN, LOGOUT} from './constants'
const user = {}
const reducer = (state, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...action.payload }
  case LOGOUT:
    return {}
  default:
    throw new Error('Error invalid action')
  }
}

export default user
export {reducer}
