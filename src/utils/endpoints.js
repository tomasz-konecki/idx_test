import axios from "axios"
import idtservers from "./idtservers"

class Endpoints {
  get(productkey) {
    if (!productkey) productkey = idtservers.getSelected()
    if (!productkey)
      return new Promise((resolve, reject) =>
        reject("No product key and no server selected")
      )
    return new Promise((resolve, reject) => {
      axios("http://intevi.chmura/deviceapi/endpoints", {
        headers: {
          productkey
        }
      })
        .then(response => {
          resolve(response.data.endpoint)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  getGroups(productkey) {
    if (!productkey) productkey = idtservers.getSelected()
    if (!productkey)
      return new Promise((resolve, reject) =>
        reject("No product key and no server selected")
      )
    return new Promise((resolve, reject) => {
      axios("http://intevi.chmura/deviceapi/endpointgroups", {
        headers: {
          productkey
        }
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  async getGroupsWithEndpoints(productkey) {
    if (!productkey) productkey = idtservers.getSelected()
    if (!productkey)
      return new Promise((resolve, reject) =>
        reject("No product key and no server selected")
      )
    // O(n + m)
    let groups = await this.getGroups(productkey)
    let endpoints = await this.get(productkey)
    groups.push({
      name: "unassigned",
      id: "unassigned"
    })
    let indexOfGroup = {}
    for (let i in groups) indexOfGroup[groups[i].id] = i
    for (let i in groups) groups[i].endpoints = []
    for (let endpoint of endpoints) {
      let group =
        groups[indexOfGroup[endpoint.groupid]] ||
        groups[indexOfGroup["unassigned"]]
      group.endpoints.push(endpoint)
    }
    return groups
  }
}

export default new Endpoints()
