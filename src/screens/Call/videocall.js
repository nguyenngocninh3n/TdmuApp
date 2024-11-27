export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwMzAyNjY1Ny01Y2RmLTRkZDUtYThmMi04MmI2MmQwYzE3ZWUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMjcyOTAwNiwiZXhwIjoxNzMzMzMzODA2fQ.j9WuWXZw6uQZ_vuFr0CsvO0X2rDo4NR1KiMQt_BKG5Y'

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })

  const { roomId } = await res.json()
  return roomId
}
