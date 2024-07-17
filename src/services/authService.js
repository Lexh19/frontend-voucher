import config from "../plugins/axios"

export const  login = async (email, password) => {
  

  return await config.post("/login", { email, password }) 
}
