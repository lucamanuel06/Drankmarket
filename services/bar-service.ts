import { ApiService } from "./api-service"
import { Bar, mapResponseToBar } from "../models/bar"

export class BarService extends ApiService {
    
  constructor() {
    super("/bar")
  }

  async getBars(): Promise<Array<Bar>> {
    let response = await this.getRequest()
    let bars: Array<any> = await response.json()
    return bars.map(mapResponseToBar)
  }

  async createBar(name: string, password: string): Promise<Bar> {
    let response = await this.doRequest("POST", {
      "name": name,
      "password": password,
    })
    let bar = await response.json() 
    return mapResponseToBar(bar)
  }

  async updateBar(updatedBar: Bar): Promise<Bar> {
    let response = await this.doRequest("PUT", {
      "id": updatedBar.id,
      "name": updatedBar.name,
      "password": updatedBar.password,
      "token": updatedBar.token,
    })
    let bar = await response.json()
    return mapResponseToBar(bar)
  }

  async deleteBar(id: string) {
    await this.doRequest("DELETE", { "id": id })
  }
}
