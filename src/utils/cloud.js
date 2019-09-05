import axios from "axios"
import auth from "./auth"

class _Cloud {
  sendRequest = (method, path, body, headers, responseTransform) =>
    new Promise((resolve, reject) => {
      axios({
        method,
        url: `http://${this.url}/${path}`,
        data: body,
        headers
      })
        .then(response => {
          let data = response.data
          console.log("Cloud sendRequest", data)
          if (responseTransform) resolve(responseTransform(data))
          else resolve(data)
        })
        .catch(error => reject(error))
    })

  sendApiRequest = (method, path, body, headers, responseTransform, noAuth) => {
    if (!noAuth && auth.token) headers = { ...headers, ...auth.headers }
    return this.sendRequest(
      method,
      `api/v1/${path}`,
      body,
      headers,
      responseTransform
    )
  }

  sendForm = (path, formJSON) => {
    let formData = new FormData()
    Object.keys(formJSON).forEach(key => formData.append(key, formJSON[key]))
    return this.sendApiRequest("post", path, formData)
  }

  getSavedMessages = () => this.sendApiRequest("get", "saved-messages")

  saveMessage = message => this.sendForm("saved-messages", { message })

  get url() {
    // return process.env.REACT_APP_CLOUD_ADDRESS
    return "192.168.0.21:1337"
  }
}

export default new _Cloud()
