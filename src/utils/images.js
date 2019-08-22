import axios from "axios"
import idtservers from "./idtservers"

class _Images {
  constructor() {
    this.images = {}
    this.load = this.load.bind(this)
    this.get = this.get.bind(this)
    this.clearCache = this.clearCache.bind(this)
  }

  load(imageSrc, serverProductkey) {
    serverProductkey = serverProductkey || idtservers.getSelected()
    if (!serverProductkey)
      return new Promise((_, reject) =>
        reject("No product key passed and no server selected")
      )
    return new Promise((resolve, reject) => {
      axios(`http://intevi.chmura/deviceassets/${imageSrc}`, {
        headers: {
          productkey: serverProductkey
        },
        responseType: "arraybuffer"
      })
        .then(response => {
          let contentType = response.headers["content-type"]
          let prefix = `data:${contentType};base64, `
          let image = Buffer.from(response.data, "binary").toString("base64")
          this.images[imageSrc] = prefix + image
          resolve(prefix + image)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  get = imageSrc => this.images[imageSrc]
  clearCache = () => (this.images = {})
}

export default new _Images()
