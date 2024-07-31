"use client"
import React from "react";
import { useServiceContext } from "@/app/providers";
import { mapIntToMethod, mapOrdersToListItems, methodToString, Order, OrderListItem } from "@/models/order";
import { Device } from "@/models/device";
import { Constants } from "@/generic/constants";

export default function Page() {
  const context = useServiceContext()
  const loginService = context.loginService
  const orderService = context.orderService
  const deviceService = context.deviceService
  const drinkService = context.drinkService

  const [devices, setDevices] = React.useState([] as Device[])
  const [orders, setOrders] = React.useState(new Map<string, OrderListItem[]>())
  const [loaded, setLoaded] = React.useState(false)
  const [loadingFailed, setLoadingFailed] = React.useState(false)

  const [selectedDevice, setSelectedDevice] = React.useState("")

  React.useEffect(() => {
    async function retrieveOrders(bar: string) {
      try {
        let foundDevices = await deviceService.getDevices(bar)
        let foundDrinks = await drinkService.getDrinks(bar)
        let newOrders = orders
        for (let i = 0; i < foundDevices.length; i++) {
          let deviceId = foundDevices[i].id
          let foundOrders = await orderService.getOrders(deviceId)
          let mappedOrders = mapOrdersToListItems(foundDrinks, foundOrders)
          newOrders.set(deviceId, mappedOrders)
        }
        setDevices(foundDevices)
        setOrders(newOrders)
        if (foundDevices.length > 0) {
          setSelectedDevice(foundDevices[0].id)
        }
        setLoaded(true)
      } catch {
        setLoadingFailed(true)
      }
    }

    let barId = loginService.getBarId() ?? localStorage.getItem(Constants.BarId)
    if (!loaded && barId !== null) {
      retrieveOrders(barId)
    }
  })

  async function deleteOrder(id: string) {
    try {
      await orderService.deleteOrder(id)
    } catch {
      console.error(`An error occurred while deleting order: ${id}`)
    }
  }

  return (
    <main className="m-auto w-11/12">
      { loadingFailed &&
        <p className="text-red-600">Loading in data has failed</p>
      }
      { loaded &&
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <label htmlFor="device-select">Terminal:</label>
            <select 
              id="device-select" 
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              { devices.map((item) => (
                <option value={item.id} key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <table>
            <thead className="text-left">
              <tr>
                <th>Product</th>
                <th>Aantal</th>
                <th>Prijs per Product</th>
                <th>Betaalmethode</th>
                <th>Tijdstip</th>
              </tr>
            </thead>
            <tbody className="bg-stone-800 overflow-y-auto">
              { orders.get(selectedDevice)?.map((item) => (
                <OrderRow 
                  order={item}
                  onDelete={() => deleteOrder(item.id)}
                  key={item.id} 
                />
              ))}
            </tbody>
          </table>
        </div>
      }
    </main>
  );
}

type OrderRowProps = {
  order: OrderListItem
  onDelete: () => void
}

function OrderRow({ order, onDelete }: OrderRowProps) {
  const [isDeleted, setIsDeleted] = React.useState(false)
  const [doDelete, setDoDelete] = React.useState(false)
  let visibility = isDeleted ? "hidden" : ""
  let backgroundColor = doDelete ? "bg-red-500" : ""
  let textColor = doDelete ? "text-red-700" : ""

  return (
    <tr className={`p-2 ${visibility} ${backgroundColor} ${textColor}`}>
      <td>{order.productName}</td>
      <td>{order.amount}</td>
      <td>{order.pricePerProduct}</td>
      <td>{methodToString(mapIntToMethod(order.method))}</td>
      <td>{order.timestamp.toLocaleString()}</td>
      <td>
        <input
          value="Verwijder"
          onClick={() => {
            if (doDelete) {
              setIsDeleted(true)
              onDelete()
            } else {
              setDoDelete(true)
            }
          }}
          className="bg-slate-500 p-1 rounded"
          type="button"
        />
      </td>
    </tr>
  )
}
