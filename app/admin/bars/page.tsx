"use client"
import React from "react"

import { useServiceContext } from "@/app/providers"
import { Bar } from "@/models/bar"

export default function Page() {
  const context = useServiceContext()
  const loginService = context.loginService
  const [isAdmin, setAdmin] = React.useState(false)

  React.useEffect(() => {
    async function checkAdmin() {
      if (await loginService.isAdmin()) setAdmin(true)
    }
    checkAdmin()
  })

  const barService = context.barService

  const [bars, setBars] = React.useState([] as Array<Bar>)
  const [loadingFailed, setLoadingFailed] = React.useState(false)

  const [selectedId, setSelectedId] = React.useState("")

  const [create, setCreate] = React.useState(false)
  const [update, setUpdate] = React.useState(false)
  const [newName, setNewName] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")

  React.useEffect(() => {
    async function retrieveBars() {
      try {
        let retrievedBars = await barService.getBars()

        setBars(retrievedBars)
      } catch {
        setLoadingFailed(true)
      }
    }

    if (bars.length === 0) {
      retrieveBars()
    }
  })

  function selectBar(id: string) {
    let isDeselect = selectedId === id

    setSelectedId(isDeselect ? "" : id)
    let selectedBar = bars.find((item) => item.id === id)

    if (selectedBar == null) {
      setNewName("")
      setNewPassword("")
    } else {
      setNewName(selectedBar.name)
      setNewPassword(selectedBar.password)
    }
  }

  async function createBar() {
    await barService.createBar(newName, newPassword)
    if (barService.bars !== null) {
      setBars(barService.bars)
    }
  }

  async function updateBar() {
    let selectedBar = bars.find((item) => item.id === selectedId)

    if (selectedBar != null) {
      await barService.updateBar({
        id: selectedBar.id,
        name: newName,
        password: newPassword,
        token: selectedBar.token,
      })
      if (barService.bars !== null) {
        setBars(barService.bars)
      }
    }
  }

  async function deleteBar() {
    await barService.deleteBar(selectedId)
    if (barService.bars !== null) {
      setBars(barService.bars)
    }
    setSelectedId("")
  }

  return (
    <main className="min-h-screen container mx-auto flex justify-center">
      { isAdmin &&
        <div className="flex flex-col w-4/12 gap-2">
          <h2 className="w-full">Beheer Barren</h2>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                value={create ? "Annuleren" : "Nieuw"}
                onClick={() => {
                  setUpdate(false)
                  setCreate(!create)
                }}
                className="bg-slate-500 p-1 rounded"
                type="button"
              />
              { selectedId.length > 0 &&
                <>
                  <input
                    value={"Verwijder"}
                    onClick={deleteBar}
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
            </div>
            <div className="flex flex-col gap-2">
              { (create || update) &&
                <>
                  <div className="flex justify-between w-full">
                    <label htmlFor="input-name">Naam:</label>
                    <input 
                      value={newName} 
                      onChange={(e) => setNewName(e.target.value)} 
                      className="bg-gray-400 text-black"
                      id="input-name"
                      type="text" 
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <label htmlFor="input-password">Wachtwoord:</label>
                    <input 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      className="bg-gray-400 text-black"
                      id="input-password"
                      type="text" 
                    />
                  </div>
                  <input
                    value="Bevestig"
                    onClick={create ? createBar : updateBar} 
                    className="bg-slate-500 p-1 rounded"
                    type="button"
                  />
                </>
              }
            </div>
          </div>
          <div className="flex flex-col bg-stone-800 overflow-y-auto grow">
            { loadingFailed &&
              <p className="p-2 text-red-600">Barren ophalen is mislukt</p>
            }
            { bars.map((bar) => (
              <BarItem 
                name={bar.name}
                isSelected={bar.id === selectedId}
                onClick={() => selectBar(bar.id)}
                key={bar.id}
              />
            ))}
          </div>
        </div>
      }
    </main>
  );
}

type BarItemProps = {
  name: string
  isSelected: boolean
  onClick: () => void
}

function BarItem({ name, isSelected, onClick }: BarItemProps) {
  let backgroundColor = isSelected ? " bg-cyan-800" : ""

  return (
    <div className={"p-2" + backgroundColor} onClick={onClick} role="button">
      {name}
    </div>
  )
}
