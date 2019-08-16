import axios from "axios"
import auth from "./auth"

class IDTServers {
  get() {
    return new Promise((resolve, reject) => {
      axios("http://intevi.chmura:1337/users/me", {
        headers: auth.getHeaders()
      })
        .then(response => {
          resolve(response.data.idtservers)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  add(productkey, name) {
    return axios.post(
      "http://intevi.chmura:1337/idtservers",
      {
        productkey,
        name
      },
      {
        headers: auth.getHeaders()
      }
    )
  }

  select(productkey) {
    this.selected = productkey
  }

  getSelected() {
    return localStorage.getItem("selectedServer")
  }
}

export default new IDTServers()
