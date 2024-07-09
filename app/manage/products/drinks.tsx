"use client"
import React from "react";
import { useServiceContext } from "@/app/providers";
import { Drink } from "@/models/drink";

type ManageDrinksProps = {
  drinks: Array<Drink>
  categoryId: string
  updateDrinks: (drinks: Array<Drink>) => void
  loadFailed: boolean
  barId: string
}

export default function ManageDrinks({ drinks, categoryId, updateDrinks, loadFailed, barId }: ManageDrinksProps) {
  let context = useServiceContext()
  let drinkService = context.drinkService

  const [create, setCreate] = React.useState(false)
  const [update, setUpdate] = React.useState(false)

  const [newName, setNewName] = React.useState("")
  const [newTag, setNewTag] = React.useState("")
  const [newStartPrice, setNewStartPrice] = React.useState("0.0")
  const [newCurrentPrice, setNewCurrentPrice] = React.useState("0.0")
  const [newRiseMultiplier, setNewRiseMultiplier] = React.useState("0.0")
  const [newDropMultiplier, setNewDropMultiplier] = React.useState("0.0")

  const [selectedId, setSelectedId] = React.useState("")

  function selectDrink(id: string) {
    let isDeselect = id === selectedId
    setSelectedId(isDeselect ? "" : id)
    let selectedDrink = drinks.find((item) => item.id === id)
    if (selectedDrink != null && !isDeselect) {
      setNewName(selectedDrink.name)
      setNewTag(selectedDrink.tag)
      setNewStartPrice(selectedDrink.startPrice.toString())
      setNewCurrentPrice(selectedDrink.currentPrice.toString())
      setNewRiseMultiplier(selectedDrink.riseMultiplier.toString())
      setNewDropMultiplier(selectedDrink.dropMultiplier.toString())
    } else {
      setNewName("")
      setNewTag("")
      setNewStartPrice("0.0")
      setNewCurrentPrice("0.0")
      setNewRiseMultiplier("0.0")
      setNewDropMultiplier("0.0")
    }
  }

  async function newDrink() {
    await drinkService.createDrink(
      newName, 
      barId, 
      parseFloat(newStartPrice), 
      parseFloat(newCurrentPrice), 
      parseFloat(newRiseMultiplier), 
      parseFloat(newDropMultiplier), 
      newTag, 
      categoryId
    )
    if (drinkService.drinks != null) {
      updateDrinks(drinkService.drinks)
    }
  }

  async function updateDrink() {
    await drinkService.updateDrink({
      id: selectedId,
      name: newName,
      barId: barId,
      startPrice: parseFloat(newStartPrice),
      currentPrice: parseFloat(newCurrentPrice),
      riseMultiplier: parseFloat(newRiseMultiplier),
      dropMultiplier: parseFloat(newDropMultiplier),
      tag: newTag,
      categoryId: categoryId,
    })
    if (drinkService.drinks !== null) {
      updateDrinks(drinkService.drinks)
    }
  }

  async function deleteDrink() {
    selectDrink("")
    await drinkService.deleteDrink(selectedId)
    if (drinkService.drinks !== null) {
      updateDrinks(drinkService.drinks)
    }
  }

  return (
    <div className="flex flex-col gap-2" style={{"flex": 3}}>
      <h2>Producten</h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          { categoryId.length > 0 &&
            <input 
              value={create ? "Annuleren" : "Nieuw"}
              className="bg-slate-500 p-1 rounded"
              onClick={() => {
                setUpdate(false)
                setCreate(!create)
              }}
              type="button"
            />
          }
          { selectedId.length > 0 &&
            <>
              <input 
                value="Verwijder"
                className="bg-slate-500 p-1 rounded"
                onClick={deleteDrink}
                type="button"
              />
              <input 
                value={update ? "Annuleren" : "Update"}
                className="bg-slate-500 p-1 rounded"
                onClick={() => {
                  setCreate(false)
                  setUpdate(!update)
                }}
                type="button"
              />
            </>
          }
        </div>
        { (create || update) &&
          <div className="flex flex-col w-fit gap-1">
            <div className="flex gap-2 justify-between">
              <label htmlFor="drink-name">Naam:</label>
              <input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-gray-400 text-black"
                type="text" 
              />
            </div>
            <div className="flex gap-2 justify-between">
              <label htmlFor="drink-name">Tag:</label>
              <input 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="bg-gray-400 text-black"
                type="text" 
              />
            </div>
            <div className="flex gap-2 justify-between">
              <label htmlFor="drink-name">Start Prijs:</label>
              <input 
                value={newStartPrice}
                onChange={(e) => setNewStartPrice(e.target.value)}
                className="bg-gray-400 text-black"
                type="text"
              />
            </div>
            <div className="flex gap-2 justify-between">
              <label htmlFor="drink-name">Huidige Prijs:</label>
              <input 
                value={newCurrentPrice}
                onChange={(e) => setNewCurrentPrice(e.target.value)}
                className="bg-gray-400 text-black"
                type="text" 
              />
            </div>
            <div className="flex gap-2 justify-between">
              <label htmlFor="drink-name">Stijg Multiplier:</label>
              <input 
                value={newRiseMultiplier}
                onChange={(e) => setNewRiseMultiplier(e.target.value)}
                className="bg-gray-400 text-black"
                type="text" 
              />
            </div>
            <div className="flex gap-2 justify-between">
              <label htmlFor="drink-name">Daal Multiplier:</label>
              <input 
                value={newDropMultiplier}
                onChange={(e) => setNewDropMultiplier(e.target.value)}
                className="bg-gray-400 text-black"
                type="text" 
              />
            </div>
            <input 
              value="Bevestig"
              onClick={() => create ? newDrink() : updateDrink()}
              className="bg-slate-500 p-1 rounded"
              type="button"
            />
          </div>
        }
      </div>
      { loadFailed &&
        <p className="p-2 text-red-600">Drank ophalen is mislukt</p>
      }
      <table>
        <thead className="text-left">
          <tr>
            <th>Naam</th>
            <th>Tag</th>
            <th>Start Prijs</th>
            <th>Huidige Prijs</th>
            <th>Stijg Multiplier</th>
            <th>Daal Multiplier</th>
          </tr>
        </thead>
        <tbody className="bg-stone-800">
          { drinks.map((item) => (
            <DrinkRow 
              drink={item}
              isSelected={selectedId === item.id}
              onClick={() => selectDrink(item.id)}
              key={item.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

type DrinkRowProps = {
  drink: Drink
  isSelected: boolean
  onClick: () => void
}

function DrinkRow(props: DrinkRowProps) {
  const { drink, isSelected, onClick } = props
  let backgroundColor = isSelected ? "bg-cyan-800" : ""

  return (
    <tr onClick={onClick} className={backgroundColor}>
      <td>{drink.name}</td>
      <td>{drink.tag}</td>
      <td>{drink.startPrice}</td>
      <td>{drink.currentPrice}</td>
      <td>{drink.riseMultiplier}</td>
      <td>{drink.dropMultiplier}</td>
    </tr>
  )
}
