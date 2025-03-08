const API_BASE_URL = 'https://stage.achareh.ir/api'
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4',
}

const api = {

  getAddresses: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/karfarmas/address`, {
        method: 'GET',
        headers: API_HEADERS,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching addresses:', error)
      throw error
    }
  },

  saveAddress: async (addressData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/karfarmas/address`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(addressData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error saving address:', error)
      throw error
    }
  },
}

export default api
