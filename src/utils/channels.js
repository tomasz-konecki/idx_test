import axios from "axios"
import idtservers from "./idtservers"

class Channels {
  get(serverProductkey) {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return new Promise((resolve, reject) =>
        reject("No product key passed and no server selected")
      )
    return new Promise((resolve, reject) => {
      axios("http://intevi.chmura/deviceapi/allchannels", {
        headers: {
          productkey: serverProductkey
        }
      })
        .then(response => {
          resolve(response.data.channels)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  getAllEnabled(serverProductkey) {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return new Promise((resolve, reject) =>
        reject("No product key passed and no server selected")
      )
    return new Promise((resolve, reject) => {
      axios("http://intevi.chmura/deviceapi/allenabledchannels", {
        headers: {
          productkey: serverProductkey
        }
      })
        .then(response => {
          resolve(response.data.channels)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  assignToGroup(channelId, groupId, serverProductkey) {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return new Promise((resolve, reject) =>
        reject("No product key passed and no server selected")
      )
    return axios.post(
      `http://intevi.chmura/deviceapi/channels/${channelId}/assigntogroup/${groupId}`,
      {},
      {
        headers: {
          productkey: serverProductkey
        }
      }
    )
  }
  removeFromGroup(channelId, groupId, serverProductkey) {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return new Promise((resolve, reject) =>
        reject("No product key passed and no server selected")
      )
    return axios.post(
      `http://intevi.chmura/deviceapi/channels/${channelId}/removefromgroup/${groupId}`,
      {},
      {
        headers: {
          productkey: serverProductkey
        }
      }
    )
  }
}

export default new Channels()
