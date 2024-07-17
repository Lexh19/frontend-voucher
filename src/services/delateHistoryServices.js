import axios from "../plugins/axios"

const userToken = JSON.parse(localStorage.getItem("userData")).token

export const deleteVoucher = async id => {
  try {
    const response = await axios.delete(`/vouchers/history/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })

    
    return response.data
  } catch (error) {
    console.error('Error deleting voucher:', error)
    throw error
  }
}
