import { Drink } from "@/models/drink"
import { Constants } from "@/generic/constants"
import { Category } from "@/models/category"

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

export function toNewStock(
  newDrink: Drink, 
  category: Category | undefined,
  oldStock: DrinkStock | undefined,
): DrinkStock {
  if (oldStock == null || category == null) {
    return mapDrinkToStock(
      newDrink, 
      category == null ? "#FFFFFF" : category.color, 
      oldStock == null ? Fluctuation.Equal : oldStock.fluctuation,
    )
  }

  let fluctuation = Fluctuation.Equal
  if (newDrink.currentPrice > oldStock.data.currentPrice) {
    fluctuation = Fluctuation.Rise
  } else if (newDrink.currentPrice < oldStock.data.currentPrice) {
    fluctuation = Fluctuation.Drop
  }

  return {
    data: newDrink,
    color: category.color,
    fluctuation: fluctuation,
  }
}

export function mapDrinkToStock(drink: Drink, color: string, fluctuation: Fluctuation): DrinkStock {
  return {
    data: drink,
    color: color,
    fluctuation: fluctuation
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
