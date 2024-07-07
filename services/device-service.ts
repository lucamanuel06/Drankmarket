import { ApiService } from "./api-service"
import { Device, mapResponseToDevice } from "@/models/device"

export class DeviceService extends ApiService {

  constructor() {
    super("/device")
  }

  async getDevices(barId: string): Promise<Array<Device>> {
    let response = await this.getRequest({
        name: "barId",
        value: barId,
    })
    let devices: Array<any> = await response.json()
    return devices.map(mapResponseToDevice)
  }

  async createDevice(barId: string, name: string): Promise<Device> {
    let response = await this.doRequest("POST", {
      "bar_id": barId,
      "name": name,
    })
    let device = await response.json()
    return mapResponseToDevice(device)
  }

  async updateDevice(deviceId: string, name: string): Promise<Device> {
    let response = await this.doRequest("PUT", {
      "id": deviceId,
      "name": name,
    })
    let updated = await response.json()
    return mapResponseToDevice(updated)
  }
  
  async deleteDevice(id: string) {
    await this.doRequest("DELETE", { "id": id })
  }
}
