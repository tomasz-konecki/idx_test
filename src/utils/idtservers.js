import axios from "axios"
import auth from "./auth"
import cloud from "./cloud"

class IDTServers {
  get = () =>
    cloud.sendApiRequest("get", "idtservers", undefined, {}, d => d.data)

  add = (productKey, name) => cloud.sendForm("idtservers", { productKey, name })

  select = productkey => (this.selected = productkey)

  getSelected = () => this.selected

  setCurrentAlert = async (alertId, serverProductkey) => {
    serverProductkey = serverProductkey || this.getSelected()
    if (!serverProductkey) throw Error("No productkey passed or selected.")
    let servers = await this.get()
    let currentServer = servers.filter(
      s => s.productKey === serverProductkey
    )[0]
    let serverId = currentServer._id
    alertId = alertId.toString()

    return await this.sendApiRequest(
      "put",
      `idtservers/${serverId}`,
      {
        currentAlert: alertId
      },
      auth.headers
    )
  }

  getCurrentAlert = async serverProductkey => {
    serverProductkey = serverProductkey || this.getSelected()
    if (!serverProductkey) throw Error("No productkey passed or selected.")
    let servers = await this.get()
    let currentServer = servers.filter(
      s => s.productKey === serverProductkey
    )[0]
    return currentServer.currentAlert
  }

  sendApiRequest = (
    method,
    path,
    body,
    responseTransform,
    serverProductkey
  ) => {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return Promise.reject("No product key and no server selected")
    return new Promise((resolve, reject) => {
      axios({
        method,
        url: `http://intevi.chmura/deviceapi/${path}`,
        data: body,
        headers: { productkey: serverProductkey }
      })
        .then(response => {
          let data = response.data
          if (responseTransform) data = responseTransform(data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    }, true)
  }
}

const idtservers = new IDTServers()
export default idtservers
