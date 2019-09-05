import { Cookies } from "react-cookie"
import cloud from "./cloud"
const cookies = new Cookies()

class Auth {
  login = (email, password) =>
    new Promise((resolve, reject) => {
      cloud
        .sendForm("user/login", { email, password })
        .then(response => {
          this.user = response.user
          cookies.set("token", response.token)
          resolve(this.user)
        })
        .catch(error => reject(error))
    })

  logout = () => cookies.remove("token")

  tryToLoginWithCookies = () =>
    new Promise((resolve, reject) => {
      if (this.isLoggedIn) return resolve(this.user)
      if (!this.token) return reject("Couldn't get the token cookie")
      cloud
        .sendApiRequest("get", "user/me")
        .then(response => {
          this.user = response
          resolve(this.user)
        })
        .catch(error => reject(error))
    })

  get isLoggedIn() {
    return this.token && this.user
  }

  get token() {
    return cookies.get("token")
  }

  get headers() {
    return { Authorization: `Bearer ${this.token}` }
  }
}

export default new Auth()
