import config from "../plugins/axios"

export const  logout = async (email, password) => {
  

  return await config.post("/logout", { email, password }) 
}
