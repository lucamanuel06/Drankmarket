import { ApiService } from "./api-service"
import { Order, OrderMethod, mapResponseToOrder } from "@/models/order"

export class OrderService extends ApiService {

  public orders: Order[] | null = null

  constructor() {
    super("/order")
  }

  async getOrders(deviceId: string): Promise<Array<Order>> {
    let response = await this.getRequest({
      name: "deviceId",
      value: deviceId,
    })
    let found: Array<Response> = await response.json()
    let mapped = found.map(mapResponseToOrder)
    this.orders = mapped
    return mapped
  }

  async createOrder(
    deviceId: string,
    productId: string,
    amount: number,
    pricePerProduct: number,
    method: OrderMethod,
  ): Promise<Order> {
    let response = await this.doRequest("POST", {
      "device_id": deviceId,
      "product_id": productId,
      "timestamp": (new Date()).toISOString(),
      "amount": amount,
      "price_per_product": pricePerProduct,
      "method": method,
    })
    let created: Response = await response.json()
    let mapped = mapResponseToOrder(created)
    if (this.orders !== null) {
      this.orders = [mapped, ...this.orders]
    }
    return mapped
  }

  async updateOrder(updated: Order) {
    await this.doRequest("PUT", {
      "id": updated.id,
      "device_id": updated.deviceId,
      "product_id": updated.productId,
      "timestamp": updated.timestamp.toISOString(),
      "amount": updated.amount,
      "price_per_product": updated.pricePerProduct,
      "method": updated.method,
    })
    if (this.orders !== null) {
      this.orders = this.orders.map((item) => {
        if (item.id === updated.id) {
          return updated
        } else {
          return item
        }
      })
    }
  }

  async deleteOrder(id: string) {
    await this.doRequest("DELETE", { "id": id })
    if (this.orders !== null) {
      this.orders = this.orders.filter((item) => item.id !== id)
    }
  }
}
