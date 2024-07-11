"use client"
import React from "react"
import { useServiceContext } from "@/app/providers"
import { Device } from "@/models/device"

export default function Page() {
  const context = useServiceContext()
  const deviceService = context.deviceService
  const barId = context.loginService.getBarId()

  const [devices, setDevices] = React.useState([] as Device[])
  const [loaded, setLoaded] = React.useState(false)
  const [loadFailed, setLoadFailed] = React.useState(false)

  const [selected, setSelected] = React.useState("")

  const [create, setCreate] = React.useState(false)
  const [update, setUpdate] = React.useState(false)
  const [newName, setNewName] = React.useState("")

  React.useEffect(() => {
    async function retrieveDevices(bar: string) {
      try {
        setDevices(await deviceService.getDevices(bar))
        setLoaded(true)
      } catch {
        setLoadFailed(true)
      }
    }

    if (!loaded && barId !== null) {
      retrieveDevices(barId)
    }
  })

  function onSelect(id: string) {
    if (id === selected) setSelected("")
    else setSelected(id)
  }

  async function createDevice() {
    if (barId !== null) {
      await deviceService.createDevice(barId, newName)
      if (deviceService.devices !== null) {
        setDevices(deviceService.devices)
      }
    }
  }

  async function updateDevice() {
    await deviceService.updateDevice(selected, newName)
    if (deviceService.devices !== null) {
      setDevices(deviceService.devices)
    }
  }

  async function deleteDevice() {
    await deviceService.deleteDevice(selected)
    if (deviceService.devices !== null) {
      setDevices(deviceService.devices)
    }
    setSelected("")
  }

  return (
    <main className="min-h-screen container mx-auto flex justify-center gap-2">
      <div className="flex flex-col items-end gap-2 w-1/6">
        <input
          value={create ? "Annuleren" : "Nieuw"}
          onClick={() => {
            setSelected("")
            setUpdate(false)
            setCreate(!create)
          }}
          className="bg-slate-500 p-1 rounded"
          type="button" 
        />
        { selected.length > 0 &&
          <>
            <input
              value="Verwijderen"
              onClick={deleteDevice}
              className="bg-slate-500 p-1 rounded"
              type="button" 
            />
            <input
              value={update ? "Annuleren" : "Update"}
              onClick={() => {
                setCreate(false)
                setUpdate(!update)
              }}
              className="bg-slate-500 p-1 rounded"
              type="button" 
            />
          </>
        }
        { (create || update) &&
          <div className="flex flex-col gap-2">
            <label htmlFor="device-name-field">Naam:</label>
            <input 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-gray-400 text-black"
              type="text"
            />
            <input
              value="Bevestig"
              onClick={create ? createDevice : updateDevice}
              className="bg-slate-500 p-1 rounded"
              type="button"
            />
          </div>
        }
      </div>
      <div className="flex flex-col bg-stone-800 overflow-y-auto w-1/4">
        { loadFailed &&
          <p className="p-2 text-red-600">Terminals ophalen is mislukt</p>
        }
        { devices.map((item) => (
          <DeviceRow
            name={item.name}
            isSelected={item.id === selected}
            onClick={() => onSelect(item.id)}
            key={item.id} 
          />
        ))}
      </div>
    </main>
  )
}

type DeviceRowProps = {
  name: string
  isSelected: boolean
  onClick: () => void
}

function DeviceRow({ name, isSelected, onClick }: DeviceRowProps) {
  let backgroundColor = isSelected ? "bg-cyan-800" : ""

  return (
    <div className={"p-2 " + backgroundColor} onClick={onClick} role="button">{name}</div>
  )
}
