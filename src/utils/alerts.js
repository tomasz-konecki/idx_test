import axios from "axios"
import idtservers from "./idtservers"

class _Alerts {
  get(serverProductkey) {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return new Promise((_, reject) =>
        reject("No product key passed and no server selected")
      )
    return new Promise((resolve, reject) => {
      axios("http://intevi.chmura/deviceapi/alerts", {
        headers: {
          productkey: serverProductkey
        }
      })
        .then(response => {
          resolve(response.data.alert)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  clear(serverProductkey) {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return new Promise((_, reject) =>
        reject("No product key passed and no server selected")
      )
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://intevi.chmura/deviceapi/devices/stbs/eas/sendcommand",
          {
            command: "225.10.10.10 EAS ALL,NO_GROUP_ID,HIDE_ALERT,"
          },
          {
            headers: {
              productkey: serverProductkey
            }
          }
        )
        .then(response => {
          resolve(response.data.message)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  show(text, alertIndex, serverProductkey) {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return new Promise((_, reject) =>
        reject("No product key passed and no server selected")
      )
    return new Promise((resolve, reject) => {
      axios
        .post(
          "http://intevi.chmura/deviceapi/devices/stbs/eas/sendcommand",
          {
            command: `225.10.10.10 EAS ALL,NO_GROUP_ID,SHOW_ALERT,${alertIndex},"<br><br>${text}",-1`
          },
          {
            headers: {
              productkey: serverProductkey
            }
          }
        )
        .then(response => {
          resolve(response.data.message)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  saveEdits(text, alertId, serverProductkey) {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return new Promise((_, reject) =>
        reject("No product key passed and no server selected")
      )
    return new Promise((resolve, reject) => {
      axios
        .post(
          `http://intevi.chmura/deviceapi/alerts/saveedited/${alertId}`,
          {
            text
          },
          {
            headers: {
              productkey: serverProductkey
            }
          }
        )
        .then(response => {
          resolve(response.data.alert)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  saveAsNew(text, editedAlertId, serverProductkey) {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return new Promise((_, reject) =>
        reject("No product key passed and no server selected")
      )
    return new Promise((resolve, reject) => {
      axios
        .post(
          `http://intevi.chmura/deviceapi/alerts/saveasnewalert/${editedAlertId}`,
          {
            text
          },
          {
            headers: {
              productkey: serverProductkey
            }
          }
        )
        .then(response => {
          resolve(response.data.alert)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default new _Alerts()
