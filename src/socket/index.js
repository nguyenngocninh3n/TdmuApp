import { io } from 'socket.io-client'
import { MESSAGE_TYPE, NOTIFICATION_TYPE, SERVER_POST } from '../utils/Constants'
import { API } from '../api'
import { startLocalNotification } from '../notification'
const socket = io(SERVER_POST)
function runSocketClient(userID, navigation) {
  // socket = io(SERVER_POST, { query: { userID } })

  socket.emit('connection', { data: { userID: userID } })
  socket.on('connect', ()=>console.log('client connect'))
  socket.on('disconnect', ()=>console.log('client disconnect'))
  onDisconnecting(userID)
  emitConventionJoinRooms(userID)
  emitUserJoinRoom(userID)
  onConventionStored()
  onConvention((value) => {
    console.log('data on convention listener: ', value)
    const { conventionID, type, message, senderID, senderName, senderAvatar } = value
    let messageCustom = ''
    switch (type) {
      case MESSAGE_TYPE.TEXT:
        messageCustom = message
        break
      case MESSAGE_TYPE.IMAGE:
        messageCustom = `Đã gửi ${message.split(',').length} ảnh`
        break
      case MESSAGE_TYPE.VIDEO:
        messageCustom = `Đã gửi ${message.split(',').length} video`
        break
      default:
        messageCustom = message
    }
    startLocalNotification({
      conventionID: conventionID,
      title: senderName,
      senderAvatar: senderAvatar,
      message: messageCustom,
      senderID: senderID,
      data: {
        type: NOTIFICATION_TYPE.CONVENTION,
        screen: 'ChattingScreen',
        id: conventionID
      }
    })
  })
}

async function get(userID) {
  const data = await API.getUserByIdAPI({ uid: userID })
}

async function onDisconnecting(userID) {
  socket.on('disconnecting', () => {
    // Gửi dữ liệu đến server
    socket.emit('client-disconnecting', { message: 'Client is disconnecting', userId: userID })
  })
}

async function emitConventionJoinRooms(ownerID) {
  const conventionIDs = await API.getConventionIDs(ownerID)
  if (conventionIDs) {
    joinChatRooms(conventionIDs)
  }
}
async function emitConventionJoinRoom(conventionID) {
  joinChatRoom(conventionID)
}

function onConvention(callback) {
  socket.on('convention', function (data) {
    console.log('convention listenner in client: ', data)
    callback(data)
  })
}

function onConventions(callback) {
  socket.on('convention', function (data) {
    callback(data)
  })
}

function emitConvention(data) {
  socket.emit('convention', data)
}

function joinChatRoom(conventionID) {
  socket.emit('joinChatRoom', conventionID)
}

function joinChatRooms(roomIDs) {
  socket.emit('joinChatRooms', roomIDs)
}

function onConventionStored() {
  socket.on('conventionStored', emitConventionJoinRoom)
}

function emitConventionStored({ data, uids, conventionID }) {
  const configdata = { data, conventionID, uids }
  socket.emit('conventionStored', configdata)
}

function emitUserJoinRoom(id) {
  joinChatRoom(id)
}

const SocketClient = {
  socket,
  runSocketClient,
  emitConventionJoinRoom,
  emitConventionJoinRooms,
  onConvention,
  onConventions,
  emitConvention,
  onConventionStored,
  emitConventionStored
}

export default SocketClient
