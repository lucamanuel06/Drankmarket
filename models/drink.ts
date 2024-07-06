export type Drink = {
  id: string
  name: string
  barId: string
  startPrice: number
  currentPrice: number
  riseMultiplier: number
  dropMultiplier: number
  tag: string
  categoryId: string
}

export const mapResponseToDrink = (response: any): Drink => {
  return {
    id: response["id"],
    name: response["name"],
    barId: response["bar_id"],
    startPrice: response["start_price"],
    currentPrice: response["current_price"],
    riseMultiplier: response["rise_multiplier"],
    dropMultiplier: response["drop_multiplier"],
    tag: response["tag"],
    categoryId: response["category_id"],
  }
}
