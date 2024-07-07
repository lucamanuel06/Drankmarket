import { ApiService } from "./api-service"
import { Order, mapResponseToOrder } from "@/models/order"

export class OrderService extends ApiService {

  constructor() {
    super("/order")
  }

  async getOrders(deviceId: string): Promise<Array<Order>> {
    let response = await this.getRequest({
      name: "deviceId",
      value: deviceId,
    })
    let found: Array<Response> = await response.json()
    return found.map(mapResponseToOrder)
  }

  async createOrder(
    deviceId: string,
    productId: string,
    amount: number,
    pricePerProduct: number,
  ): Promise<Order> {
    let response = await this.doRequest("POST", {
      "device_id": deviceId,
      "product_id": productId,
      "timestamp": (new Date()).toISOString(),
      "amount": amount,
      "price_per_product": pricePerProduct,
    })
    let created: Response = await response.json()
    return mapResponseToOrder(created)
  }

  async updateOrder(updated: Order) {
    await this.doRequest("PUT", {
      "id": updated.id,
      "device_id": updated.deviceId,
      "product_id": updated.productId,
      "timestamp": updated.timestamp.toISOString(),
      "amount": updated.amount,
      "price_per_product": updated.pricePerProduct,
    })
  }

  async deleteOrder(id: string) {
    await this.doRequest("DELETE", { "id": id })
  }
}
