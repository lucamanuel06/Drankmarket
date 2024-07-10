import { ApiService } from "./api-service"
import { Device, mapResponseToDevice } from "@/models/device"

export class DeviceService extends ApiService {

  public devices: Device[] | null = null

  constructor() {
    super("/device")
  }

  async getDevices(barId: string): Promise<Array<Device>> {
    let response = await this.getRequest({
        name: "barId",
        value: barId,
    })
    let devices: Array<any> = await response.json()
    let mapped = devices.map(mapResponseToDevice)
    this.devices = mapped
    return mapped
  }

  async createDevice(barId: string, name: string): Promise<Device> {
    let response = await this.doRequest("POST", {
      "bar_id": barId,
      "name": name,
    })
    let device = await response.json()
    let mapped = mapResponseToDevice(device)
    if (this.devices !== null) {
      this.devices = [mapped, ...this.devices]
    }
    return mapped
  }

  async updateDevice(deviceId: string, name: string): Promise<Device> {
    let response = await this.doRequest("PUT", {
      "id": deviceId,
      "name": name,
    })
    let updated = await response.json()
    let mapped = mapResponseToDevice(updated)
    if (this.devices !== null) {
      this.devices = this.devices.map((item) => {
        return item.id === deviceId ? mapped : item
      })
    }
    return mapped
  }
  
  async deleteDevice(id: string) {
    await this.doRequest("DELETE", { "id": id })
    if (this.devices !== null) {
      this.devices = this.devices.filter((item) => {
        return item.id !== id
      })
    }
  }
}
