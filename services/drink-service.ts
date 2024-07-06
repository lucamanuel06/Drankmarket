import { ApiService } from "./api-service"
import { Drink, mapResponseToDrink } from "../models/drink"

export class DrinkService extends ApiService {

  constructor() {
    super("/drinks")
  }

  async getDrinks(barId: string): Promise<Array<Drink>> {
    let response = await this.getRequest({
      name: "barId",
      value: barId,
    })
    let drinks: Array<any> = await response.json()
    return drinks.map(mapResponseToDrink)
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
      "barId": barId,
      "start_price": startPrice,
      "current_price": currentPrice,
      "rise_multiplier": riseMultiplier,
      "drop_multiplier": dropMultiplier,
      "tag": tag,
      "category_id": categoryId,
    })
    let createdDrink = await response.json()
    return mapResponseToDrink(createdDrink)
  }

  async updateDrink(updatedDrink: Drink): Promise<Drink> {
    let response = await this.doRequest("PUT", {
      "name": updatedDrink.name,
      "barId": updatedDrink.barId,
      "start_price": updatedDrink.startPrice,
      "current_price": updatedDrink.currentPrice,
      "rise_multiplier": updatedDrink.riseMultiplier,
      "drop_multiplier": updatedDrink.dropMultiplier,
      "tag": updatedDrink.tag,
      "category_id": updatedDrink.categoryId,
    })
    let drink = await response.json()
    return mapResponseToDrink(drink)
  }

  async deleteDrink(id: string) {
    await this.doRequest("DELETE", { "id": id })
  }
}
