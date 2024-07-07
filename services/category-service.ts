import { ApiService } from "./api-service"
import { Category, mapResponseToCategory } from "@/models/category"

export class CategoryService extends ApiService {

  public categories: Array<Category> | null = null

  constructor() {
    super("/category")
  }

  async getCategories(barId: string): Promise<Array<Category>> {
    let response = await this.getRequest({
      name: "barId",
      value: barId,
    })
    let categories: Array<any> = await response.json()
    let mapped = categories.map(mapResponseToCategory)
    this.categories = mapped
    return mapped
  }

  async createCategory(name: string, barId: string): Promise<Category> {
    let response = await this.doRequest("POST", {
      "name": name,
      "bar_id": barId,
    })
    let created = await response.json()
    let mapped = mapResponseToCategory(created)
    if (this.categories !== null) {
      this.categories = [mapped, ...this.categories]
    }
    return mapped
  }

  async updateCategory(id: string, newName: string) {
    if (this.categories !== null) {
      this.categories = this.categories.map((item) => {
        if (item.id === id) {
          return {
            id: item.id,
            name: newName,
            barId: item.barId,
          }
        } else {
          return item
        }
      })
    }
    await this.doRequest("PUT", {
      "id": id,
      "name": newName,
    })
  }

  async deleteCategory(id: string) {
    if (this.categories !== null) {
      this.categories = this.categories.filter((item) => item.id !== id)
    }
    await this.doRequest("DELETE", { "id": id })
  }
}
