"use client"
import React from "react";
import { useServiceContext } from "@/app/providers";
import { Drink } from "@/models/drink";

export default function ManageDrinks() {
  let loginService = useServiceContext().loginService
  let drinkService = useServiceContext().drinkService
  let initialDrinks: Array<Drink> = []

  const [drinks, setDrinks] = React.useState(initialDrinks)
  const [drinksFailed, setDrinksFailed] = React.useState(false)

  React.useEffect(() => {
    async function fetchDrinks(barId: string) {
      if (drinkService.drinks !== null) {
        setDrinks(drinkService.drinks)
        return
      }

      try {
        setDrinks(await drinkService.getDrinks(barId))
      } catch {
        setDrinksFailed(true)
      }
    }

    let barId = loginService.getBarId()
    if (barId !== null) {
      fetchDrinks(barId)
    }
  })

  return (
    <div className="flex flex-col" style={{"flex": 3}}>
      <h2>Producten</h2>
      <div className="bg-stone-800 w-fill p-4 flex flex-col" style={{"flex": 1}}></div>
    </div>
  )
}
