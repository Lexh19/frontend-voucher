import axios from "../plugins/axios"

const userToken =JSON.parse(localStorage.getItem("userData")).token

export const gethistory = async params => {
  return await axios.get("/vouchers/history", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params, 
  })
  
}
