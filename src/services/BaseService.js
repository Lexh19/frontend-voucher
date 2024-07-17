import http from "../plugins/axios"

export default class BaseService {

  static get METHOD_GET() {
    return 'GET'
  }

  static get METHOD_POST() {
    return 'POST'
  }

  static get METHOD_PUT() {
    return 'PUT'
  }

  static get METHOD_DELETE() {
    return 'DELETE' 
  }

  constructor(prefix) {
    this.prefix = prefix
  }

  index(data) {
    return this.performRequest(BaseService.METHOD_GET, '', data)
  }

  show(id) {
    return this.performRequest(BaseService.METHOD_GET, id)
  }

  store(data) {
    return this.performRequest(BaseService.METHOD_POST, '', data)
  }

  update(id, data) {
    return this.performRequest(BaseService.METHOD_PUT, id, data)
  }

  destroy(id) {
    return this.performRequest(BaseService.METHOD_DELETE, id)
  }

  performRequest(method, url, data = {}, headers = {}) {
    let endPoint = this.prefix + (url ? "/" + url : "http://localhost:3000/api")
    let options = {
      method,
      url: endPoint,
      data,
      headers,
    }

    options[method.toUpperCase() === BaseService.METHOD_GET ? "params" : "data"] = data
    
    return http(options)
  }
}
