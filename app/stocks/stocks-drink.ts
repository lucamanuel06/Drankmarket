import { Drink } from "@/models/drink"
import { Constants } from "@/generic/constants"

export enum Fluctuation {
  Equal,
  Rise,
  Drop,
}

export type DrinkStock = {
  data: Drink
  color: string
  fluctuation: Fluctuation
}

export function toNewStock(newDrink: Drink, oldStock: DrinkStock | undefined): DrinkStock {
  if (oldStock == null) {
    return mapDrinkToStock(newDrink, Fluctuation.Equal)
  }

  let fluctuation = Fluctuation.Equal
  if (newDrink.currentPrice > oldStock.data.currentPrice) {
    fluctuation = Fluctuation.Rise
  } else if (newDrink.currentPrice < oldStock.data.currentPrice) {
    fluctuation = Fluctuation.Drop
  }

  return {
    data: newDrink,
    color: oldStock.color,
    fluctuation: fluctuation,
  }
}

export function mapDrinkToStock(drink: Drink, fluctuation: Fluctuation): DrinkStock {
  return {
    data: drink,
    color: "FFFFFF",  // TODO: give color based on category
    fluctuation: Fluctuation.Equal
  }
}

export function mapStocksToColumns(drinks: DrinkStock[]): DrinkStock[][] {
  let columns = [[]] as DrinkStock[][]
  let columnIndex = 0
  for (let i = 0; i < drinks.length; i++) {
    if (columns[columnIndex].length >= 10) {
      columnIndex++
      if (columnIndex >= Constants.MaxColumns) break
      columns.push([])
    }
    columns[columnIndex].push(drinks[i])
  }
  return columns
}

export function calcStockHeight(columns: DrinkStock[][]): string {
  let maxStocks = columns.length > 0 ? columns[0].length : 0
  return `${Constants.MaxStocksPerColumn / maxStocks * 10}%`
}
