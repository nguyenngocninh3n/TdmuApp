import AuthenApi from './authentication'
import commentAPI from './comment'
import ConventionAPI from './convention'
import friendAPI from './friend'
import postAPI from './post'
import reactionAPI from './reaction'
import ResourseAPI from './resourse'
export const API = {
  ...AuthenApi,
  ...ConventionAPI,
  ...ResourseAPI,
  ...friendAPI,
  ...postAPI,
  ...commentAPI,
  ...reactionAPI
}


