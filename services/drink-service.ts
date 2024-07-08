import { ApiService } from "./api-service"
import { Drink, mapResponseToDrink } from "@/models/drink"

export class DrinkService extends ApiService {

  public drinks: Array<Drink> | null = null

  constructor() {
    super("/drinks")
  }

  async getDrinks(barId: string): Promise<Array<Drink>> {
    let response = await this.getRequest({
      name: "barId",
      value: barId,
    })
    let drinks: Array<any> = await response.json()
    let mapped = drinks.map(mapResponseToDrink)
    this.drinks = mapped
    return mapped
  }

  async createDrink(
    name: string,
    barId: string,
    startPrice: number,
    currentPrice: number,
    riseMultiplier: number,
    dropMultiplier: number,
    tag: string,
    categoryId: string,
  ): Promise<Drink> {
    let response = await this.doRequest("POST", {
      "name": name,
      "bar_id": barId,
      "start_price": startPrice,
      "current_price": currentPrice,
      "rise_multiplier": riseMultiplier,
      "drop_multiplier": dropMultiplier,
      "tag": tag,
      "category_id": categoryId,
    })
    let createdDrink = await response.json()
    let mapped = mapResponseToDrink(createdDrink)
    if (this.drinks !== null) {
      this.drinks = [mapped, ...this.drinks]
    }
    return mapped
  }

  async updateDrink(updatedDrink: Drink): Promise<Drink> {
    let response = await this.doRequest("PUT", {
      "id": updatedDrink.id,
      "name": updatedDrink.name,
      "bar_id": updatedDrink.barId,
      "start_price": updatedDrink.startPrice,
      "current_price": updatedDrink.currentPrice,
      "rise_multiplier": updatedDrink.riseMultiplier,
      "drop_multiplier": updatedDrink.dropMultiplier,
      "tag": updatedDrink.tag,
      "category_id": updatedDrink.categoryId,
    })
    let drink = await response.json()
    let mapped = mapResponseToDrink(drink)
    if (this.drinks !== null) {
      this.drinks = this.drinks.map((item) => item.id === mapped.id ? mapped : item)
    }
    return mapped
  }

  async deleteDrink(id: string): Promise<boolean> {
    try {
      await this.doRequest("DELETE", { "id": id })
      if (this.drinks !== null) {
        this.drinks = this.drinks.filter((drink) => drink.id !== id)
      }
      return true
    } catch {
      console.error(`An error occurred while deleting drink with id: ${id}`)
      return false
    }
  }
}
