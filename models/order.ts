export type Order = {
  id: string
  deviceId: string
  productId: string
  timestamp: Date
  amount: number
  pricePerProduct: number
}

export const mapResponseToOrder = (response: any): Order => {
  return {
    id: response["id"],
    deviceId: response["device_id"],
    productId: response["product_id"],
    timestamp: new Date(response["timestamp"]),
    amount: response["amount"],
    pricePerProduct: response["price_per_product"]
  }
}
