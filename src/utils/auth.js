import axios from "axios"
import { Cookies } from "react-cookie"
const cookies = new Cookies()

class Auth {
  constructor() {
    this.login = this.login.bind(this)
  }

  login(identifier, password) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://intevi.chmura:1337/auth/local", {
          identifier,
          password
        })
        .then(response => {
          this.token = response.data.jwt
          this.user = response.data.user
          cookies.set("token", this.token)
          resolve(this.user)
        })
        .catch(error => reject(error))
    })
  }

  get isLoggedIn() {
    return this.token && this.user
  }

  tryToLoginWithCookies() {
    return new Promise((resolve, reject) => {
      if (this.isLoggedIn) {
        resolve()
      }

      this.token = cookies.get("token")

      if (!this.token) {
        reject("Couldn't get the token cookie")
      }

      axios("http://intevi.chmura:1337/users/me", {
        headers: this.getHeaders()
      })
        .then(response => {
          this.user = response.data
          resolve(this.user)
        })
        .catch(error => reject(error))
    })
  }

  getHeaders() {
    const token = cookies.get("token")
    return token ? { Authorization: `Bearer ${token}` } : null
  }
}

export default new Auth()
