import axios from "../plugins/axios"

let userToken = null

// Cek apakah token tersedia di localStorage saat modul dimuat
const userData = JSON.parse(localStorage.getItem("userData"))
if (userData && userData.token) {
  userToken = userData.token
 
} else {
  console.error('Token tidak ditemukan di localStorage.')
}

export const claimVoucher = async id => {
  try {
    if (!userToken) {
      throw new Error('Token tidak tersedia di localStorage.')
    }

    const response = await axios.post(`/vouchers/${id}/claim`, {}, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error updating error:', error)
    throw error
  }
}
