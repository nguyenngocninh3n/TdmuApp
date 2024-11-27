export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwMzAyNjY1Ny01Y2RmLTRkZDUtYThmMi04MmI2MmQwYzE3ZWUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMjcyOTAwNiwiZXhwIjoxNzMzMzMzODA2fQ.j9WuWXZw6uQZ_vuFr0CsvO0X2rDo4NR1KiMQt_BKG5Y'
// API call to create meeting
export const createMeeting = async ({ tokenParam }) => {
  console.log('received : ', tokenParam)
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${tokenParam}`,
      'Content-Type': 'application/json'
    },
  })
  console.log('response: ', res)
  const { roomId } = await res.json()
  return roomId
}

export const getToken = () => token


export const getMeetingId = async (tokenParam) => {
  try {
    //Use VideoSDK rooms API endpoint to create a meetingId
    const VIDEOSDK_API_ENDPOINT = `https://api.videosdk.live/v2/rooms`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Pass the token in the headers
        Authorization: tokenParam
      }
    }
    const meetingId = await fetch(VIDEOSDK_API_ENDPOINT, options)
      .then(async (result) => {
        const { roomId } = await result.json()
        return roomId
      })
      .catch((error) => console.log('error', error))

    //Return the meetingId which we got from the response of the api
    return meetingId
  } catch (e) {
    console.log(e)
  }
}
