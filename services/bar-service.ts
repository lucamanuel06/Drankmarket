import { ApiService } from "./api-service"
import { Bar, mapResponseToBar } from "@/models/bar"

export class BarService extends ApiService {

  public bars: Array<Bar> | null = null
    
  constructor() {
    super("/bar")
  }

  async getBars(): Promise<Array<Bar>> {
    let response = await this.getRequest()
    let bars: Array<any> = await response.json()
    let mapped = bars.map(mapResponseToBar)
    this.bars = mapped
    return mapped
  }

  async createBar(name: string, password: string): Promise<Bar> {
    let response = await this.doRequest("POST", {
      "name": name,
      "password": password,
    })
    let bar = await response.json() 
    let mapped = mapResponseToBar(bar)
    if (this.bars !== null) {
      this.bars = [mapped, ...this.bars]
    }
    return mapped
  }

  async updateBar(updatedBar: Bar): Promise<Bar> {
    let response = await this.doRequest("PUT", {
      "id": updatedBar.id,
      "name": updatedBar.name,
      "password": updatedBar.password,
      "token": updatedBar.token,
    })
    let bar = await response.json()
    let mapped = mapResponseToBar(bar)
    if (this.bars !== null) {
      this.bars = this.bars.map((item) => {
        if (item.id !== updatedBar.id) return item
        else return updatedBar
      })
    }
    return mapped
  }

  async deleteBar(id: string) {
    await this.doRequest("DELETE", { "id": id })
    if (this.bars !== null) {
      this.bars = this.bars.filter((item) => item.id !== id)
    }
  }
}
