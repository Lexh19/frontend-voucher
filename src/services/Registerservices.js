import config from "../plugins/axios"

export const  register = async (username, password, email, nama) => {
  console.log(username, password, email, nama)

  return await config.post("/register", { username, password, email, nama }) 
}
