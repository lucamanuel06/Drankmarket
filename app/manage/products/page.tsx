"use client"
import React from "react";
import { useServiceContext } from "@/app/providers";
import { Drink } from "@/models/drink";
import { Category } from "@/models/category";
import { getDrinksByCategory } from "@/generic/utils/drinks-mapper";
import ManageCategories from "./categories"
import ManageDrinks from "./drinks"

export default function Page() {
  let context = useServiceContext()
  let loginService = context.loginService
  let categoryService = context.categoryService
  let drinkService = context.drinkService
  let barId = loginService.getBarId()
  
  const [categories, setCategories] = React.useState([] as Array<Category>)
  const [categoriesFailed, setCategoriesFailed] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState("")

  const [drinks, setDrinks] = React.useState([] as Array<Drink>)
  const [drinksFailed, setDrinksFailed] = React.useState(false)

  React.useEffect(() => {
    async function fetchCategories(barId: string) {
      if (categoryService.categories !== null) {
        setCategories(categoryService.categories)
        return
      }

      try {
        setCategories(await categoryService.getCategories(barId))
      } catch {
        setCategoriesFailed(true)
      }
    }

    async function fetchDrinks(barId: string) {
      let foundDrinks: Array<Drink> = []
      if (drinkService.drinks !== null) {
        foundDrinks = drinkService.drinks
      } else {
        try {
          foundDrinks = await drinkService.getDrinks(barId)
        } catch {
          setDrinksFailed(true)
        }
      }

      let selectedDrinks = getDrinksByCategory(foundDrinks, selectedCategory)
      setDrinks(selectedDrinks)
    }

    if (barId !== null) {
      fetchCategories(barId)
      fetchDrinks(barId)
    }
  }, [barId, selectedCategory])

  return (
    <main className="min-h-screen container mx-auto flex space-x-4">
      <ManageCategories
        categories={categories}
        setCategories={setCategories}
        selectedId={selectedCategory}
        setSelectedId={setSelectedCategory}
        loadingFailed={categoriesFailed}
        barId={barId}
      />
      <ManageDrinks 
        drinks={drinks} 
        loadFailed={drinksFailed} 
        categoryId={selectedCategory} 
        updateDrinks={(updated) => setDrinks(getDrinksByCategory(updated, selectedCategory))}
        barId={barId}
      />
    </main>
  );
}
