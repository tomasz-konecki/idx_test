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

  async setCurrentAlert(alertId, serverProductkey) {
    serverProductkey = serverProductkey || this.getSelected()
    if (!serverProductkey) throw Error("No productkey passed or selected.")
    let servers = await this.get()
    let currentServer = servers.filter(
      s => s.productkey === serverProductkey
    )[0]
    let serverId = currentServer._id
    alertId = alertId.toString()

    return await axios.put(
      `http://intevi.chmura:1337/idtservers/${serverId}`,
      {
        currentAlert: alertId
      },
      {
        headers: auth.getHeaders()
      }
    )
  }

  async getCurrentAlert(serverProductkey) {
    serverProductkey = serverProductkey || this.getSelected()
    if (!serverProductkey) throw Error("No productkey passed or selected.")
    let servers = await this.get()
    let currentServer = servers.filter(
      s => s.productkey === serverProductkey
    )[0]
    return currentServer.currentAlert
  }

  select(productkey) {
    this.selected = productkey
  }

  getSelected() {
    return localStorage.getItem("selectedServer")
  }
}

export default new IDTServers()
