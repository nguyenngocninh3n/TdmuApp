const URL = 'http://192.168.1.7'
const PORT = '8080'
const SERVER_POST = `${URL}:${PORT}`

const NOTIFICATION_TYPE = {
  CONVENTION: 'CONVENTION'
}

const MESSAGE_TYPE = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  NOTIFY: 'NOTIFY',
  MIX: 'MIX'
}

const MESSAGE_ACTION = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  REMOVE: 'REMOVE',
  DELETE: 'DELETE'
}

const POST_ACTION = {
  UPDATE_CONTENT: 'UPDATE_CONTENT',
  UPDATE_ATTACHMENT: 'UPDATE_ATTACHMENT',
  UPDATE_ALL: 'UPDATE_ALL',
  DELETE: 'DELETE',
  TRASH: 'TRASH'
}

const MESSAGE_NOTIFY_TYPE = {
  CHANGE_AVATAR: 'CHANGE_AVATAR',
  CHANGE_AKA: 'CHANGE_AKA',
  CHANGE_CONVENTION_NAME: 'CHANGE_CONVENTION_NAME'
}

const MESSAGE_NOTIFY_STATUS = {
  UPDATE: 'UPDATE',
  CLEAR: 'CLEAR'
}

const POST_ATTACHMENT = {
  TEXT: 'TEXT',
  IMAGE: 'image/jpeg',
  VIDEO: 'video/mp4',
  NOTIFY: 'NOTIFY',
  MIX: 'MIX'
}

const POST_TYPE = {
  PERSONAL: 'PERSONAL',
  SHARE: 'SHARE',
  GROUP: 'GROUP'
}

const RESPONSE_STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

const CHAT_ITEM_TYPE = {
  OWNER_MESSAGE: 'OWNER_MESSAGE',
  USER_MESSAGE: 'USER_MESSAGE'
}

const FRIEND_STATUS = {
  NONE: 'NONE',
  PENDING: 'PENDING',
  ACCEPTING: 'ACCEPTING',
  REFUSING: 'REFUSING',
  FRIEND: 'FRIEND'
}

const MEMBER_ROLE = {
  ADMIN: 'ADMIN',
  CENSOR: 'CENSOR',
  MEMBER: 'MEMBER'
}

const MEMBER_STATUS = {
  PENDING: 'PENDING',
  BLOCK: 'BLOCK',
  ACCEPT: 'ACCEPT'
}

const preURL = 'customview://'

const TYPE_SCREEN = {
  PROFILE: 'PROFILE',
  POST: 'POST',
  CONVENTION: 'CONVENTION',
  CALL: 'CALL'
}

const OPEN_SCREEN = {
  profile: (userID) => `${preURL}profile/${userID}`,
  convention: (conventionID) => `${preURL}convention/${conventionID}`,
  home: () => `${preURL}home`
}


const SCOPE = {
  PUBLIC: 'PUBLIC',
  FRIEND: 'FRIEND',
  PRIVATE: 'PRIVATE',
  OWNER: 'OWNER'
}
export {
  SERVER_POST,
  POST_ATTACHMENT,
  MESSAGE_NOTIFY_TYPE,
  MESSAGE_NOTIFY_STATUS,
  NOTIFICATION_TYPE,
  MESSAGE_TYPE,
  MESSAGE_ACTION,
  POST_ACTION,
  POST_TYPE,
  CHAT_ITEM_TYPE,
  FRIEND_STATUS,
  RESPONSE_STATUS,
  MEMBER_ROLE,
  MEMBER_STATUS,
  SCOPE,
  OPEN_SCREEN,
  TYPE_SCREEN
}
