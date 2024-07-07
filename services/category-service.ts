import { ApiService } from "./api-service"
import { Category, mapResponseToCategory } from "@/models/category"

export class CategoryService extends ApiService {

  constructor() {
    super("/category")
  }

  async getCategories(barId: string): Promise<Array<Category>> {
    let response = await this.getRequest({
      name: "barId",
      value: barId,
    })
    let categories: Array<any> = await response.json()
    return categories.map(mapResponseToCategory)
  }

  async createCategory(name: string, barId: string): Promise<Category> {
    let response = await this.doRequest("POST", {
      "name": name,
      "bar_id": barId,
    })
    let created = await response.json()
    return mapResponseToCategory(created)
  }

  async updateCategory(id: string, newName: string) {
    await this.doRequest("PUT", {
      "id": id,
      "name": newName,
    })
  }

  async deleteCategory(id: string) {
    await this.doRequest("DELETE", { "id": id })
  }
}
