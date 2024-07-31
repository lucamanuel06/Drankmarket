import { OrderExportItem } from "@/models/order";

export class ExportService {
  
  ordersToCSV(orders: OrderExportItem[]): Blob {
    let headers = ["id", "product", "device", "timestamp", "amount", "price_per_product", "method"].join(",")
    let output = [headers]
    for (let i = 0; i < orders.length; i++) {
      let seperated = this.commaSeperateOrder(orders[i])
      output.push(seperated)
    }
    return new Blob(output, { type: "text/csv" })
  }

  private commaSeperateOrder(order: OrderExportItem): string {
    return `\n${order.id},${order.productName},${order.device},${order.timestamp},${order.amount},${order.pricePerProduct},${order.method}`
  }
}
