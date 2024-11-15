import AuthenApi from './authentication'
import ConventionAPI from './convention'
import friendAPI from './friend'
import postAPI from './post'
import ResourseAPI from './resourse'
export const API = {
  ...AuthenApi,
  ...ConventionAPI,
  ...ResourseAPI,
  ...friendAPI,
  ...postAPI
}


