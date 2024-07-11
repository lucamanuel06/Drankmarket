"use client"
import React from "react"
import { useServiceContext } from "@/app/providers"
import { Category } from "@/models/category"

type ManageCategoriesProps = {
  categories: Array<Category>
  setCategories: (categories: Array<Category>) => void
  selectedId: string
  setSelectedId: (id: string) => void
  loadingFailed: boolean
  barId: string
}

export default function ManageCategories({
  categories, setCategories, selectedId, setSelectedId, loadingFailed, barId
}: ManageCategoriesProps) {
  let categoryService = useServiceContext().categoryService

  const [create, setCreate] = React.useState(false)
  const [newName, setNewName] = React.useState("")
  const [newColor, setNewColor] = React.useState("#000000")
  const [update, setUpdate] = React.useState(false)
  const [nameToUpdate, setNameToUpdate] = React.useState("")
  const [updateColor, setColorToUpdate] = React.useState("#000000")

  async function newCategory() {
    await categoryService.createCategory(newName, newColor, barId)
    if (categoryService.categories !== null) {
      setCategories(categoryService.categories)
    }
  }

  async function updateCategory() {
    await categoryService.updateCategory(selectedId, nameToUpdate, updateColor)
    if (categoryService.categories !== null) {
      setCategories(categoryService.categories)
    }
  }

  async function deleteCategory() {
    await categoryService.deleteCategory(selectedId)
    if (categoryService.categories !== null) {
      setCategories(categoryService.categories)
      setSelectedId("")
    }
  }

  return (
    <div className="flex flex-col gap-2" style={{"flex": 1}}>
      <h2>Product Categorieën</h2>
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
          <input 
            value="Verwijder"
            onClick={deleteCategory}
            className="bg-slate-500 p-1 rounded"
            type="button"
          />
        }
        { selectedId.length > 0 &&
          <input 
            value={update ? "Annuleren" : "Update"}
            onClick={() => {
              setCreate(false)
              setUpdate(!update)
            }}
            className="bg-slate-500 p-1 rounded"
            type="button"
          />
        }
      </div>
      { create &&
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="new-cat-field">Naam:</label>
            <input 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-gray-400 text-black"
              id="new-cat-field"
              type="text"
            />
            <label htmlFor="new-color-field">Kleur:</label>
            <input 
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="bg-gray-400 text-black"
              id="new-color-field"
              type="color"
            />
          </div>
          <input 
            value="Bevestig"
            onClick={newCategory}
            className="bg-slate-500 p-1 rounded"
            type="button"
          />
        </div>
      }
      { update && selectedId.length > 0 &&
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="update-cat-field">Nieuwe naam:</label>
            <input 
              value={nameToUpdate}
              onChange={(e) => setNameToUpdate(e.target.value)}
              className="bg-gray-400 text-black"
              id="update-cat-field"
              type="text"
            />
            <label htmlFor="update-color-field">Nieuwe kleur:</label>
            <input 
              value={updateColor}
              onChange={(e) => setColorToUpdate(e.target.value)}
              className="bg-gray-400 text-black"
              id="update-color-field"
              type="color"
            />
          </div>
          <input 
            value="Bevestig"
            onClick={updateCategory}
            className="bg-slate-500 p-1 rounded"
            type="button"
          />
        </div>
      }
      <div className="bg-stone-800 w-fill flex flex-col overflow-y-auto" style={{"flex": 1}}>
        { loadingFailed &&
          <p className="p-2 text-red-600">Categorieën ophalen is mislukt</p>
        }
        { categories.map((item) => (
          <CategoryItem
            isSelected={selectedId === item.id} 
            name={item.name} 
            onClick={() => {
              setSelectedId(selectedId === item.id ? "" : item.id)
              setNameToUpdate(item.name)
              setColorToUpdate(item.color)
            }}
            key={item.id}
          />
        ))}
      </div>
    </div>
  )
}

const CategoryItem: React.FC<CategoryItemProps> = ({ isSelected, name, onClick }) => {
  let backgroundColor = isSelected ? " bg-cyan-800" : ""

  return (
    <div className={"p-2" + backgroundColor} onClick={onClick} role="button">
      {name}
    </div>
  )
}

type CategoryItemProps = {
  isSelected: boolean
  name: string
  onClick: () => void
}
