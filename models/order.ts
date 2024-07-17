export enum OrderMethod {
  Cash = 0,
  Card = 1,
  Giftcard = 2,
  Other = 3,
}

export type Order = {
  id: string
  deviceId: string
  productId: string
  timestamp: Date
  amount: number
  pricePerProduct: number
  method: OrderMethod
}

export function mapIntToMethod(int: number): OrderMethod {
  switch (int) {
    case 0:
      return OrderMethod.Cash
    case 1:
      return OrderMethod.Card
    case 2:
      return OrderMethod.Giftcard
    default:
      return OrderMethod.Other
  }
}

export function methodToString(method: OrderMethod): string {
  switch (method) {
    case OrderMethod.Cash:
      return "Contant"
    case OrderMethod.Card:
      return "Pin"
    case OrderMethod.Giftcard:
      return "Cadeaubon"
    default:
      return "Anders"
  }
}

export const mapResponseToOrder = (response: any): Order => {
  return {
    id: response["id"],
    deviceId: response["device_id"],
    productId: response["product_id"],
    timestamp: new Date(response["timestamp"]),
    amount: response["amount"],
    pricePerProduct: response["price_per_product"],
    method: mapIntToMethod(response["method"]),
  }
}
