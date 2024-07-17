import axios from "../plugins/axios"

const userToken =JSON.parse(localStorage.getItem("userData")).token

export const getvoucher = async params => {
  return await axios.get("/vouchers", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params, 
  })
  
}
