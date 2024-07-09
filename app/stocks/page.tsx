"use client"
import React from "react"
import { useServiceContext } from "@/app/providers"
import { 
  DrinkStock, 
  toNewStock,
  mapStocksToColumns, 
  calcStockHeight, 
  Fluctuation 
} from "./stocks-drink"
import { RiseIcon, DropIcon, EqualIcon } from "./stock-icons"
import { Constants } from "@/generic/constants"

export default function Page() {
  let context = useServiceContext()
  let loginService = context.loginService
  let drinkService = context.drinkService
  let barId = loginService.getBarId()

  const [isLoaded, setLoaded] = React.useState(false)
  const [drinkColumns, setDrinkColumns] = React.useState([] as DrinkStock[][])
  const [loadingFailed, setLoadingFailed] = React.useState(false)
  let stockHeight = calcStockHeight(drinkColumns)

  React.useEffect(() => {
    async function getDrinks(bar: string) {
      try {
        let newDrinks = await drinkService.getDrinks(bar)
        let newStocks = newDrinks.map((drink) =>{
          let oldStock = drinkColumns.flat().find((stock) => stock.data.id === drink.id)
          let newStock = toNewStock(drink, oldStock)
          return newStock
        })
        let columns = mapStocksToColumns(newStocks)
        setDrinkColumns(columns)
      } catch {
        setLoadingFailed(true)
      }   
    }

    setTimeout(() => {
      if (barId !== null) {
        getDrinks(barId)
        setLoaded(true)
        console.log("refreshed")
      }
    }, isLoaded ? Constants.StocksRefreshInterval : 0)
  })

  return (
    <main className="w-full h-full flex">
      { loadingFailed &&
        <p className="text-red-600">Beurs ophalen is mislukt</p>
      }
      { drinkColumns.map((drinksPerColumn, index) => (
        <DrinkColumn drinks={drinksPerColumn} stockHeight={stockHeight} key={index} />
      ))}
    </main>
  )
}

type DrinkColumnProps = {
  drinks: DrinkStock[]
  stockHeight: string
}

function DrinkColumn({ drinks, stockHeight }: DrinkColumnProps) {
  return (
    <div className="grow flex flex-col">
      { drinks.map((drink) => (
        <DrinkRow drink={drink} height={stockHeight} key={drink.data.id} />
      ))}
    </div>
  )
}

type DrinkRowProps = {
  drink: DrinkStock
  height: string
}

function DrinkRow({ drink, height }: DrinkRowProps) {
  let textHeight = `${parseInt(height.replace("%", "")) * 0.5}cqh`
  let textColor = "#FFFFFF"
  switch (drink.fluctuation) {
    case Fluctuation.Equal:
      textColor = Constants.EqualColor
      break
    case Fluctuation.Rise:
      textColor = Constants.RiseColor
      break
    case Fluctuation.Drop:
      textColor = Constants.DropColor
  }

  return (
    <div className="flex w-full justify-between items-center p-2 border-1 border-white" style={{ "height": height }}>
      <div className="flex gap-4 items-center">
        <div style={{ "fontSize": textHeight }}>{drink.data.tag}</div>
        <div style={{ "fontSize": textHeight }}>{drink.data.name}</div>
      </div>
      <div className="flex gap-2 items-center h-min">
        <div style={{ "fontSize": textHeight, "color": textColor }}>{drink.data.currentPrice}</div>
        <div className="h-full" style={{ "height": textHeight }}>
          { drink.fluctuation === Fluctuation.Equal &&
            <EqualIcon width={textHeight} height={textHeight} />
          }
          { drink.fluctuation === Fluctuation.Rise &&
            <RiseIcon width={textHeight} height={textHeight} />
          }
          { drink.fluctuation === Fluctuation.Drop &&
            <DropIcon width={textHeight} height={textHeight} />
          }
        </div>
      </div>
    </div>
  )
}